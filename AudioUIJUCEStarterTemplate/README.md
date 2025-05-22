# AudioUIJUCEStarterTemplate - JUCE 8 with React Webview

This project provides a ready-to-use template for creating JUCE audio plugins with a modern React-based user interface using JUCE 8's new WebView functionality. The template consists of a C++ JUCE backend for audio processing and a React frontend for the user interface, with hot-reloading capability for rapid UI development.

## Project Structure

- `/Source` - Contains the C++ JUCE source code
- `/frontend` - Contains the React frontend application
- `/JuceLibraryCode` - JUCE library code
- `/Builds` - Build configurations for different platforms

## Features

- JUCE 8 audio processing backend
- React-based user interface
- Hot-reloading of UI changes without recompiling C++
- Communication between C++ and JavaScript
- Cross-platform compatibility

## Setup Instructions

### Prerequisites

- JUCE 8
- Node.js and npm
- C++ development environment (Xcode for macOS, Visual Studio for Windows, etc.)

### Building and Running

1. **Setup the React Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   This will start the React development server at http://localhost:3000

2. **Build and Run the JUCE Plugin**
   - Open your IDE (Xcode/Visual Studio)
   - Build the project
   - Run the standalone version or load the plugin in a DAW

The JUCE application will connect to the React development server and display the UI. Any changes made to the React code will hot-reload in the plugin UI without needing to recompile.

## Development Workflow

1. Make changes to your React components in `frontend/src`
2. Save your changes - they will automatically appear in the running plugin
3. For C++ changes, you'll need to rebuild the plugin

## Communication Between C++ and JavaScript

The WebView functionality in JUCE 8 provides several mechanisms for C++/JavaScript communication:

- Native functions - C++ functions exposed to JavaScript
- Events - JavaScript events that C++ can listen for
- Parameter binding - Connect JUCE audio parameters to JavaScript values

See `AudioUIJUCEStarterTemplate.h` for examples of this communication.

## Building for Production

When ready to deploy your plugin:

1. Build a production version of the React frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. In `Source/AudioUIJUCEStarterTemplate.h`, comment out the dev server line and uncomment the resource provider line:
   ```cpp
   // webComponent.goToURL (localDevServerAddress);
   webComponent.goToURL (WebBrowserComponent::getResourceProviderRoot());
   ```

3. Ensure the build files are properly bundled with your plugin (see JUCE documentation for details on including web assets).

## License

This project is based on the JUCE framework examples and follows their licensing terms.

## Resources

- [JUCE 8 WebView UIs Documentation](https://juce.com/blog/juce-8-feature-overview-webview-uis/)
- [JUCE WebView Tutorial by Jan Wilczek](https://github.com/JanWilczek/juce-webview-tutorial) - Excellent step-by-step tutorial on integrating WebViews with JUCE
- [React Documentation](https://react.dev/)
- [AudioUI Component Library](https://github.com/profmitchell/AudioUI) - Modern, accessible audio interface components for React
- [AudioUI Documentation](https://profmitchell.github.io/AudioUI/) - Documentation for the AudioUI component library

## Acknowledgments

Special thanks to the JUCE team for creating the WebView feature that makes this integration possible, and to Jan Wilczek for his invaluable tutorial that helped shape this implementation approach.
