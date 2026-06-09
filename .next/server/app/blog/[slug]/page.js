(()=>{var e={};e.id=308,e.ids=[308],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5649:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>s.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>h,tree:()=>d}),a(8598),a(8901),a(996);var i=a(170),r=a(5002),n=a(3876),s=a.n(n),o=a(6299),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(t,l);let d=["",{children:["blog",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,8598)),"/Users/whyasaf/Desktop/whyasaf@root/whyasaf_websayt/app/blog/[slug]/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,8901)),"/Users/whyasaf/Desktop/whyasaf@root/whyasaf_websayt/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,996,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/whyasaf/Desktop/whyasaf@root/whyasaf_websayt/app/blog/[slug]/page.tsx"],u="/blog/[slug]/page",m={require:a,loadChunk:()=>Promise.resolve()},h=new i.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/blog/[slug]/page",pathname:"/blog/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2559:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,4080,23)),Promise.resolve().then(a.bind(a,4579))},7358:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});let i=(0,a(6323).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},820:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});let i=(0,a(6323).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},4579:(e,t,a)=>{"use strict";a.d(t,{default:()=>b});var i=a(7247),r=a(8964),n=a(9906),s=a(6323);let o=(0,s.Z)("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]),l=(0,s.Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]),d=(0,s.Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),c=(0,s.Z)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);var u=a(820);let m=(0,s.Z)("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);var h=a(7358),p=a(1313),y=a(5326);function f(e){return Math.max(1,Math.ceil(e.replace(/<[^>]*>/g,"").split(/\s+/).filter(Boolean).length/200))}let g={INSIGHTS:{bg:"bg-cyan-100 dark:bg-cyan-950/40",text:"text-cyan-600 dark:text-cyan-400",border:"border-cyan-200 dark:border-cyan-800"},INVESTMENT:{bg:"bg-emerald-100 dark:bg-emerald-950/40",text:"text-emerald-600 dark:text-emerald-400",border:"border-emerald-200 dark:border-emerald-800"},SYSTEMS:{bg:"bg-blue-100 dark:bg-blue-950/40",text:"text-blue-600 dark:text-blue-400",border:"border-blue-200 dark:border-blue-800"}};function k(e){return g[e]||g.INSIGHTS}function b({post:e,blogPosts:t}){let{language:a}=(0,p.Z)(),s=y.I[a],[g,b]=(0,r.useState)(0),[x,v]=(0,r.useState)(!1),[z,w]=(0,r.useState)(!1),[S,A]=(0,r.useState)(!1),j=(0,r.useRef)(null),I=async()=>{try{await navigator.clipboard.writeText(window.location.href),w(!0),setTimeout(()=>w(!1),2e3)}catch{}},T="tr"===a?e.tr:e.en,M=e.nextPostId?t[e.nextPostId]:null,N=f(T.content),C=k(e.category);return(0,i.jsxs)(i.Fragment,{children:[i.jsx("div",{className:"fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent",children:i.jsx("div",{className:"h-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 transition-all duration-150 ease-out",style:{width:`${g}%`}})}),i.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${x?"opacity-100 translate-y-0":"opacity-0 translate-y-4 pointer-events-none"}`,"aria-label":s.blogBackToTop,children:i.jsx(o,{size:18})}),(0,i.jsxs)("article",{ref:j,className:"max-w-2xl mx-auto space-y-8 text-left",children:[(0,i.jsxs)("div",{className:`flex items-center justify-between transition-all duration-700 ${S?"opacity-100 translate-y-0":"opacity-0 -translate-y-4"}`,children:[(0,i.jsxs)(n.default,{href:"/blog",className:"inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors group",children:[i.jsx(l,{size:14,className:"group-hover:-translate-x-0.5 transition-transform"}),s.blogBack]}),i.jsx("div",{className:"flex items-center gap-2",children:i.jsx("button",{onClick:I,className:"inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-all select-none",title:s.blogShare,children:z?(0,i.jsxs)(i.Fragment,{children:[i.jsx(d,{size:13,className:"text-emerald-500"}),i.jsx("span",{className:"text-emerald-600 dark:text-emerald-400 font-sans",children:s.blogShareSuccess})]}):(0,i.jsxs)(i.Fragment,{children:[i.jsx(c,{size:13}),i.jsx("span",{className:"font-sans",children:s.blogShare})]})})})]}),(0,i.jsxs)("div",{className:`space-y-5 border-b border-zinc-200 dark:border-zinc-900 pb-8 transition-all duration-700 delay-100 ${S?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`,children:[(0,i.jsxs)("div",{className:"flex flex-wrap items-center gap-3 text-xs font-medium",children:[i.jsx("span",{className:`px-2.5 py-1 ${C.bg} ${C.text} rounded-md text-[10px] font-bold uppercase tracking-widest`,children:e.category}),(0,i.jsxs)("span",{className:"flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-sans",children:[i.jsx(u.Z,{size:12}),e.date]}),(0,i.jsxs)("span",{className:"flex items-center gap-1 text-zinc-400 dark:text-zinc-500 font-sans",children:[i.jsx("span",{className:"inline-block w-[11px] h-[11px]",children:"⏱"}),N," ",s.blogReadTime]})]}),i.jsx("h1",{className:"text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15] font-sans",children:T.title}),i.jsx("p",{className:"text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-light italic border-l-2 border-cyan-300 dark:border-cyan-800 pl-4 py-1 font-sans",children:T.lead}),(0,i.jsxs)("div",{className:"flex items-center gap-4 pt-2",children:[i.jsx("div",{className:"w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center ring-2 ring-zinc-100 dark:ring-zinc-900",children:i.jsx("span",{className:"text-xs font-bold text-zinc-500 dark:text-zinc-400 font-sans",children:"\xd6A"})}),(0,i.jsxs)("div",{children:[i.jsx("div",{className:"text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-sans",children:e.author}),(0,i.jsxs)("div",{className:"flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 font-sans",children:[i.jsx(m,{size:10}),e.location]})]})]})]}),i.jsx("div",{className:"blog-content text-zinc-800 dark:text-zinc-300 text-sm md:text-base leading-relaxed space-y-6 transition-all duration-700 delay-200",dangerouslySetInnerHTML:{__html:T.content}}),g>95&&i.jsx("div",{className:"flex items-center justify-center py-6 animate-in fade-in duration-500",children:(0,i.jsxs)("div",{className:"flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-full text-emerald-600 dark:text-emerald-400 text-xs font-medium font-sans",children:[i.jsx(d,{size:14}),"tr"===a?"Okuma tamamlandı!":"Reading complete!"]})}),M&&(0,i.jsxs)("div",{className:"border-t border-zinc-200 dark:border-zinc-900 pt-8 mt-12",children:[(0,i.jsxs)("div",{className:"text-zinc-450 dark:text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2 font-sans",children:[i.jsx(h.Z,{size:12}),s.blogNextPost]}),(0,i.jsxs)(n.default,{href:`/blog/${M.id}`,className:"group block relative overflow-hidden p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 rounded-xl hover:shadow-md",children:[i.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-cyan-50/0 to-cyan-50/50 dark:from-cyan-950/0 dark:to-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"}),(0,i.jsxs)("div",{className:"relative z-10 flex items-center justify-between",children:[(0,i.jsxs)("div",{children:[(0,i.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[i.jsx("span",{className:`text-[10px] ${k(M.category).bg} ${k(M.category).text} px-2 py-0.5 rounded font-semibold uppercase tracking-wider font-sans`,children:M.category}),(0,i.jsxs)("span",{className:"flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500 font-sans",children:[i.jsx("span",{className:"inline-block w-[11px] h-[11px]",children:"⏱"}),f("tr"===a?M.tr.content:M.en.content)," ",s.blogReadTime]})]}),i.jsx("h3",{className:"text-zinc-800 dark:text-zinc-200 font-bold text-sm md:text-base mt-1 group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors font-sans",children:"tr"===a?M.tr.title:M.en.title})]}),i.jsx("div",{className:"w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950/50 group-hover:border-cyan-200 dark:group-hover:border-cyan-800/50 transition-all duration-300 ml-4 shrink-0",children:i.jsx(h.Z,{size:16,className:"text-zinc-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all"})})]})]})]})]})]})}},8598:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>f,generateMetadata:()=>y});var i=a(2051),r=a(6269),n=a(5949),s=a.n(n);let o=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),l=(...e)=>e.filter((e,t,a)=>!!e&&a.indexOf(e)===t).join(" ");var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let c=(0,r.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:n="",children:s,iconNode:o,...c},u)=>(0,r.createElement)("svg",{ref:u,...d,width:t,height:t,stroke:e,strokeWidth:i?24*Number(a)/Number(t):a,className:l("lucide",n),...c},[...o.map(([e,t])=>(0,r.createElement)(e,t)),...Array.isArray(s)?s:[s]])),u=((e,t)=>{let a=(0,r.forwardRef)(({className:a,...i},n)=>(0,r.createElement)(c,{ref:n,iconNode:t,className:l(`lucide-${o(e)}`,a),...i}));return a.displayName=`${e}`,a})("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var m=a(4115);let h={"kontrol-bizde-mi":{id:"kontrol-bizde-mi",category:"INSIGHTS",date:"28 March 2026",dateISO:"2026-03-28",author:"\xd6mer Asaf Ak",location:"Istanbul, Turkey",image:"assets/linked1.png",nextPostId:"110b-investment",nextPostTitle:{tr:"110 Milyar Dolar: Bir Yatırım mı, Yoksa Geleceğin Satın Alınması mı?",en:"$110 Billion: An Investment, or Purchasing the Future?"},tr:{title:"Kontrol Bizde mi, Yoksa Sadece \xd6yle mi Sanıyoruz?",lead:"Bug\xfcn yapay zekayı işlerimizi kolaylaştıran bir asistan olarak g\xf6r\xfcyoruz. Peki ya bu asistan, saniyeler i\xe7inde insanlığın toplam zekasından milyonlarca kat daha akıllı hale gelirse? Buna S\xfcper Yapay Zeka (ASI) diyoruz. Bu sadece teknolojik bir adım değil; insanlık tarihindeki en b\xfcy\xfck yapısal kırılma noktası.",content:`
        <h2>Zeka Patlaması</h2>
        <p>
          ASI, teorik bir kavramdan \xe7ok, \xe7\xf6z\xfclemeyen denklemlerin sonu anlamına geliyor. 
          Kanserden iklim krizine kadar insan aklının sınırlı kaldığı t\xfcm "sistem hataları," 
          ASI i\xe7in bir \xf6ğle arası sim\xfclasyonu kadar basit olabilir. Ancak bu hız, beraberinde bir 
          <strong>"Hizalama Sorunu"</strong> getiriyor: Bizden milyonlarca kat hızlı d\xfcş\xfcnen bir yapıyı, 
          kendi kısıtlı kurallarımızla ne kadar s\xfcre zapt edebiliriz?
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SİSTEM BİLGİSİ</span>
          <p>
            Bir sistemin g\xfcvenliği, o sistemi kuran aklın kapasitesiyle sınırlıdır. ASI, kendi kodunu baştan yazabilen bir yapıya d\xf6n\xfcşt\xfcğ\xfcnde; kontrol bir "yetki" olmaktan \xe7ıkıp, bir "yanılsama" haline gelir.
          </p>
        </div>
        <h2>Se\xe7im İll\xfczyonu</h2>
        <p>
          Her piksel bir karardır. Tasarımda kısıtlama ve işlevselliğin kesiştiği noktada durmak, ne ekleyeceğinizi değil, neyi \xe7ıkaracağınızı se\xe7mek demektir. 
          Ancak algoritmik sistemlerde bu se\xe7im mimarisi bizim yerimize yapılıyor. En unutulmaz aray\xfczler, size her şeyi g\xf6sterebilenler değil; 
          size bir sonraki adımda ne yapmanız gerektiğini hissettirenlerdir. 
        </p>
        <p>
          Peki, bu "hissetme" hali ger\xe7ekten \xf6zg\xfcr irade mi, yoksa kusursuz bir <strong>Sistem Tasarımı</strong> mı? 
          Modern bir aray\xfczdeki "G\xf6nder" butonu, sadece bir komut değildir; o sistemin sizi y\xf6nlendirdiği son duraktır. 
          Gereksiz her karakter, kullanıcının taşımak zorunda olduğu bir y\xfckt\xfcr ve ASI bu y\xfck\xfc bizim adımıza tamamen yok etmeye hazırıyor.
        </p>
        <h2>Sistem Mimarisi Olarak Algoritmalar</h2>
        <p>
          Geleceğin d\xfcnyasında algoritmalar, modern bir binanın taşıyıcı kolonları gibidir. Onları doğrudan g\xf6rmezsiniz, ancak t\xfcm yapının ayakta kalmasını sağlayan "niyetleri" onlar belirler. 
          Yazılımda kullandığımız değişkenler artık sadece renk kodları değil; birer <strong>Sistem Belirleyicidir.</strong>
        </p>
        <p>
          This niyetin uygulamadan ayrılması, karanlık modun m\xfcmk\xfcn olmasını sağlayan şeydir; ancak aynı zamanda sistemin "neye d\xf6n\xfcşeceğine" karar veren mekanizmadır. 
          Duvarları boyamazsınız, ışığı değiştirirsiniz. ASI ile birlikte, ışığı kimin kontrol ettiği sorusu, kodun kendisinden daha değerli hale geliyor.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SİSTEM BİLGİSİ</span>
          <p>
            Minimalizm, karar eksikliği değildir; o kadar net bir hiyerarşinin varlığıdır ki, hi\xe7bir şey eklenmeyi talep etmez. Her sistem elemanı şu soruya cevap verebilmelidir: <em>Neden buradayım?</em>
          </p>
        </div>
        <h2>Mimar mı, İzleyici mi?</h2>
        <p>
          S\xfcper Yapay Zeka bizi bir \xdctopya'ya mı taşıyor, yoksa kendi ellerimizle inşa ettiğimiz devasa bir Distopya'nın eşiğinde miyiz? 
          Bu yolculukta "izleyici" olarak kalmak bir se\xe7enek değil. Unutulmaz sistemler sihirle değil; geometri, tipografi ve <strong>sessizliğin</strong> disiplinli uygulanışıyla kurulur. 
          Ve o sessizliği kimin y\xf6nettiği, geleceğin asıl hikayesi olacak.
        </p>
      `},en:{title:"Are We in Control, or Do We Just Think We Are?",lead:"Today we see artificial intelligence as an assistant that makes our lives easier. But what if this assistant becomes millions of times smarter than the total intelligence of humanity in seconds? We call this Artificial Superintelligence (ASI). This is not just a technological step — it is the greatest structural breaking point in human history.",content:`
        <h2>The Intelligence Explosion</h2>
        <p>
          ASI means more than a theoretical concept — it represents the end of unsolvable equations. 
          From cancer to the climate crisis, all the "system errors" where human intellect falls short 
          could be as simple as a lunch-break simulation for ASI. But this speed brings with it an 
          <strong>"Alignment Problem"</strong>: How long can we contain a structure that thinks millions 
          of times faster than us with our own limited rules?
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SYSTEM INSIGHT</span>
          <p>
            A system's security is limited by the capacity of the mind that built it. When ASI transforms into a structure that can rewrite its own code from scratch, control ceases to be "authority" and becomes an "illusion."
          </p>
        </div>
        <h2>The Illusion of Choice</h2>
        <p>
          Every pixel is a decision. Standing at the intersection of constraint and functionality in design 
          means choosing what to remove, not what to add. But in algorithmic systems, this architecture of 
          choice is being made on our behalf. The most unforgettable interfaces are not those that can show 
          you everything — they are the ones that make you feel what you need to do next.
        </p>
        <p>
          But is this "feeling" truly free will, or a flawless <strong>System Design</strong>? 
          The "Send" button in a modern interface is not just a command; it is the last stop where the system 
          directs you. Every redundant character is a burden the user must carry — and ASI is preparing to 
          eliminate that burden entirely on our behalf.
        </p>
        <h2>Algorithms as Architecture</h2>
        <p>
          In the world of tomorrow, algorithms are like the load-bearing columns of a modern building. 
          You don't see them directly, but they determine the "intentions" that keep the entire structure standing. 
          The variables we use in software are no longer just color codes — they are <strong>System Determinants.</strong>
        </p>
        <p>
          This separation of intent from implementation is what makes dark mode possible; but it is also 
          the mechanism that decides "what the system will become." You don't repaint the walls — you change 
          the lighting. With ASI, the question of who controls the light becomes more valuable than the code itself.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SYSTEM INSIGHT</span>
          <p>
            Minimalism is not the absence of decision — it is the presence of a hierarchy so clear that nothing demands to be added. Every system element must be able to answer one question: <em>Why am I here?</em>
          </p>
        </div>
        <h2>Conclusion: Architect or Spectator?</h2>
        <p>
          Is Artificial Superintelligence carrying us toward a Utopia, or are we on the brink of a massive 
          Dystopia we built with our own hands? Remaining a "spectator" on this journey is not an option. 
          Unforgettable systems are built not with magic, but with the disciplined application of geometry, 
          typography, and <strong>silence</strong>. And who manages that silence will be the real story of the future.
        </p>
      `}},"110b-investment":{id:"110b-investment",category:"INVESTMENT",date:"1 April 2026",dateISO:"2026-04-01",author:"\xd6mer Asaf Ak",location:"Istanbul, Turkey",image:"assets/linked2.png",nextPostId:"than-code",nextPostTitle:{tr:"Koddan Daha B\xfcy\xfck: Sistem Mimarı Olmak",en:"Bigger Than Code: Becoming a Systems Architect"},tr:{title:"110 Milyar Dolar: Bir Yatırım mı, Yoksa Geleceğin Satın Alınması mı?",lead:"Ge\xe7en yazımda S\xfcper Yapay Zeka (ASI) kavramının teoride neleri değiştirebileceğini konuşmuştuk. Bug\xfcn ise bu hedefin arkasındaki devasa finansal g\xfcc\xfc g\xf6r\xfcyoruz: OpenAI, tam 110 milyar dolarlık rekor bir yatırım aldı. Bu rakam, ASI'ya bug\xfcn ulaşacağımız anlamına gelmiyor; aksine bu yoldaki fiziksel engellerin ne kadar maliyetli olduğunun bir kanıtı.",content:`
        <h2>Zekanın Fizikselliği</h2>
        <p>
          Yapay zekayı \xe7oğu zaman "bulutlarda" yaşayan soyut bir kod yığını olarak hayal ediyoruz. Ancak 110 milyar dolarlık bu hamle, bize madalyonun diğer y\xfcz\xfcn\xfc g\xf6steriyor: <strong>Altyapı ve Donanım Savaşı.</strong> 
          Mevcut işlemci g\xfcc\xfc ASI i\xe7in hen\xfcz yolun \xe7ok başında. Bu yatırım; sadece algoritmalar i\xe7in değil, devasa veri merkezleri, \xf6zel \xe7ipler ve bu sistemleri ayakta tutacak enerji \xe7\xf6z\xfcmleri inşa etmek i\xe7in kullanılacak.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SİSTEM BİLGİSİ</span>
          <p>
            B\xfcy\xfck sistemler, sadece akıllı yazılımlarla değil, o yazılımın \xfczerine oturduğu fiziksel kısıtlamaların (enerji, donanım, hacim) y\xf6netilmesiyle kurulur. 110 milyar dolar, yazılımın fiziksel sınırlarını genişletme girişimidir.
          </p>
        </div>
        <h2>Ar-Ge Sınırlarını Zorlamak</h2>
        <p>
          Teoriden pratiğe ge\xe7işte karşılaşılan veri ve model kısıtlamalarını aşmak artık bir "matematik" sorusu olmaktan \xe7ıkıp bir "kaynak" sorusuna d\xf6n\xfcşt\xfc. OpenAI'ın eline ge\xe7en bu eşsiz koz, sadece daha fazla m\xfchendis \xe7alıştırmak değil; 
          ger\xe7ek d\xfcnyadaki atomları, dijital d\xfcnyadaki bit'ler kadar hızlı işleyebilme kapasitesidir. Bilimsel merak, artık devasa bir sermayenin yakıtıyla hareket eden bir roket haline gelmiş durumda.
        </p>
        <h2>Aklın Tekelleşmesi</h2>
        <p>
          Peki, bu \xe7apta bir sermaye tek bir noktada toplandığında ne olur? Teknoloji d\xfcnyasında "demokratik gelişim" vizyonu, sermaye duvarlarının arkasına mı saklanıyor? 
          Bir bilgisayar programcılığı \xf6ğrencisi ve tasarımcı olarak şunu sormadan edemiyorum: Geleceğin zekasını inşa ederken rotayı bilimsel etik mi, yoksa bu devasa sermayenin geri d\xf6n\xfcş beklentisi mi belirleyecek?
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SİSTEM BİLGİSİ</span>
          <p>
            Teknoloji tarafsız değildir. Onu finanse eden g\xfccun niyetleri, sistemin mimarisini (architecture of the system) derinden etkiler. Sermaye yoğunlaştık\xe7a, sistemin dışa kapalılığı artar.
          </p>
        </div>
        <h2>Mimar mı, Yatırımcı mı?</h2>
        <p>
          Sizce 110 milyar dolar bizi hayal ettiğimiz o g\xfcvenli yapay zekaya mı yaklaştırıyor, yoksa kontrol\xfcn tamamen sınırlı bir \xe7evrede toplandığı "kapalı devre" bir d\xf6nemi mi başlatıyor? 
          Geleceği inşa ederken sadece kod yazan değil, o kodun hangi sermaye ve enerji yapısı \xfczerinde y\xfckseldiğini g\xf6renler oyunu kuracak. Rotayı hala biz mi belirliyoruz, yoksa 110 milyar dolarlık bu m\xfch\xfcr \xe7oktan basıldı mı?
        </p>
      `},en:{title:"$110 Billion: An Investment, or Purchasing the Future?",lead:"In my last article, we discussed what Artificial Superintelligence (ASI) could theoretically change. Today, we see the massive financial force behind that goal: OpenAI has received a record $110 billion investment. This figure doesn't mean we'll reach ASI today — rather, it's proof of how costly the physical barriers on this path truly are.",content:`
        <h2>The Physicality of Intelligence</h2>
        <p>
          We often imagine artificial intelligence as an abstract pile of code living "in the clouds." 
          But this $110 billion move shows us the other side of the coin: <strong>The Infrastructure and Hardware War.</strong> 
          Current processing power is still at the very beginning of the road toward ASI. This investment will be used 
          not just for algorithms, but to build massive data centers, custom chips, and energy solutions to keep these systems running.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SYSTEM INSIGHT</span>
          <p>
            Large systems are built not just with intelligent software, but by managing the physical constraints (energy, hardware, volume) upon which that software sits. $110 billion is an attempt to expand the physical boundaries of software.
          </p>
        </div>
        <h2>Expanding the Frontier</h2>
        <p>
          Overcoming the data and model constraints encountered in the transition from theory to practice has shifted 
          from being a "mathematics" problem to a "resources" problem. The unique advantage now in OpenAI's hands is not 
          just hiring more engineers — it's the capacity to process real-world atoms as fast as digital bits. Scientific 
          curiosity has become a rocket fueled by massive capital.
        </p>
        <h2>The Monopoly of Reason</h2>
        <p>
          What happens when capital of this magnitude concentrates at a single point? Is the vision of "democratic development" 
          in the technology world hiding behind the walls of capital? As a computer programming student and designer, 
          I can't help but ask: Will the route to building the intelligence of the future be determined by scientific ethics, 
          or by the return expectations of this massive capital?
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SYSTEM INSIGHT</span>
          <p>
            Technology is not neutral. The intentions of the power that finances it deeply affect the architecture of the system. As capital concentrates, the system's insularity increases.
          </p>
        </div>
        <h2>Conclusion: Architect or Investor?</h2>
        <p>
          Do you think $110 billion is bringing us closer to the safe artificial intelligence we dream of, or is it 
          launching a "closed-circuit" era where control is concentrated entirely in a limited circle? Those who can see 
          not just the code but the capital and energy structure upon which it rises will shape the game. Are we still 
          setting the course, or has this $110 billion seal already been stamped?
        </p>
      `}},"than-code":{id:"than-code",category:"SYSTEMS",date:"3 April 2026",dateISO:"2026-04-03",author:"\xd6mer Asaf Ak",location:"Istanbul, Turkey",image:"assets/linked3.png",nextPostId:"kontrol-bizde-mi",nextPostTitle:{tr:"Kontrol Bizde mi, Yoksa Sadece \xd6yle mi Sanıyoruz?",en:"Are We in Control, or Do We Just Think We Are?"},tr:{title:"Koddan Daha B\xfcy\xfck: Sistem Mimarı Olmak",lead:"Son zamanlarda kendimi tanımlamakta zorlanıyorum. \xc7\xfcnk\xfc artık sadece 'yazılım \xf6ğrencisi' olmak bana yeterli gelmiyor. Kod yazabiliyorum, evet. Ama asıl ilgimi \xe7eken şey koddan daha b\xfcy\xfck bir olgu: Sistemler. Kaos gibi g\xf6r\xfcnen bir yapının nasıl bu kadar d\xfczenli olabildiğini anlamaya \xe7alışıyorum.",content:`
        <h2>Kaosun Geometrisi</h2>
        <p>
          Bir havaalanı nasıl \xe7alışır? Binlerce insanı, veriyi ve s\xfcreci kim y\xf6neter? Dışarıdan bakıldığında kaos gibi g\xf6r\xfcnen bu yapıların arkasında kusursuz bir d\xfczen yatar. 
          Ger\xe7ek g\xfcc\xfcn kodun kendisinde değil, o kodun kurduğu <strong>ekosistemde</strong> olduğunu fark ettiğim an, bakış a\xe7ım k\xf6kten değişti. Yazılım artık benim i\xe7in sadece bir ara\xe7; asıl mesele, o ara\xe7la ne inşa ettiğin.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SİSTEM BİLGİSİ</span>
          <p>
            Karmaşıklık, kontrol edilemeyen bir yığın değildir; doğru tasarlanmış bir hiyerarşinin sonucudur. Bir sistemi anlamak, par\xe7aları değil, par\xe7alar arasındaki ilişkileri (connections) y\xf6netmektir.
          </p>
        </div>
        <h2>Butonun \xd6tesine Bakmak</h2>
        <p>
          Daha b\xfcy\xfck bakmaya \xe7alışıyorum. Bir butonun teknik olarak nasıl \xe7alıştığını anlamak giriş seviyesidir; o butonun hangi sistemin par\xe7ası olduğunu, hangi veri akışını tetiklediğini ve kullanıcı deneyimindeki yerini anlamak ise mimarlıktır. 
          Uygulama yapmak bir zanaattır ama <strong>sistem kurmak</strong> bambaşka bir disiplindir. Yapay zekanın kodu saniyeler i\xe7inde yazdığı bir d\xfcnyada, sadece kod yazan biri olmak artık g\xfcvenli bir liman değil.
        </p>
        <h2>Geleceğin Rol\xfc</h2>
        <p>
          B\xfcy\xfck resmi g\xf6rebilen, par\xe7aları birleştirebilen ve sistemin ruhunu tasarlayanlar fark yaratacak. Belki şu an yolun başındayım ama neye d\xf6n\xfcşmek istediğimi net g\xf6r\xfcyorum: 
          Sadece \xe7alışan kodlar yazmak değil, yaşayan ve nefes alan <strong>sistemler inşa etmek.</strong>
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SİSTEM BİLGİSİ</span>
          <p>
            Yazılımın geleceği, bireysel kodlama becerilerinden ziyade, bu becerileri bir 'Orkestra Şefi' gibi y\xf6netebilen sistem kurma yeteneğinde yatar. Kod \xfcretilir, sistem ise tasarlanır.
          </p>
        </div>
        <h2>Geleceği Tasarlamak</h2>
        <p>
          Yazılımın geleceği bireysel becerilerde mi, yoksa sistem kurabilme yeteneğinde mi? Benim cevabım net: Bireysel beceri artık temel bir gereklilik (commodity), ancak ger\xe7ek katma değer sistem mimarisinde. 
          Geleceği inşa ederken sadece komutları değil, d\xfczenin kendisini tasarlayanlar masada kalacak.
        </p>
      `},en:{title:"Bigger Than Code: Becoming a Systems Architect",lead:"Lately, I've been struggling to define myself. Because just being a 'software student' no longer feels sufficient. I can write code, yes. But what truly fascinates me is something bigger than code: Systems. I'm trying to understand how a structure that looks like chaos can be so perfectly ordered.",content:`
        <h2>The Geometry of Entropy</h2>
        <p>
          The geometry of airport operations? Who manages thousands of people, data streams, and processes? 
          Behind these structures that look like chaos from the outside lies a flawless order. The moment 
          I realized that the real power is not in the code itself but in the <strong>ecosystem</strong> 
          the code creates, my perspective fundamentally shifted. Software is now just a tool for me — 
          the real question is what you build with that tool.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SYSTEM INSIGHT</span>
          <p>
            Complexity is not an uncontrollable heap; it is the result of a properly designed hierarchy. Understanding a system means managing not the parts, but the connections between them.
          </p>
        </div>
        <h2>Beyond the Button</h2>
        <p>
          I'm trying to look bigger. Understanding how a button technically works is entry level; 
          understanding which system that button belongs to, which data flow it triggers, and its place 
          in the user experience — that is architecture. Building applications is a craft, but 
          <strong>building systems</strong> is an entirely different discipline. In a world where AI writes 
          code in seconds, being someone who only writes code is no longer a safe harbor.
        </p>
        <h2>The Future of Agency</h2>
        <p>
          Those who can see the big picture, connect the pieces, and design the soul of the system will 
          make the difference. Maybe I'm at the beginning of the road right now, but I can clearly see 
          what I want to become: Not just writing working code, but building living, breathing <strong>systems.</strong>
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SYSTEM INSIGHT</span>
          <p>
            The future of software lies not in individual coding skills, but in the ability to manage those skills like a 'Conductor' — building systems. Code is produced; systems are designed.
          </p>
        </div>
        <h2>Conclusion: Architecting the Future</h2>
        <p>
          Is the future of software in individual skills, or in the ability to build systems? My answer 
          is clear: Individual skill is now a basic requirement (commodity), but real added value lies in 
          systems architecture. When building the future, those who design not just the commands but the 
          order itself will remain at the table.
        </p>
      `}},"spacex-ipo":{id:"spacex-ipo",category:"INVESTMENT",date:"8 April 2026",dateISO:"2026-04-08",author:"\xd6mer Asaf Ak",location:"Istanbul, Turkey",image:"assets/linked4.png",nextPostId:"than-code",nextPostTitle:{tr:"Koddan Daha B\xfcy\xfck: Sistem Mimarı Olmak",en:"Bigger Than Code: Becoming a Systems Architect"},tr:{title:"SpaceX Halka Arzı: Bir Yatırım Fırsatından Fazlası",lead:"Teknoloji ve finans d\xfcnyasında her g\xfcn aynı soru yankılanıyor: SpaceX halka arz olacak mı? Ancak SpaceX s\xf6z konusu olduğunda mesele sadece bir şirketin borsaya a\xe7ılması değil; \xe7ok daha geniş bir \xe7er\xe7evede geleceğin altyapısına erişim anlamına geliyor.",content:`
        <h2>SpaceX’i Farklı Kılan Nedir?</h2>
        <p>
          SpaceX’i geleneksel teknoloji şirketlerinden ayıran en \xf6nemli unsur, \xfcr\xfcn odakli değil <strong>sistem odakli</strong> bir yapı inşa etmesidir. Şirket sadece roket fırlatmıyor; ulaşımdan iletişime kadar her şeyi kapsayan devasa bir ekosistem kuruyor.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SİSTEM BİLGİSİ</span>
          <p>
            SpaceX bir uzay şirketi değildir; \xe7ok katmanlı bir teknolojik altyapı sağlayıcısıdır. Starlink ile veri akışını, Starship ile lojistiği kontrol eden bir 'Gelecek Mimarı'dır.
          </p>
        </div>
        <h2>Halka Arz Paradoksu</h2>
        <p>
          Halka a\xe7ık şirketler, \xe7eyreklik finansal raporlar ve yatırımcı baskısı altında kısa vadeli performans sergilemek zorundadır. Ancak SpaceX; y\xfcksek sermaye gerektiren, belirsizlik i\xe7eren ve uzun geliştirme d\xf6ng\xfclerine dayanan Ar-Ge s\xfcre\xe7leri \xfczerine kuruludur. Bu y\xfczden halka arz, şirketin stratejik esnekliğini sınırlayabilir.
        </p>
        <h2>Yatırım mı, Sistem mi?</h2>
        <p>
          Asıl soru şu: SpaceX’e yatırım yapmak, bir hisse senedine mi yoksa bir sisteme mi yatırım yapmaktır? SpaceX; global iletişim (Starlink), gezegenler arası ulaşım (Starship) ve uzun vadeli yaşam alanları gibi alanları kapsayan bir altyapı ekosistemi inşa etmektedir.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">STRATEJİK \xd6NG\xd6R\xdc</span>
          <p>
            En g\xfc\xe7l\xfc senaryo, Starlink'in ayrı bir halka arz s\xfcreciyle ayrıştırılmasıdır. Bu hamle, ana şirketin uzun vadeli Mars vizyonunu korurken, yatırımcılara devasa veri altyapısına erişim imkanı tanır.
          </p>
        </div>
        <h2>Sonu\xe7: Bir Sistemin İnşası</h2>
        <p>
          Olası bir halka arz durumunda bu sadece yeni bir 'stock' olmayacaktır. Bu, bireysel yatırımcıların uzay ekonomisine ve geleceğin teknolojik sistemlerine dolaylı katılımıdır. SpaceX'in halka arzı bir şirketin b\xfcy\xfcmesi değil, <strong>bir sistemin inşa edilmesidir.</strong>
        </p>
      `},en:{title:"SpaceX IPO: More Than Just an Investment Opportunity",lead:"The tech and financial worlds echo the same question every day: Will SpaceX go public? But when it comes to SpaceX, it's not just about a company listing on the stock exchange; it means accessing the infrastructure of the future—accessing the system itself.",content:`
        <h2>What Makes SpaceX Different?</h2>
        <p>
          The most important factor that distinguishes SpaceX from traditional tech companies is that it builds a <strong>system-oriented</strong> structure, not a product-oriented one. The company doesn't just launch rockets; it builds a massive ecosystem covering everything from transportation to communication.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">SYSTEM INSIGHT</span>
          <p>
            SpaceX is not a space company; it is a multi-layered infrastructure provider. It is an 'Architect of the Future' that controls data flow with Starlink and logistics with Starship.
          </p>
        </div>
        <h2>The IPO Paradox</h2>
        <p>
          Public companies are forced to deliver short-term performance due to quarterly financial reports and investor pressure. However, SpaceX is built on capital-intensive, high-uncertainty, and long-cycle R&D processes. Therefore, an IPO could limit the company's strategic flexibility.
        </p>
        <h2>Investment or Infrastructure?</h2>
        <p>
          The real question is: Are you investing in a stock or a system? SpaceX is constructing an infrastructure ecosystem encompassing global communication (Starlink), interplanetary transport (Starship), and long-term human habitats.
        </p>
        <div class="system-insight">
          <span class="system-insight-label">STRATEGIC FORESIGHT</span>
          <p>
            The strongest scenario is the spin-off of Starlink into a separate IPO. This move protects the parent company's long-term Mars vision while granting investors access to a massive data infrastructure.
          </p>
        </div>
        <h2>Conclusion: Constructing a System</h2>
        <p>
          In the event of a possible IPO, this won't just be another 'stock.' It is the indirect participation of individual investors in the space economy and future technological systems. SpaceX's IPO is not the growth of a company; it is the <strong>construction of a system.</strong>
        </p>
      `}}},p=(0,a(5347).createProxy)(String.raw`/Users/whyasaf/Desktop/whyasaf@root/whyasaf_websayt/src/components/BlogPostContent.tsx#default`);async function y({params:e}){let t=h[e.slug];if(!t)return{title:"Yazı Bulunamadı",description:"Aradığınız blog yazısı mevcut değil veya taşınmış olabilir."};let a=(0,m.cookies)(),i=a.get("language")?.value||"tr",r="en"===i?t.en:t.tr,n=r.title,s=r.lead||("en"===i?`${r.title} detailed review.`:`${r.title} detaylı incelemesi.`),o=`https://whyasaf.com/blog/${e.slug}`;return{title:n,description:s,alternates:{canonical:o},openGraph:{title:`${n} | whyasaf`,description:s,url:o,siteName:"whyasaf",type:"article",publishedTime:t.dateISO,authors:["https://whyasaf.com"]},twitter:{card:"summary_large_image",title:`${n} | whyasaf`,description:s,creator:"@whyasaf"}}}function f({params:e}){let t=h[e.slug];return t?i.jsx("div",{className:"py-6 animate-in fade-in duration-500",children:i.jsx(p,{post:t,blogPosts:h})}):(0,i.jsxs)("div",{className:"text-center py-20 space-y-4",children:[i.jsx("div",{className:"w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto mb-4",children:i.jsx("span",{className:"text-2xl",children:"\uD83D\uDCED"})}),i.jsx("h1",{className:"text-2xl font-bold text-zinc-900 dark:text-zinc-100",children:"Yazı Bulunamadı"}),i.jsx("p",{className:"text-zinc-550 dark:text-zinc-400 text-sm",children:"Aradığınız blog yazısı mevcut değil veya taşınmış olabilir."}),(0,i.jsxs)(s(),{href:"/blog",className:"inline-flex items-center gap-2 text-sm text-zinc-650 dark:text-zinc-350 hover:text-zinc-900 dark:hover:text-zinc-100 underline",children:[i.jsx(u,{size:16})," Bloga Geri D\xf6n"]})]})}},568:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"DraftMode",{enumerable:!0,get:function(){return n}});let i=a(5869),r=a(4869);class n{get isEnabled(){return this._provider.isEnabled}enable(){let e=i.staticGenerationAsyncStorage.getStore();return e&&(0,r.trackDynamicDataAccessed)(e,"draftMode().enable()"),this._provider.enable()}disable(){let e=i.staticGenerationAsyncStorage.getStore();return e&&(0,r.trackDynamicDataAccessed)(e,"draftMode().disable()"),this._provider.disable()}constructor(e){this._provider=e}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4115:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{cookies:function(){return m},draftMode:function(){return h},headers:function(){return u}});let i=a(1576),r=a(8044),n=a(5911),s=a(2934),o=a(568),l=a(4869),d=a(5869),c=a(4580);function u(){let e="headers",t=d.staticGenerationAsyncStorage.getStore();if(t){if(t.forceStatic)return r.HeadersAdapter.seal(new Headers({}));(0,l.trackDynamicDataAccessed)(t,e)}return(0,c.getExpectedRequestStore)(e).headers}function m(){let e="cookies",t=d.staticGenerationAsyncStorage.getStore();if(t){if(t.forceStatic)return i.RequestCookiesAdapter.seal(new n.RequestCookies(new Headers({})));(0,l.trackDynamicDataAccessed)(t,e)}let a=(0,c.getExpectedRequestStore)(e),r=s.actionAsyncStorage.getStore();return(null==r?void 0:r.isAction)||(null==r?void 0:r.isAppRoute)?a.mutableCookies:a.cookies}function h(){let e=(0,c.getExpectedRequestStore)("draftMode");return new o.DraftMode(e.draftMode)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5949:(e,t,a)=>{"use strict";let{createProxy:i}=a(5347);e.exports=i("/Users/whyasaf/Desktop/whyasaf@root/whyasaf_websayt/node_modules/next/dist/client/link.js")},6801:e=>{"use strict";var t=Object.defineProperty,a=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,r=Object.prototype.hasOwnProperty,n={};function s(e){var t;let a=["path"in e&&e.path&&`Path=${e.path}`,"expires"in e&&(e.expires||0===e.expires)&&`Expires=${("number"==typeof e.expires?new Date(e.expires):e.expires).toUTCString()}`,"maxAge"in e&&"number"==typeof e.maxAge&&`Max-Age=${e.maxAge}`,"domain"in e&&e.domain&&`Domain=${e.domain}`,"secure"in e&&e.secure&&"Secure","httpOnly"in e&&e.httpOnly&&"HttpOnly","sameSite"in e&&e.sameSite&&`SameSite=${e.sameSite}`,"partitioned"in e&&e.partitioned&&"Partitioned","priority"in e&&e.priority&&`Priority=${e.priority}`].filter(Boolean),i=`${e.name}=${encodeURIComponent(null!=(t=e.value)?t:"")}`;return 0===a.length?i:`${i}; ${a.join("; ")}`}function o(e){let t=new Map;for(let a of e.split(/; */)){if(!a)continue;let e=a.indexOf("=");if(-1===e){t.set(a,"true");continue}let[i,r]=[a.slice(0,e),a.slice(e+1)];try{t.set(i,decodeURIComponent(null!=r?r:"true"))}catch{}}return t}function l(e){var t,a;if(!e)return;let[[i,r],...n]=o(e),{domain:s,expires:l,httponly:u,maxage:m,path:h,samesite:p,secure:y,partitioned:f,priority:g}=Object.fromEntries(n.map(([e,t])=>[e.toLowerCase(),t]));return function(e){let t={};for(let a in e)e[a]&&(t[a]=e[a]);return t}({name:i,value:decodeURIComponent(r),domain:s,...l&&{expires:new Date(l)},...u&&{httpOnly:!0},..."string"==typeof m&&{maxAge:Number(m)},path:h,...p&&{sameSite:d.includes(t=(t=p).toLowerCase())?t:void 0},...y&&{secure:!0},...g&&{priority:c.includes(a=(a=g).toLowerCase())?a:void 0},...f&&{partitioned:!0}})}((e,a)=>{for(var i in a)t(e,i,{get:a[i],enumerable:!0})})(n,{RequestCookies:()=>u,ResponseCookies:()=>m,parseCookie:()=>o,parseSetCookie:()=>l,stringifyCookie:()=>s}),e.exports=((e,n,s,o)=>{if(n&&"object"==typeof n||"function"==typeof n)for(let s of i(n))r.call(e,s)||void 0===s||t(e,s,{get:()=>n[s],enumerable:!(o=a(n,s))||o.enumerable});return e})(t({},"__esModule",{value:!0}),n);var d=["strict","lax","none"],c=["low","medium","high"],u=class{constructor(e){this._parsed=new Map,this._headers=e;let t=e.get("cookie");if(t)for(let[e,a]of o(t))this._parsed.set(e,{name:e,value:a})}[Symbol.iterator](){return this._parsed[Symbol.iterator]()}get size(){return this._parsed.size}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let a=Array.from(this._parsed);if(!e.length)return a.map(([e,t])=>t);let i="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return a.filter(([e])=>e===i).map(([e,t])=>t)}has(e){return this._parsed.has(e)}set(...e){let[t,a]=1===e.length?[e[0].name,e[0].value]:e,i=this._parsed;return i.set(t,{name:t,value:a}),this._headers.set("cookie",Array.from(i).map(([e,t])=>s(t)).join("; ")),this}delete(e){let t=this._parsed,a=Array.isArray(e)?e.map(e=>t.delete(e)):t.delete(e);return this._headers.set("cookie",Array.from(t).map(([e,t])=>s(t)).join("; ")),a}clear(){return this.delete(Array.from(this._parsed.keys())),this}[Symbol.for("edge-runtime.inspect.custom")](){return`RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(e=>`${e.name}=${encodeURIComponent(e.value)}`).join("; ")}},m=class{constructor(e){var t,a,i;this._parsed=new Map,this._headers=e;let r=null!=(i=null!=(a=null==(t=e.getSetCookie)?void 0:t.call(e))?a:e.get("set-cookie"))?i:[];for(let e of Array.isArray(r)?r:function(e){if(!e)return[];var t,a,i,r,n,s=[],o=0;function l(){for(;o<e.length&&/\s/.test(e.charAt(o));)o+=1;return o<e.length}for(;o<e.length;){for(t=o,n=!1;l();)if(","===(a=e.charAt(o))){for(i=o,o+=1,l(),r=o;o<e.length&&"="!==(a=e.charAt(o))&&";"!==a&&","!==a;)o+=1;o<e.length&&"="===e.charAt(o)?(n=!0,o=r,s.push(e.substring(t,i)),t=o):o=i+1}else o+=1;(!n||o>=e.length)&&s.push(e.substring(t,e.length))}return s}(r)){let t=l(e);t&&this._parsed.set(t.name,t)}}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let a=Array.from(this._parsed.values());if(!e.length)return a;let i="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return a.filter(e=>e.name===i)}has(e){return this._parsed.has(e)}set(...e){let[t,a,i]=1===e.length?[e[0].name,e[0].value,e[0]]:e,r=this._parsed;return r.set(t,function(e={name:"",value:""}){return"number"==typeof e.expires&&(e.expires=new Date(e.expires)),e.maxAge&&(e.expires=new Date(Date.now()+1e3*e.maxAge)),(null===e.path||void 0===e.path)&&(e.path="/"),e}({name:t,value:a,...i})),function(e,t){for(let[,a]of(t.delete("set-cookie"),e)){let e=s(a);t.append("set-cookie",e)}}(r,this._headers),this}delete(...e){let[t,a,i]="string"==typeof e[0]?[e[0]]:[e[0].name,e[0].path,e[0].domain];return this.set({name:t,path:a,domain:i,value:"",expires:new Date(0)})}[Symbol.for("edge-runtime.inspect.custom")](){return`ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(s).join("; ")}}},8044:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{HeadersAdapter:function(){return n},ReadonlyHeadersError:function(){return r}});let i=a(4203);class r extends Error{constructor(){super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers")}static callable(){throw new r}}class n extends Headers{constructor(e){super(),this.headers=new Proxy(e,{get(t,a,r){if("symbol"==typeof a)return i.ReflectAdapter.get(t,a,r);let n=a.toLowerCase(),s=Object.keys(e).find(e=>e.toLowerCase()===n);if(void 0!==s)return i.ReflectAdapter.get(t,s,r)},set(t,a,r,n){if("symbol"==typeof a)return i.ReflectAdapter.set(t,a,r,n);let s=a.toLowerCase(),o=Object.keys(e).find(e=>e.toLowerCase()===s);return i.ReflectAdapter.set(t,o??a,r,n)},has(t,a){if("symbol"==typeof a)return i.ReflectAdapter.has(t,a);let r=a.toLowerCase(),n=Object.keys(e).find(e=>e.toLowerCase()===r);return void 0!==n&&i.ReflectAdapter.has(t,n)},deleteProperty(t,a){if("symbol"==typeof a)return i.ReflectAdapter.deleteProperty(t,a);let r=a.toLowerCase(),n=Object.keys(e).find(e=>e.toLowerCase()===r);return void 0===n||i.ReflectAdapter.deleteProperty(t,n)}})}static seal(e){return new Proxy(e,{get(e,t,a){switch(t){case"append":case"delete":case"set":return r.callable;default:return i.ReflectAdapter.get(e,t,a)}}})}merge(e){return Array.isArray(e)?e.join(", "):e}static from(e){return e instanceof Headers?e:new n(e)}append(e,t){let a=this.headers[e];"string"==typeof a?this.headers[e]=[a,t]:Array.isArray(a)?a.push(t):this.headers[e]=t}delete(e){delete this.headers[e]}get(e){let t=this.headers[e];return void 0!==t?this.merge(t):null}has(e){return void 0!==this.headers[e]}set(e,t){this.headers[e]=t}forEach(e,t){for(let[a,i]of this.entries())e.call(t,i,a,this)}*entries(){for(let e of Object.keys(this.headers)){let t=e.toLowerCase(),a=this.get(t);yield[t,a]}}*keys(){for(let e of Object.keys(this.headers)){let t=e.toLowerCase();yield t}}*values(){for(let e of Object.keys(this.headers)){let t=this.get(e);yield t}}[Symbol.iterator](){return this.entries()}}},1576:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{MutableRequestCookiesAdapter:function(){return u},ReadonlyRequestCookiesError:function(){return s},RequestCookiesAdapter:function(){return o},appendMutableCookies:function(){return c},getModifiedCookieValues:function(){return d}});let i=a(5911),r=a(4203),n=a(5869);class s extends Error{constructor(){super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options")}static callable(){throw new s}}class o{static seal(e){return new Proxy(e,{get(e,t,a){switch(t){case"clear":case"delete":case"set":return s.callable;default:return r.ReflectAdapter.get(e,t,a)}}})}}let l=Symbol.for("next.mutated.cookies");function d(e){let t=e[l];return t&&Array.isArray(t)&&0!==t.length?t:[]}function c(e,t){let a=d(t);if(0===a.length)return!1;let r=new i.ResponseCookies(e),n=r.getAll();for(let e of a)r.set(e);for(let e of n)r.set(e);return!0}class u{static wrap(e,t){let a=new i.ResponseCookies(new Headers);for(let t of e.getAll())a.set(t);let s=[],o=new Set,d=()=>{let e=n.staticGenerationAsyncStorage.getStore();if(e&&(e.pathWasRevalidated=!0),s=a.getAll().filter(e=>o.has(e.name)),t){let e=[];for(let t of s){let a=new i.ResponseCookies(new Headers);a.set(t),e.push(a.toString())}t(e)}};return new Proxy(a,{get(e,t,a){switch(t){case l:return s;case"delete":return function(...t){o.add("string"==typeof t[0]?t[0]:t[0].name);try{e.delete(...t)}finally{d()}};case"set":return function(...t){o.add("string"==typeof t[0]?t[0]:t[0].name);try{return e.set(...t)}finally{d()}};default:return r.ReflectAdapter.get(e,t,a)}}})}}},5911:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{RequestCookies:function(){return i.RequestCookies},ResponseCookies:function(){return i.ResponseCookies},stringifyCookie:function(){return i.stringifyCookie}});let i=a(6801)}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),i=t.X(0,[379,891,906,514],()=>a(5649));module.exports=i})();