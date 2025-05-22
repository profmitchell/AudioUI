# AudioUIJUCEStarterTemplate - JUCE 8 with React Frontend
# AudioUIJUCEStarterTemplate - JUCE 8 with Next.js (React) Frontend

This project demonstrates how to create a JUCE audio plugin with a React-based user interface using JUCE 8's new WebView functionality. The application consists of a C++ JUCE backend and a React frontend, with hot-reloading capability for rapid UI development.
This project demonstrates how to create a JUCE audio plugin with a Next.js (React-based) user interface using JUCE 8's new WebView functionality. The application consists of a C++ JUCE backend and a Next.js frontend, with hot-reloading capability for rapid UI development.

## Project Structure

- `/Source` - Contains the C++ JUCE source code
- `/frontend` - Contains the React.js frontend application
- `/frontend` - Contains the Next.js (React) frontend application
- `/JuceLibraryCode` - JUCE library code
- `/Builds` - Build configurations for different platforms

## Features

- JUCE 8 audio processing backend
- React.js-based user interface
- Next.js (React) based user interface
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
1. **Setup the Next.js Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   npm run dev
   ```
   This will start the React development server at http://localhost:3000
   This will start the Next.js development server, typically at http://localhost:3000

2. **Build and Run the JUCE Plugin**
   - Open your IDE (Xcode/Visual Studio)
   - Build the project
   - Run the standalone version or load the plugin in a DAW

The JUCE application will connect to the React development server and display the UI. Any changes made to the React code will hot-reload in the plugin UI without needing to recompile.
The JUCE application will connect to the Next.js development server and display the UI. Any changes made to the Next.js code will hot-reload in the plugin UI without needing to recompile.

## Development Workflow

1. Make changes to your React components in `frontend/src`
1. Make changes to your Next.js pages/components in `frontend/app` (or `frontend/pages` and `frontend/components` depending on your Next.js setup).
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
1. Build a production version of the Next.js frontend:
   ```bash
   cd frontend
   npm run build
   ```
   This command builds the Next.js application into the `.next` folder. For embedding as static assets in JUCE, you might need to configure static export (e.g., `next export` which outputs to the `out` folder).

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
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
