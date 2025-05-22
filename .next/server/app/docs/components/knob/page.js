(()=>{var e={};e.id=14,e.ids=[14],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1529:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>s});var r=o(5479),a=o(3612);function s(){return(0,r.jsx)(a.default,{})}},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3612:(e,t,o)=>{"use strict";o.d(t,{default:()=>r});let r=(0,o(1129).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/Shared/CohenConcepts/AudioUIDocs/app/docs/components/knob/documentation.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/Shared/CohenConcepts/AudioUIDocs/app/docs/components/knob/documentation.tsx","default")},3873:e=>{"use strict";e.exports=require("path")},4871:(e,t,o)=>{"use strict";o.r(t),o.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var r=o(7025),a=o(8198),s=o(2576),i=o.n(s),l=o(5239),n={};for(let e in l)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>l[e]);o.d(t,n);let d={children:["",{children:["docs",{children:["components",{children:["knob",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(o.bind(o,1529)),"/Users/Shared/CohenConcepts/AudioUIDocs/app/docs/components/knob/page.tsx"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(o.bind(o,9650)),"/Users/Shared/CohenConcepts/AudioUIDocs/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(o.t.bind(o,4540,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(o.t.bind(o,3117,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(o.t.bind(o,6874,23)),"next/dist/client/components/unauthorized-error"]}]}.children,c=["/Users/Shared/CohenConcepts/AudioUIDocs/app/docs/components/knob/page.tsx"],u={require:o,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/docs/components/knob/page",pathname:"/docs/components/knob",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},5369:(e,t,o)=>{Promise.resolve().then(o.bind(o,8869))},8108:(e,t,o)=>{"use strict";o.d(t,{A:()=>r});let r=(0,o(2752).A)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},8327:(e,t,o)=>{"use strict";o.d(t,{A:()=>r});let r=(0,o(2752).A)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},8869:(e,t,o)=>{"use strict";o.d(t,{default:()=>c});var r=o(5781),a=o(1762),s=o(3072),i=o(8108),l=o(8327),n=o(7401);function d(){let[e,t]=(0,s.useState)("preview"),[o,d]=(0,s.useState)("cli"),[c,u]=(0,s.useState)("pnpm"),[m,x]=(0,s.useState)(null),h="rgba(255, 255, 255, 0.1)",p="rgba(255, 255, 255, 0.8)",b=(e,t)=>{navigator.clipboard.writeText(e),x(t),setTimeout(()=>x(null),2e3)},[v,w]=(0,s.useState)(35),[g,f]=(0,s.useState)(50),[j,N]=(0,s.useState)(440);return(0,r.jsx)("div",{className:"w-full bg-gradient-to-b from-black to-zinc-900 py-16 px-4 md:px-8",children:(0,r.jsxs)("div",{className:"max-w-5xl mx-auto",children:[(0,r.jsxs)("div",{className:"mb-16",children:[(0,r.jsxs)("div",{className:"flex border-b border-white/10 mb-6",children:[(0,r.jsx)("button",{className:(0,n.cn)("px-4 py-2 text-sm font-medium transition-colors duration-200","preview"===e?"text-white border-b-2 border-white":"text-white/60 hover:text-white/80"),onClick:()=>t("preview"),children:"Preview"}),(0,r.jsx)("button",{className:(0,n.cn)("px-4 py-2 text-sm font-medium transition-colors duration-200","code"===e?"text-white border-b-2 border-white":"text-white/60 hover:text-white/80"),onClick:()=>t("code"),children:"Code"})]}),(0,r.jsx)("div",{className:"bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6",children:"preview"===e?(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[(0,r.jsx)("div",{className:"flex flex-col items-center",children:(0,r.jsx)(a.h,{variant:"default",label:"Default Variant",value:v,onChange:w,showValue:!0,glowColor:"rgba(255, 255, 255, 0.2)",trackColor:h,indicatorColor:p})}),(0,r.jsx)("div",{className:"flex flex-col items-center",children:(0,r.jsx)(a.h,{variant:"glass",indicatorStyle:"glow",label:"Glass with Glow",value:g,onChange:f,showValue:!0,valueFormat:e=>`${e}%`,glowColor:p,trackColor:h,indicatorColor:p})}),(0,r.jsx)("div",{className:"flex flex-col items-center",children:(0,r.jsx)(a.h,{variant:"glass",knobVariant:"metallic",label:"Frequency Control",value:j,onChange:N,min:20,max:2e4,showValue:!0,valueFormat:e=>`${e.toFixed(0)} Hz`,glowColor:p,trackColor:h,trackGlowColor:p,indicatorColor:p})})]}):(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("button",{className:"absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200",onClick:()=>b(`<Dial
  variant="default"
  label="Default Variant"
  value={value}
  onChange={setValue}
  showValue={true}
/>`,"default-dial"),children:"default-dial"===m?(0,r.jsx)(i.A,{size:16}):(0,r.jsx)(l.A,{size:16})}),(0,r.jsx)("pre",{className:"bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm",children:`<Dial
  variant="default"
  label="Default Variant"
  value={value}
  onChange={setValue}
  showValue={true}
/>`})]}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("button",{className:"absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200",onClick:()=>b(`<Dial
  variant="glass"
  indicatorStyle="glow"
  label="Glass with Glow"
  value={value}
  onChange={setValue}
  showValue={true}
  valueFormat={(v) => \`\${v}%\`}
/>`,"glass-dial"),children:"glass-dial"===m?(0,r.jsx)(i.A,{size:16}):(0,r.jsx)(l.A,{size:16})}),(0,r.jsx)("pre",{className:"bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm",children:`<Dial
  variant="glass"
  indicatorStyle="glow"
  label="Glass with Glow"
  value={value}
  onChange={setValue}
  showValue={true}
  valueFormat={(v) => \`\${v}%\`}
/>`})]}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("button",{className:"absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200",onClick:()=>b(`<Dial
  variant="glass"
  knobVariant="metallic"
  label="Frequency Control"
  value={value}
  onChange={setValue}
  min={20}
  max={20000}
  showValue={true}
  valueFormat={(v) => \`\${v.toFixed(0)} Hz\`}
/>`,"freq-dial"),children:"freq-dial"===m?(0,r.jsx)(i.A,{size:16}):(0,r.jsx)(l.A,{size:16})}),(0,r.jsx)("pre",{className:"bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm",children:`<Dial
  variant="glass"
  knobVariant="metallic"
  label="Frequency Control"
  value={value}
  onChange={setValue}
  min={20}
  max={20000}
  showValue={true}
  valueFormat={(v) => \`\${v.toFixed(0)} Hz\`}
/>`})]})]})})]}),(0,r.jsxs)("section",{className:"mb-16",children:[(0,r.jsx)("h2",{className:"text-xl font-bold text-white mb-4",children:"Installation"}),(0,r.jsxs)("div",{className:"flex border-b border-white/10 mb-4",children:[(0,r.jsx)("button",{className:(0,n.cn)("px-4 py-2 text-sm font-medium transition-colors duration-200","cli"===o?"text-white border-b-2 border-white":"text-white/60 hover:text-white/80"),onClick:()=>d("cli"),children:"CLI"}),(0,r.jsx)("button",{className:(0,n.cn)("px-4 py-2 text-sm font-medium transition-colors duration-200","manual"===o?"text-white border-b-2 border-white":"text-white/60 hover:text-white/80"),onClick:()=>d("manual"),children:"Manual"})]}),(0,r.jsx)("div",{className:"bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6",children:"cli"===o?(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"flex border-b border-white/10 mb-4",children:[(0,r.jsx)("button",{className:(0,n.cn)("px-3 py-1.5 text-xs font-medium transition-colors duration-200","pnpm"===c?"text-white border-b-2 border-white":"text-white/60 hover:text-white/80"),onClick:()=>u("pnpm"),children:"pnpm"}),(0,r.jsx)("button",{className:(0,n.cn)("px-3 py-1.5 text-xs font-medium transition-colors duration-200","npm"===c?"text-white border-b-2 border-white":"text-white/60 hover:text-white/80"),onClick:()=>u("npm"),children:"npm"}),(0,r.jsx)("button",{className:(0,n.cn)("px-3 py-1.5 text-xs font-medium transition-colors duration-200","yarn"===c?"text-white border-b-2 border-white":"text-white/60 hover:text-white/80"),onClick:()=>u("yarn"),children:"yarn"}),(0,r.jsx)("button",{className:(0,n.cn)("px-3 py-1.5 text-xs font-medium transition-colors duration-200","bun"===c?"text-white border-b-2 border-white":"text-white/60 hover:text-white/80"),onClick:()=>u("bun"),children:"bun"})]}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("button",{className:"absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200",onClick:()=>b(`${"npm"===c?"npm i audioui":"pnpm"===c?"pnpm add audioui":"yarn"===c?"yarn add audioui":"bun add audioui"}`,"cli-install"),children:"cli-install"===m?(0,r.jsx)(i.A,{size:16}):(0,r.jsx)(l.A,{size:16})}),(0,r.jsx)("pre",{className:"bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm",children:"npm"===c?"npm i audioui":"pnpm"===c?"pnpm add audioui":"yarn"===c?"yarn add audioui":"bun add audioui"})]})]}):(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsx)("p",{className:"text-white/70 mb-2",children:"Copy and paste the following files into your project:"}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("button",{className:"absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200",onClick:()=>b(`// components/ui/dial/constants.ts
export const START_ANGLE = -240
export const ROTATION_RANGE = 300
export const angleFromValue = (norm: number) => START_ANGLE + norm * ROTATION_RANGE`,"constants-file"),children:"constants-file"===m?(0,r.jsx)(i.A,{size:16}):(0,r.jsx)(l.A,{size:16})}),(0,r.jsx)("pre",{className:"bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm",children:`// components/ui/dial/constants.ts
export const START_ANGLE = -240
export const ROTATION_RANGE = 300
export const angleFromValue = (norm: number) => START_ANGLE + norm * ROTATION_RANGE`})]}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("button",{className:"absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200",onClick:()=>b(`// components/ui/dial.tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { START_ANGLE, ROTATION_RANGE, angleFromValue } from "./dial/constants"

// ... rest of the component code`,"component-file"),children:"component-file"===m?(0,r.jsx)(i.A,{size:16}):(0,r.jsx)(l.A,{size:16})}),(0,r.jsx)("pre",{className:"bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm",children:`// components/ui/dial.tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { START_ANGLE, ROTATION_RANGE, angleFromValue } from "./dial/constants"

// ... rest of the component code`})]})]})})]}),(0,r.jsxs)("section",{className:"mb-16",children:[(0,r.jsx)("h2",{className:"text-xl font-bold text-white mb-4",children:"Usage"}),(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-white mb-3",children:"Import"}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("button",{className:"absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200",onClick:()=>b('import { Dial } from "audioui"',"import-code"),children:"import-code"===m?(0,r.jsx)(i.A,{size:16}):(0,r.jsx)(l.A,{size:16})}),(0,r.jsx)("pre",{className:"bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm",children:'import { Dial } from "audioui"'})]})]}),(0,r.jsxs)("div",{className:"bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-white mb-3",children:"Basic Example"}),(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)("button",{className:"absolute top-2 right-2 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors duration-200",onClick:()=>b(`import { Dial } from "audioui"
import { useState } from "react"

export default function MyComponent() {
  const [volume, setVolume] = useState(50)
  
  return (
    <Dial
      label="Volume"
      value={volume}
      onChange={setVolume}
      showValue={true}
      valueFormat={(v) => \`\${v}%\`}
    />
  )
}`,"basic-example"),children:"basic-example"===m?(0,r.jsx)(i.A,{size:16}):(0,r.jsx)(l.A,{size:16})}),(0,r.jsx)("pre",{className:"bg-black/60 rounded-lg p-4 overflow-x-auto text-white/80 text-sm",children:`import { Dial } from "audioui"
import { useState } from "react"

export default function MyComponent() {
  const [volume, setVolume] = useState(50)
  
  return (
    <Dial
      label="Volume"
      value={volume}
      onChange={setVolume}
      showValue={true}
      valueFormat={(v) => \`\${v}%\`}
    />
  )
}`})]})]})]})]})]})})}function c(){let[e,t]=(0,s.useState)(50);return(0,r.jsx)("main",{className:"min-h-screen flex flex-col md:flex-row",children:(0,r.jsxs)("div",{className:"flex-grow p-4 md:p-8 flex flex-col items-center justify-start gap-8",children:[(0,r.jsx)("div",{className:"glass-container p-6 mt-8 md:mt-16",children:(0,r.jsx)(a.h,{variant:"default",label:"Interactive Knob",min:0,max:100,step:1,showValue:!0,knobVariant:"default",indicatorStyle:"line",glowColor:"rgba(255, 255, 255, 0.2)",trackColor:"rgba(255, 255, 255, 0.1)",indicatorColor:"rgba(255, 255, 255, 0.8)",value:e,onChange:t})}),(0,r.jsx)("div",{className:"w-full max-w-4xl",children:(0,r.jsx)(d,{})})]})})}},8921:(e,t,o)=>{Promise.resolve().then(o.bind(o,3612))},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var t=require("../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[580,818],()=>o(4871));module.exports=r})();