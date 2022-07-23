"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[866],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(r),d=a,k=u["".concat(i,".").concat(d)]||u[d]||m[d]||o;return r?n.createElement(k,s(s({ref:t},c),{},{components:r})):n.createElement(k,s({ref:t},c))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=u;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:a,s[1]=p;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},6023:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:2},s="Create Game",p={unversionedId:"getting-started/create-game",id:"getting-started/create-game",title:"Create Game",description:"Let's find out how to create a game instance",source:"@site/docs/1-getting-started/2-create-game.md",sourceDirName:"1-getting-started",slug:"/getting-started/create-game",permalink:"/the-world-engine/build/docs/getting-started/create-game",draft:!1,editUrl:"https://github.com/The-World-Space/the-world-engine.ts/tree/main/docs/docusaurus/docs/1-getting-started/2-create-game.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Installation",permalink:"/the-world-engine/build/docs/getting-started/installation"},next:{title:"Add Sprite",permalink:"/the-world-engine/build/docs/getting-started/add-sprite"}},i={},l=[{value:"Create Bootstrapper",id:"create-bootstrapper",level:2},{value:"Make Game",id:"make-game",level:2},{value:"Add Camera to the Game",id:"add-camera-to-the-game",level:2}],c={toc:l};function m(e){let{components:t,...o}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"create-game"},"Create Game"),(0,a.kt)("p",null,"Let's find out how to create a game instance"),(0,a.kt)("h2",{id:"create-bootstrapper"},"Create Bootstrapper"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Bootstrapper")," is a class that is used to construct the game."),(0,a.kt)("p",null,"We have to inherit from ",(0,a.kt)("inlineCode",{parentName:"p"},"Bootstrapper")," and create the our own ",(0,a.kt)("inlineCode",{parentName:"p"},"Bootstrapper")," class."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="./src/asset/Bootstrapper.ts"',title:'"./src/asset/Bootstrapper.ts"'},'import { \n    Bootstrapper as BaseBootstrapper,\n    SceneBuilder\n} from "the-world-engine";\n\nexport class Bootstrapper extends BaseBootstrapper {\n    public run(): SceneBuilder {\n        return this.sceneBuilder;\n    }\n}\n')),(0,a.kt)("h2",{id:"make-game"},"Make Game"),(0,a.kt)("p",null,"you can create ",(0,a.kt)("inlineCode",{parentName:"p"},"Game")," instance with ",(0,a.kt)("inlineCode",{parentName:"p"},"Bootstrapper"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="./src/index.ts"',title:'"./src/index.ts"'},'import { Game } from "the-world-engine";\nimport { Bootstrapper } from "./asset/Bootstrapper";\n\nconst game = new Game(document.body); // game view is attached to the document.body\ngame.run(Bootstrapper); // run the game\ngame.inputHandler.startHandleEvents(); // start handle user input\n')),(0,a.kt)("h2",{id:"add-camera-to-the-game"},"Add Camera to the Game"),(0,a.kt)("p",null,"the game works only when at least one camera exists. Let's make a camera"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="./src/asset/Bootstrapper.ts"',title:'"./src/asset/Bootstrapper.ts"'},'import { \n    Bootstrapper as BaseBootstrapper,\n    Camera,\n    SceneBuilder\n} from "the-world-engine";\nimport { Vector3 } from "three/src/Three";\n\nexport class Bootstrapper extends BaseBootstrapper {\n    public run(): SceneBuilder {\n        const instantiater = this.instantiater;\n\n        return this.sceneBuilder\n            .withChild(instantiater.buildGameObject("camera", new Vector3(0, 0, 10))\n                .withComponent(Camera))\n        ;\n    }\n}\n')),(0,a.kt)("p",null,"The game scene has the same structure as unity game engine object hierarchy system."),(0,a.kt)("p",null,"Here's the current state of the scene.\n",(0,a.kt)("img",{alt:"tree-camera",src:r(892).Z,width:"659",height:"238"})),(0,a.kt)("admonition",{title:"tip",type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"You can use ",(0,a.kt)("a",{parentName:"p",href:"https://addons.mozilla.org/en-US/firefox/addon/three-js-developer-tools/"},"Three.js Developer Tools")," to inspect the scene."),(0,a.kt)("p",{parentName:"admonition"},"But don't trust all the information from ",(0,a.kt)("inlineCode",{parentName:"p"},"Three.js Developer Tools"),". There are some bugs.")))}m.isMDXComponent=!0},892:(e,t,r)=>{r.d(t,{Z:()=>n});const n="data:image/png;base64,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"}}]);