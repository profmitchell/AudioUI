import { useRef, useState, useEffect } from 'react';

/**
 * A hook that creates and manages a Web Audio API AudioContext.
 * 
 * @returns An object containing the AudioContext and its state
 */
export function useAudioContext() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    // Create the audio context only when needed
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.error('AudioContext not supported or cannot be created:', error);
      }
    }

    // Check and update the state
    if (audioContextRef.current) {
      setIsRunning(audioContextRef.current.state === 'running');

      // Listen for state changes
      const handleStateChange = () => {
        setIsRunning(audioContextRef.current?.state === 'running');
      };

      audioContextRef.current.addEventListener('statechange', handleStateChange);
      return () => {
        audioContextRef.current?.removeEventListener('statechange', handleStateChange);
      };
    }
  }, []);

  // Function to resume the AudioContext
  const resume = async () => {
    if (audioContextRef.current && audioContextRef.current.state !== 'running') {
      try {
        await audioContextRef.current.resume();
        setIsRunning(true);
      } catch (error) {
        console.error('Failed to resume AudioContext:', error);
      }
    }
  };

  // Function to suspend the AudioContext
  const suspend = async () => {
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      try {
        await audioContextRef.current.suspend();
        setIsRunning(false);
      } catch (error) {
        console.error('Failed to suspend AudioContext:', error);
      }
    }
  };

  return {
    audioContext: audioContextRef.current,
    isRunning,
    resume,
    suspend
  };
}
