"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[739],{5707:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>w,contentTitle:()=>h,default:()=>v,frontMatter:()=>p,metadata:()=>g,toc:()=>y});var i=n(7462),a=(n(7294),n(3905)),o=n(9017),r=n(708),s=n(6896),l=n(8788),d=n(3674),u=n(8003);class m extends d.w{constructor(){super(...arguments),this._range=6}awake(){this.startCoroutine(this.move())}*move(){for(;;){const e=Math.random()*this._range-this._range/2,t=Math.random()*this._range-this._range/2;this.gameObject.transform.position.set(e,t,0),yield new u.yp(1)}}}class c extends r.A{run(){const e=this.instantiater;return this.sceneBuilder.withChild(e.buildGameObject("camera").withComponent(s.V)).withChild(e.buildGameObject("object1").withComponent(l._).withComponent(m))}}const p={},h="Coroutines",g={unversionedId:"getting-started/coroutines",id:"getting-started/coroutines",title:"Coroutines",description:"A coroutine allows you to spread tasks across several frames.",source:"@site/docs/1-getting-started/9-coroutines.mdx",sourceDirName:"1-getting-started",slug:"/getting-started/coroutines",permalink:"/the-world-engine.ts/build/docs/getting-started/coroutines",draft:!1,editUrl:"https://github.com/The-World-Space/the-world-engine.ts/tree/main/docs/docusaurus/docs/1-getting-started/9-coroutines.mdx",tags:[],version:"current",sidebarPosition:9,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Add/Remove Object Dynamically",permalink:"/the-world-engine.ts/build/docs/getting-started/add-object-dynamically"},next:{title:"Debug Components",permalink:"/the-world-engine.ts/build/docs/getting-started/debug-components"}},w={},y=[{value:"Example: Random Movement With Delay",id:"example-random-movement-with-delay",level:2},{value:"Example: Waiting Promise",id:"example-waiting-promise",level:2},{value:"Yield Instructions",id:"yield-instructions",level:2}],k={toc:y};function v(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},k,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"coroutines"},"Coroutines"),(0,a.kt)("p",null,"A coroutine allows you to spread tasks across several frames."),(0,a.kt)("h2",{id:"example-random-movement-with-delay"},"Example: Random Movement With Delay"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'import { Component, CoroutineIterator, WaitForSeconds } from "the-world-engine";\n\nexport class RandomMovement extends Component {\n    private readonly _range = 6;\n    \n    public awake(): void {\n        this.startCoroutine(this.move());\n    }\n\n    private *move(): CoroutineIterator {\n        for (; ;) {\n            const x = Math.random() * this._range - this._range / 2;\n            const y = Math.random() * this._range - this._range / 2;\n            this.gameObject.transform.position.set(x, y, 0); //move to random position\n\n            yield new WaitForSeconds(1); //wait for 1 second\n        }\n    }\n}\n')),(0,a.kt)(o.Z,{bootstrapper:c,ignoreEvents:!0,mdxType:"DocumentGame"}),(0,a.kt)("h2",{id:"example-waiting-promise"},"Example: Waiting Promise"),(0,a.kt)("p",null,"Async/await is not available in the component, but you can wait for Promise using Coroutine"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export class ImageSpawner extends Component {\n    public spawn(query: string): void {\n        this.startCoroutine(this.spawnInternal(query));\n    }\n\n    private *spawnInternal(query: string): CoroutineIterator {\n        let imageSearchResults: SearchResult[]|null = null;\n        ImageSearch.fatch(query).then(images => imageSearchResults = images);\n        yield new WaitWhile(() => imageSearchResults === null);\n\n        for (const image of imageSearchResults!) {\n            //spawn image\n        }\n    }\n}\n")),(0,a.kt)("h2",{id:"yield-instructions"},"Yield Instructions"),(0,a.kt)("p",null,"The control flow can be handed over to the engine using the yield instruction."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"yield null"),": Wait for next frame"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"yield new WaitForSeconds(1)"),": Wait for 1 second"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"yield new WaitForEndOfFrame"),": Wait for end of frame"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"yield new WaitUntil(() => false)"),": Wait until condition is false"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"yield new WaitWhile(() => true)"),": Wait while condition is true")))}v.isMDXComponent=!0}}]);