"use strict";exports.id=643,exports.ids=[643],exports.modules={6541:(e,t,a)=>{a.d(t,{A:()=>l});var n=a(5781),r=a(3072),s=a(7375),o=a(7401);let l=r.forwardRef(({className:e,...t},a)=>(0,n.jsxs)(s.bL,{ref:a,className:(0,o.cn)("relative flex w-full touch-none select-none items-center",e),...t,children:[(0,n.jsx)(s.CC,{className:"relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",children:(0,n.jsx)(s.Q6,{className:"absolute h-full bg-primary"})}),(0,n.jsx)(s.zi,{className:"block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"})]}));l.displayName=s.bL.displayName},8819:(e,t,a)=>{a.d(t,{u:()=>o});var n=a(5781),r=a(3072);let s=(...e)=>e.filter(Boolean).join(" "),o=({value:e,onChange:t,min:a=0,max:o=1,step:l=.01,size:i="md",color:d,className:u,lightX:c=75,lightY:b=25,metallic:g=50,sensitivity:h=.005,showTicks:m=!0,showIndicator:p=!0,disabled:x=!1,baseColor:f,indicatorColor:v="white",tickColor:$="rgba(255,255,255,0.4)",indicatorWidth:w=2,indicatorLength:y=50,tickSize:j=8,showValue:N=!1,valueFormat:k=e=>e.toFixed(2),label:_,labelColor:E,valueColor:S,labelFontSize:M="0.875rem",valueFontSize:L="0.875rem",borderColor:z,borderStyle:A="none",shadowIntensity:C="medium",reflections:q=!0,knobShape:D="circle",knobRatio:R=60,minAngle:T=-135,maxAngle:Y=135,glowOnActive:H=!0,glowColor:I="rgba(255,255,255,0.15)",tickFrequency:P=1,tickLabelFrequency:X=5,showTickLabels:B=!1,useCustomColors:F=!1})=>{let K=(0,r.useRef)(null),[O,Q]=(0,r.useState)(!1),[U,G]=(0,r.useState)(0),[J,V]=(0,r.useState)(0),[W,Z]=(0,r.useState)(0),[ee,et]=(0,r.useState)(0),[ea,en]=(0,r.useState)(!1),er=Y-T,es=(e-a)/(o-a)*er+T,eo=g/100,el=Math.max(10,40-25*eo),ei=.1+.5*eo,ed=1+3*eo,eu=.05+.25*eo,ec=Math.max(.05,(1-eo)*.2),eb=.3*eo,eg=.1+.4*eo,eh=10+15*eo,em=(0,r.useCallback)(t=>{!x&&(Q(!0),en(!0),G(t),V(e),Z(es),K.current&&(K.current.style.transition="none",K.current.querySelectorAll("*").forEach(e=>{e instanceof HTMLElement&&(e.style.transition="none")})))},[e,es,x]),ep=(0,r.useCallback)(n=>{if(!O||x)return;let r=J+(U-n)*h;Z(((r=Math.max(a,Math.min(o,r)))-a)/(o-a)*er+T),et(0),(r=Math.round(r/l)*l)!==e&&t(r)},[O,a,o,t,J,U,l,e,W,h,x,er,T]),ex=(0,r.useCallback)(()=>{Q(!1),K.current&&(K.current.style.transition="",K.current.querySelectorAll("*").forEach(e=>{e instanceof HTMLElement&&(e.style.transition="")})),et(0),en(!1)},[]),ef=(0,r.useCallback)(n=>{if(x)return;let r=e;switch(n.key){case"ArrowUp":case"ArrowRight":r=Math.min(o,e+l),en(!0);break;case"ArrowDown":case"ArrowLeft":r=Math.max(a,e-l),en(!0);break;case"Home":r=a,en(!0);break;case"End":r=o,en(!0);break;default:return}r!==e&&(n.preventDefault(),t(r),setTimeout(()=>en(!1),300))},[o,a,t,l,e,x]);(0,r.useEffect)(()=>{let e=e=>ep(e.clientY),t=()=>ex(),a=e=>{e.touches[0]&&ep(e.touches[0].clientY)},n=()=>ex();return O&&(document.addEventListener("mousemove",e),document.addEventListener("mouseup",t),document.addEventListener("touchmove",a,{passive:!1}),document.addEventListener("touchend",n)),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t),document.removeEventListener("touchmove",a),document.removeEventListener("touchend",n)}},[O,ep,ex]),(0,r.useEffect)(()=>{let e=e=>{O&&e.preventDefault()};return document.addEventListener("touchmove",e,{passive:!1}),()=>{document.removeEventListener("touchmove",e)}},[O]);let ev=180*Math.atan2(b-50,c-50)/Math.PI,e$=O?0:ee*eo*.5,ew=ei*(1-Math.min(.7,Math.sqrt(Math.pow(c-50,2)+Math.pow(b-50,2))/50*.7));return(0,n.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[_&&(0,n.jsx)("span",{style:{color:F&&E?E:"inherit",fontSize:M},children:_}),(0,n.jsxs)("div",{ref:K,className:s("relative aspect-square","backdrop-blur-[12px]","select-none touch-none",x?"opacity-50 cursor-not-allowed":"cursor-grab active:cursor-grabbing",{sm:"w-20 h-20",md:"w-28 h-28",lg:"w-36 h-36"}[i],u),style:{"--highlight-x":`${c}%`,"--highlight-y":`${b}%`,"--shadow-x":`${100-c}%`,"--shadow-y":`${100-b}%`,"--light-angle":`${ev}deg`,"--metallic":`${g}%`,"--specular-size":`${el}%`,"--specular-intensity":ew,"--specular-falloff":ed,"--reflection-sharpness":.8*eo,"--reflection-intensity":eu,"--brushed-effect":ec,"--surface-contrast":.3+.7*eo,"--secondary-highlight":eb,"--fresnel-intensity":eg,"--fresnel-size":`${eh}%`,"--dynamic-offset":`${e$}deg`,"--active-glow":ea&&H?"0.15":"0","--knob-color":d?`var(--${d})`:"rgba(255, 255, 255, 0.1)",backgroundColor:F&&f?f:void 0,borderRadius:{circle:"9999px",square:"0px",rounded:"0.75rem",squircle:"1.5rem"}[D],boxShadow:{none:"none",light:"0 0 10px rgba(0,0,0,0.3)",medium:"0 0 15px rgba(0,0,0,0.5)",strong:"0 0 20px rgba(0,0,0,0.8)"}[C],border:"none"!==A?({none:"none",thin:"1px solid",medium:"2px solid",thick:"3px solid"})[A]:"none",borderColor:F&&z?z:"rgba(255, 255, 255, 0.05)"},role:"slider",tabIndex:x?-1:0,"aria-valuenow":e,"aria-valuemin":a,"aria-valuemax":o,"aria-label":_||"Rotary control","aria-disabled":x,onKeyDown:ef,onMouseDown:e=>em(e.clientY),onTouchStart:e=>{e.touches[0]&&em(e.touches[0].clientY)},children:[(0,n.jsx)("div",{className:"absolute inset-[-5%] rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-[0_2px_4px_rgba(0,0,0,0.5)]"}),(0,n.jsx)("div",{className:"absolute inset-0 rounded-full bg-gradient-to-b from-zinc-800/90 to-black/90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]"}),(0,n.jsx)("div",{className:"absolute inset-[15%] rounded-full bg-black/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),_0_1px_1px_rgba(255,255,255,0.05)]"}),(0,n.jsx)("div",{className:"absolute inset-[20%] rounded-full overflow-hidden",style:{transform:`rotate(${es}deg)`,transition:O?"none":"transform 0.1s ease-out"},children:(0,n.jsx)("div",{className:"absolute inset-0 rounded-full",style:{background:`
                radial-gradient(circle at 50% 50%, 
                  rgba(${60+.4*g}, ${60+.4*g}, ${60+.4*g}, 1) 0%, 
                  rgba(${40+.3*g}, ${40+.3*g}, ${40+.3*g}, 1) 40%,
                  rgba(${30+.2*g}, ${30+.2*g}, ${30+.2*g}, 1) 70%,
                  rgba(${20+.1*g}, ${20+.1*g}, ${20+.1*g}, 1) 100%
                ),
                repeating-radial-gradient(
                  circle at center,
                  rgba(${80+.5*g}, ${80+.5*g}, ${80+.5*g}, ${ec}) 0px,
                  rgba(${50+.3*g}, ${50+.3*g}, ${50+.3*g}, ${ec}) 1px,
                  rgba(${70+.4*g}, ${70+.4*g}, ${70+.4*g}, ${ec}) 2px,
                  rgba(${50+.3*g}, ${50+.3*g}, ${50+.3*g}, ${ec}) 3px,
                  rgba(${80+.5*g}, ${80+.5*g}, ${80+.5*g}, ${ec}) 4px
                ),
                repeating-conic-gradient(
                  rgba(${100+.6*g}, ${100+.6*g}, ${100+.6*g}, ${eu}) 0deg 1deg,
                  rgba(${40+.2*g}, ${40+.2*g}, ${40+.2*g}, ${eu}) 3deg 4deg
                )
              `,boxShadow:`inset 0 0 ${20+.3*g}px rgba(0, 0, 0, ${.7-.3*eo})`,transition:O?"none":"all 0.1s ease-out"},children:p&&(0,n.jsx)("div",{className:"absolute top-0 left-1/2 w-[2px] h-[50%] bg-white rounded-full",style:{boxShadow:`0 0 ${5+5*eo}px rgba(255, 255, 255, ${.5+.3*eo})`,transform:"translateX(-50%)",transition:O?"none":"all 0.1s ease-out"}})})}),(0,n.jsx)("div",{className:"absolute inset-[46%] rounded-full bg-black/80 border border-white/5",style:{boxShadow:`inset 0 1px 2px rgba(0, 0, 0, 0.8), 0 0 ${3*eo}px rgba(255, 255, 255, ${.1*eo})`,transition:O?"none":"all 0.1s ease-out"}}),(0,n.jsx)("div",{className:"absolute inset-[20%] rounded-full pointer-events-none",style:{background:`
              radial-gradient(
                circle at var(--highlight-x) var(--highlight-y),
                rgba(255, 255, 255, ${ew}) 0%,
                rgba(255, 255, 255, ${ew/ed}) ${.5*el}%,
                transparent ${el}%
              )
            `,boxShadow:`inset 0 0 ${15+10*eo}px rgba(0, 0, 0, ${.5-.2*eo})`,transition:O?"none":"all 0.1s ease-out"}}),(0,n.jsx)("div",{className:"absolute inset-[20%] rounded-full pointer-events-none",style:{opacity:eb,background:`
              radial-gradient(
                ellipse at ${c>50?"100%":"0%"} ${b>50?"100%":"0%"},
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0.1) 30%,
                transparent 70%
              )
            `,transition:O?"none":"all 0.1s ease-out"}}),(0,n.jsx)("div",{className:"absolute inset-[20%] rounded-full pointer-events-none",style:{background:`
              radial-gradient(
                circle at var(--shadow-x) var(--shadow-y),
                rgba(0, 0, 0, ${.4+.2*eo}) 0%,
                rgba(0, 0, 0, ${.2+.1*eo}) 40%,
                transparent 70%
              )
            `,transition:O?"none":"all 0.1s ease-out"}}),(0,n.jsx)("div",{className:"absolute inset-[20%] rounded-full pointer-events-none overflow-hidden",style:{background:`
              radial-gradient(
                circle at 50% 50%,
                transparent ${100-eh}%,
                rgba(255, 255, 255, ${eg}) 100%
              )
            `,transition:O?"none":"all 0.1s ease-out"}}),(0,n.jsx)("div",{className:"absolute inset-[20%] rounded-full pointer-events-none overflow-hidden",style:{opacity:eo,background:`
              linear-gradient(
                ${ev+e$}deg,
                transparent 0%,
                rgba(255, 255, 255, 0.1) 45%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0.1) 55%,
                transparent 100%
              )
            `,transition:O?"none":"all 0.1s ease-out"}}),(0,n.jsx)("div",{className:"absolute inset-[20%] rounded-full pointer-events-none transition-opacity duration-300",style:{boxShadow:"0 0 15px rgba(255, 255, 255, var(--active-glow))",opacity:+!!ea,transition:O?"none":"opacity 0.3s ease-out"}}),(0,n.jsx)("div",{className:"absolute inset-0 rounded-full pointer-events-none border border-white/5",style:{opacity:.5+.3*eo,transition:O?"none":"all 0.1s ease-out"}}),(0,n.jsx)("div",{className:"absolute inset-[-2%] -z-10 rounded-full bg-gradient-to-b from-zinc-900 to-black shadow-[0_2px_4px_rgba(0,0,0,0.5)]"}),m&&(0,n.jsx)("div",{className:"absolute inset-0 overflow-hidden z-10",children:(0,n.jsx)("div",{className:"absolute inset-[-5%] bottom-[-10%] rounded-full",children:(0,n.jsx)("div",{className:"absolute left-1/2 bottom-[5%] w-[110%] h-[110%] -translate-x-1/2",style:{clipPath:"polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)"},children:Array.from({length:60}).map((e,t)=>{if(t<15||t>=45)return null;let a=t%10==0,r=t%5==0&&!a;return(0,n.jsx)("div",{className:s("absolute origin-top",a?"w-[3px] h-[16px] bg-white/70":r?"w-[2.5px] h-[12px] bg-white/50":"w-[2px] h-[8px] bg-white/40"),style:{left:"50%",top:"0%",transform:`translateX(-50%) rotate(${6*t}deg)`,transformOrigin:"center bottom",transition:O?"none":"all 0.1s ease-out"}},t)})})})})]}),N&&(0,n.jsx)("span",{style:{color:F&&S?S:"inherit",fontSize:L},children:k(e)})]})}}};