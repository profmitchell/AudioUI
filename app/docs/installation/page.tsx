export default function InstallationPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-light tracking-wide mb-6">Installation</h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-white/80">
          Get started with AudioUI by installing the package and its dependencies.
        </p>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Prerequisites</h2>

        <p className="text-white/80">AudioUI requires the following dependencies:</p>

        <ul className="space-y-2 text-white/80">
          <li>React 18 or higher</li>
          <li>Tailwind CSS 3.0 or higher</li>
          <li>Next.js 13 or higher (recommended)</li>
        </ul>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Installation</h2>

        <p className="text-white/80">Install AudioUI using your package manager of choice:</p>

        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-white">npm install @audioui/react</code>
        </pre>

        <p className="text-white/80 mt-4">Or with yarn:</p>

        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-white">yarn add @audioui/react</code>
        </pre>

        <h2 className="text-2xl font-light tracking-wide mt-8 mb-4">Setup</h2>

        <p className="text-white/80">
          After installation, you need to set up the AudioUI provider in your application:
        </p>

        <pre className="bg-black/60 p-4 rounded-lg overflow-x-auto">
          <code className="text-white">{`import { AudioUIProvider } from '@audioui/react'

export default function App({ children }) {
  return (
    <AudioUIProvider>
      {children}
    </AudioUIProvider>
  )
}`}</code>
        </pre>

        <p className="text-white/80 mt-4">Now you're ready to use AudioUI components in your application!</p>
      </div>
    </div>
  )
}
