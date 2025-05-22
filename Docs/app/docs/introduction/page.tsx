export default function IntroductionPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-light tracking-wide mb-6">Introduction</h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-white/80">
          Welcome to AudioUI Documentation! AudioUI is a powerful and versatile collection of high-quality audio interface components built with React and Tailwind CSS. Whether you're a developer looking to create professional audio applications or a sound designer seeking intuitive controls for your web projects, this documentation is your comprehensive guide to making the most of our component library.
        </p>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Key Features</h2>

        <p className="text-white/80">
          AudioUI comes with a wide range of features that cater to a diverse set of users. Here are some of the key features:
        </p>

        <ul className="space-y-2 text-white/80">
          <li>Modern Design: Sleek, dark glass aesthetic with customizable components that elevate your audio applications.</li>
          <li>Accessibility: Built with accessibility in mind, following WAI-ARIA standards for inclusive user experiences.</li>
          <li>Responsive Components: All components are fully responsive and work seamlessly across devices and screen sizes.</li>
          <li>Customization: Extensive styling options allow you to match components to your brand and design system.</li>
          <li>Open Source: Free and open source under the MIT license, ready to use in any project.</li>
        </ul>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Who Should Use This Documentation</h2>
        
        <p className="text-white/80">
          This documentation is intended for:
        </p>
        
        <ul className="space-y-2 text-white/80">
          <li>Web Developers: If you're building audio applications or interfaces for the web, this guide will help you implement professional audio controls.</li>
          <li>UI/UX Designers: For designers looking to create intuitive audio interfaces, this documentation provides insights into best practices and component usage.</li>
          <li>Audio Software Creators: If you're developing audio software for the web, these components provide ready-made solutions for common audio interface needs.</li>
        </ul>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Installation</h2>
        
        <p className="text-white/80 mb-4">
          AudioUI is available as an npm package. You can install it using npm, yarn, or pnpm:
        </p>
        
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-md p-3 mb-6">
          <code className="text-green-400 font-mono">npm install audioui</code>
        </div>
        
        <p className="text-white/80 mb-4">
          Or using yarn:
        </p>
        
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-md p-3 mb-6">
          <code className="text-green-400 font-mono">yarn add audioui</code>
        </div>
        
        <p className="text-white/80 mb-4">
          Or using pnpm:
        </p>
        
        <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-md p-3 mb-6">
          <code className="text-green-400 font-mono">pnpm add audioui</code>
        </div>
        
        <p className="text-white/80 mb-6">
          You can also check out the <a href="https://github.com/profmitchell/AudioUI" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-white/80">GitHub repository</a> for more information and to contribute to the project.
        </p>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">How to Use This Documentation</h2>
        
        <p className="text-white/80">
          To make the most of this documentation, you can follow these guidelines:
        </p>
        
        <ul className="space-y-2 text-white/80">
          <li>Navigation: The documentation is organized into sections, so you can navigate through the sidebar to locate the information you need.</li>
          <li>Component Examples: Each component page includes examples and code snippets that you can copy and adapt for your projects.</li>
          <li>Installation Guide: For more detailed setup instructions, visit the <a href="/docs/installation" className="text-white underline hover:text-white/80">installation page</a>.</li>
          <li>API Reference: Each component page includes a detailed API reference section.</li>
        </ul>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">About Cohen Concepts</h2>
        
        <p className="text-white/80">
          AudioUI is developed and maintained by Cohen Concepts, a forward-thinking software development company specializing in audio applications and interfaces for the web. Founded by Mitchell Cohen, our mission is to make professional audio interfaces accessible to developers of all skill levels.
        </p>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Contacting Support</h2>
        
        <p className="text-white/80">
          If you encounter any issues or have questions not covered in this documentation, our dedicated support team is here to assist you. Contact us at support@cohenconcepts.com or visit our GitHub repository to open an issue.
        </p>
      </div>
    </div>
  )
}
