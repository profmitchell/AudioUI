interface AudioUIComponent {
    name: string;
    version: string;
}
declare const VERSION = "0.1.0";
declare const AUTHOR = "Cohen Concepts";
declare const Components: {
    ADSREnvelope: string;
    Dial: string;
    MIDIPad: string;
    PitchBend: string;
    ModWheel: string;
    XYPad: string;
};

export { AUTHOR, type AudioUIComponent, Components, VERSION };
