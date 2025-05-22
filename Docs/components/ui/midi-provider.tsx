"use client"

import * as React from "react"
import { MidiContext, type MidiDeviceInfo } from "@/components/ui/midi-pad"

// Declare WebMidi interface if it's not available globally
declare global {
  interface Navigator {
    requestMIDIAccess?: (options?: MIDIOptions | undefined) => Promise<MIDIAccess>
  }
  interface Window {
    WebMidi?: any
  }
}

// Define the WebMidi namespace for our internal use
namespace WebMidi {
  export interface MIDIOptions {
    sysex?: boolean;
    software?: boolean;
  }
  
  export interface MIDIAccess {
    inputs: Map<string, MIDIInput>;
    outputs: Map<string, MIDIOutput>;
    addEventListener(type: string, listener: (event: any) => void): void;
  }
  
  export interface MIDIPort {
    id: string;
    name: string | null;
    manufacturer: string | null;
    type: 'input' | 'output';
  }
  
  export interface MIDIInput extends MIDIPort {}
  
  export interface MIDIOutput extends MIDIPort {
    send(data: number[], timestamp?: number): void;
  }
}

export interface MidiProviderProps {
  children: React.ReactNode
  autoRequestAccess?: boolean
}

export function MidiProvider({ children, autoRequestAccess = false }: MidiProviderProps) {
  const [outputs, setOutputs] = React.useState<MidiDeviceInfo[]>([])
  const [inputs, setInputs] = React.useState<MidiDeviceInfo[]>([])
  const [isSupported, setIsSupported] = React.useState(false)
  const [isEnabled, setIsEnabled] = React.useState(false)
  const [activeOutputId, setActiveOutputId] = React.useState<string | null>(null)

  const accessRef = React.useRef<WebMidi.MIDIAccess | null>(null)
  const midiInitialized = React.useRef(false)

  // Check if Web MIDI API is supported
  React.useEffect(() => {
    if (midiInitialized.current) return

    midiInitialized.current = true
    setIsSupported(typeof navigator !== "undefined" && "requestMIDIAccess" in navigator)

    if (autoRequestAccess) {
      requestMidiAccess()
    }
  }, [autoRequestAccess])

  // Request MIDI access
  const requestMidiAccess = React.useCallback(async () => {
    if (!isSupported) return false

    try {
      // TypeScript needs this type definition
      const midiAccess = (await (navigator as any).requestMIDIAccess({ sysex: false })) as WebMidi.MIDIAccess

      accessRef.current = midiAccess
      updateDevices(midiAccess)

      // Listen for device connection/disconnection
      midiAccess.addEventListener("statechange", () => {
        updateDevices(midiAccess)
      })

      setIsEnabled(true)
      return true
    } catch (error) {
      console.error("Failed to access MIDI devices:", error)
      setIsEnabled(false)
      return false
    }
  }, [isSupported])

  // Update the list of available devices
  const updateDevices = (access: WebMidi.MIDIAccess) => {
    const newOutputs: MidiDeviceInfo[] = []
    const newInputs: MidiDeviceInfo[] = []

    access.outputs.forEach((output) => {
      newOutputs.push({
        id: output.id,
        name: output.name || "Unknown output",
        manufacturer: output.manufacturer || "Unknown manufacturer",
        type: "output",
      })
    })

    access.inputs.forEach((input) => {
      newInputs.push({
        id: input.id,
        name: input.name || "Unknown input",
        manufacturer: input.manufacturer || "Unknown manufacturer",
        type: "input",
      })
    })

    setOutputs(newOutputs)
    setInputs(newInputs)

    // Reset active output if it's no longer available
    if (activeOutputId && !newOutputs.find((o) => o.id === activeOutputId)) {
      setActiveOutputId(null)
    }
  }

  // Set active output device
  const setActiveOutput = (deviceId: string | null) => {
    setActiveOutputId(deviceId)
  }

  // MIDI message sending functions
  const getActiveOutput = (): WebMidi.MIDIOutput | null => {
    if (!accessRef.current || !activeOutputId) return null

    return accessRef.current.outputs.get(activeOutputId) || null
  }

  const sendNoteOn = (note: number, velocity: number, channel: number) => {
    const output = getActiveOutput()
    if (!output) return

    // MIDI note on: 0x90 (144) + channel-1, note, velocity
    output.send([0x90 + (channel - 1), note, velocity])
  }

  const sendNoteOff = (note: number, velocity: number, channel: number) => {
    const output = getActiveOutput()
    if (!output) return

    // MIDI note off: 0x80 (128) + channel-1, note, velocity
    output.send([0x80 + (channel - 1), note, velocity])
  }

  const sendAftertouch = (note: number, pressure: number, channel: number) => {
    const output = getActiveOutput()
    if (!output) return

    // Polyphonic aftertouch: 0xA0 (160) + channel-1, note, pressure
    output.send([0xa0 + (channel - 1), note, pressure])
  }

  const sendChannelAftertouch = (pressure: number, channel: number) => {
    const output = getActiveOutput()
    if (!output) return

    // Channel aftertouch: 0xD0 (208) + channel-1, pressure
    output.send([0xd0 + (channel - 1), pressure])
  }

  const sendPitchBend = (value: number, channel: number) => {
    const output = getActiveOutput()
    if (!output) return

    // Pitch bend: 0xE0 (224) + channel-1, LSB, MSB (14-bit value)
    const lsb = value & 0x7f // Lower 7 bits
    const msb = (value >> 7) & 0x7f // Upper 7 bits
    output.send([0xe0 + (channel - 1), lsb, msb])
  }

  const sendControlChange = (controller: number, value: number, channel: number) => {
    const output = getActiveOutput()
    if (!output) return

    // Control Change: 0xB0 (176) + channel-1, controller, value
    output.send([0xb0 + (channel - 1), controller, value])
  }

  return (
    <MidiContext.Provider
      value={{
        outputs,
        inputs,
        isSupported,
        isEnabled,
        requestMidiAccess,
        sendNoteOn,
        sendNoteOff,
        sendAftertouch,
        sendChannelAftertouch,
        sendPitchBend,
        sendControlChange,
        setActiveOutput,
      }}
    >
      {children}
    </MidiContext.Provider>
  )
}
