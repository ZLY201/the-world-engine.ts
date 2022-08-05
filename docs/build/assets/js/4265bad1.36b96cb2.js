"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[207],{4653:(t,e,s)=>{s.r(e),s.d(e,{assets:()=>p,contentTitle:()=>u,default:()=>b,frontMatter:()=>c,metadata:()=>m,toc:()=>w});var i=s(7462),h=(s(7294),s(3905)),n=s(9017),o=s(708),r=s(6896),l=s(1269),d=s(6885);class a extends o.A{run(){const t=this.instantiater;return this.sceneBuilder.withChild(t.buildGameObject("camera").withComponent(r.V).withComponent(l.Y,(t=>{t.mouseMoveButton=0})).withComponent(d.y,(t=>{t.renderWidth=50,t.renderHeight=50})))}}const c={},u="Editor Setup",m={unversionedId:"tutorial-2dtopdown/editor-setup",id:"tutorial-2dtopdown/editor-setup",title:"Editor Setup",description:"for debug purposes we will add some components to game",source:"@site/docs/2-tutorial-2dtopdown/2-editor-setup.mdx",sourceDirName:"2-tutorial-2dtopdown",slug:"/tutorial-2dtopdown/editor-setup",permalink:"/the-world-engine.ts/build/docs/tutorial-2dtopdown/editor-setup",draft:!1,editUrl:"https://github.com/The-World-Space/the-world-engine.ts/tree/main/docs/docusaurus/docs/2-tutorial-2dtopdown/2-editor-setup.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Create Project",permalink:"/the-world-engine.ts/build/docs/tutorial-2dtopdown/create-project"},next:{title:"Sprite Atlas Setup",permalink:"/the-world-engine.ts/build/docs/tutorial-2dtopdown/sprite-atlas-setup"}},p={},w=[],g={toc:w};function b(t){let{components:e,...s}=t;return(0,h.kt)("wrapper",(0,i.Z)({},g,s,{components:e,mdxType:"MDXLayout"}),(0,h.kt)("h1",{id:"editor-setup"},"Editor Setup"),(0,h.kt)("p",null,"for debug purposes we will add some components to game"),(0,h.kt)("pre",null,(0,h.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/Bootstrapper.ts"',title:'"src/Bootstrapper.ts"'},'.withChild(instantiater.buildGameObject("camera")\n    .withComponent(Camera)\n    .withComponent(EditorCameraController, c => {\n        c.mouseMoveButton = 0;\n    })\n    .withComponent(EditorGridRenderer, c => {\n        c.renderWidth = 50;\n        c.renderHeight = 50;\n    }))\n')),(0,h.kt)(n.Z,{bootstrapper:a,mdxType:"DocumentGame"}),(0,h.kt)("p",null,"These two components will be very helpful in creating grid-based 2D games."))}b.isMDXComponent=!0},7888:(t,e,s)=>{s.d(e,{s:()=>i});class i{constructor(t=null){this.ref=t}}},1269:(t,e,s)=>{s.d(e,{Y:()=>r});var i=s(6120),h=s(4532),n=s(3674),o=s(6896);class r extends n.w{constructor(){super(...arguments),this.disallowMultipleComponent=!0,this.requiredComponents=[o.V],this.mh=null,this.fh=!1,this.ph=1,this.Vh=new i.F,this.wh=1,this.zh=10,this.xh=5,this.Sh=5,this.bh=new h.P,this.dh=t=>{" "===t.key&&(this.Sh=this.xh,this._h(),this.transform.localPosition.copy(this.bh))},this.Bh=t=>{this.Sh+=.01*t.deltaY,this.Sh<this.wh?this.Sh=this.wh:this.Sh>this.zh&&(this.Sh=this.zh),this._h()},this._r=t=>{this.Vh.set(t.clientX/this.engine.screen.width,t.clientY/this.engine.screen.height),t.button===this.ph&&(this.fh=!0)},this.Eh=t=>{t.button===this.ph&&(this.fh=!1)},this.Mh=t=>{if(!this.fh)return;const e=t.clientX/this.engine.screen.width,s=t.clientY/this.engine.screen.height,i=e-this.Vh.x,h=s-this.Vh.y,n=this.engine.screen.width/this.engine.screen.height;this.transform.localPosition.x-=i*this.mh.viewSize*2*n,this.transform.localPosition.y+=h*this.mh.viewSize*2,this.Vh.set(e,s)},this.jh=t=>{this.fh=!1}}awake(){this.mh=this.gameObject.getComponent(o.V),this.xh=this.mh.viewSize,this.bh.copy(this.transform.localPosition),this.Sh=this.xh,this.mh.viewSize=this.Sh}onEnable(){const t=this.engine.input;t.onKeyDown.addListener(this.dh),t.onWheel.addListener(this.Bh),t.onPointerDown.addListener(this._r),t.onPointerUp.addListener(this.Eh),t.onPointerMove.addListener(this.Mh),t.onPointerLeave.addListener(this.jh)}onDisable(){const t=this.engine.input;t.onKeyDown.removeListener(this.dh),t.onWheel.removeListener(this.Bh),t.onPointerDown.removeListener(this._r),t.onPointerUp.removeListener(this.Eh),t.onPointerMove.removeListener(this.Mh),t.onPointerLeave.removeListener(this.jh)}_h(){this.mh&&(this.mh.viewSize=this.Sh)}get minViewSize(){return this.wh}set minViewSize(t){this.wh=t,this.Sh<this.wh&&(this.Sh=this.wh,this._h())}get maxViewSize(){return this.zh}set maxViewSize(t){this.zh=t,this.Sh>this.zh&&(this.Sh=this.zh,this._h())}get mouseMoveButton(){return this.ph}set mouseMoveButton(t){this.ph=t}}},6885:(t,e,s)=>{s.d(e,{y:()=>l});var i=s(4532),h=s(3674),n=s(7888),o=s(6896),r=s(1466);class l extends h.w{constructor(){super(...arguments),this.disallowMultipleComponent=!0,this.requiredComponents=[o.V],this.sd=null,this.hd=null,this.Ih=1,this.Th=1,this.rd=18,this.nd=10,this.od=.2,this.dd=0,this.ad=new i.P(NaN,NaN,NaN)}awake(){const t=new n.s;this.hd=this.engine.scene.addChildFromBuilder(this.engine.instantiater.buildGameObject("grid-renderer",void 0,void 0,new i.P(this.od,this.od,this.od)).active(!1).withComponent(r.w,(t=>{const e=document.createElement("div");e.style.backgroundImage="                        repeating-linear-gradient(#999 0 1px, transparent 1px 100%),                        repeating-linear-gradient(90deg, #999 0 1px, transparent 1px 100%)",e.style.backgroundSize=this.Ih/this.od/.1+"px "+this.Th/this.od/.1+"px",t.elementWidth=this.rd/this.od,t.elementHeight=this.nd/this.od,t.pointerEvents=!1,t.element=e,t.viewScale=.1})).getComponent(r.w,t)),this.sd=t.ref}onEnable(){this.hd.exists&&(this.hd.activeSelf=!0)}onDisable(){this.hd.exists&&(this.hd.activeSelf=!1)}update(){const t=this.transform.position,e=1/this.od/.1,s=this.rd*e/2,i=this.nd*e/2,h=this.Ih*e,n=this.Th*e,o=s%h,r=i%n;if(!t.equals(this.ad)){const s=this.hd.transform.position;s.copy(t),s.z+=this.dd,this.sd.element.style.backgroundPosition=-t.x*e+o+h/2-.5+"px "+(t.y*e+r+n/2-.5)+"px"}}onDestroy(){var t;null===(t=this.hd)||void 0===t||t.destroy()}ld(){const t=this.sd;t&&(t.element.style.backgroundSize=this.Ih/this.od/.1+"px "+this.Th/this.od/.1+"px")}get gridCellWidth(){return this.Ih}set gridCellWidth(t){this.Ih=t,this.ld()}get gridCellHeight(){return this.Th}set gridCellHeight(t){this.Th=t,this.ld()}get renderWidth(){return this.rd}set renderWidth(t){this.rd=t,this.sd&&(this.sd.elementWidth=this.rd/this.od)}get renderHeight(){return this.nd}set renderHeight(t){this.nd=t,this.sd&&(this.sd.elementHeight=this.nd/this.od)}get lineWidth(){return.1*this.od}set lineWidth(t){this.od=t/.1;const e=this.sd;e&&(this.ld(),e.elementWidth=this.rd/this.od,e.elementHeight=this.nd/this.od,e.gameObject.transform.localScale.setScalar(this.od))}get zOffset(){return this.dd}set zOffset(t){this.dd=t}}},1466:(t,e,s)=>{s.d(e,{w:()=>n});var i=s(4627),h=s(6924);class n extends h.Y{constructor(){super(...arguments),this.tu=1,this.su=1,this.iu=!1,this.Ca=null}renderInitialize(){var t;null===(t=this.Ca)||void 0===t||t.call(this),this.htmlElement||(this.element=null)}updateCenterOffset(t){if(!this.css3DObject)return;let e,s;if(this.iu)if(this.css3DObject.element.parentElement){const t=this.css3DObject.element.style.display;this.css3DObject.element.style.display="",e=this.css3DObject.element.offsetWidth*this.viewScale,s=this.css3DObject.element.offsetHeight*this.viewScale,this.css3DObject.element.style.display=t}else{const t=this.css3DObject.element.style.display;this.css3DObject.element.style.display="";const i=this.css3DObject.element.style.transform;this.css3DObject.element.style.transform="translateX(1000000px)",document.body.appendChild(this.css3DObject.element),e=this.css3DObject.element.offsetWidth*this.viewScale,s=this.css3DObject.element.offsetHeight*this.viewScale,this.css3DObject.element.style.display=t,this.css3DObject.element.style.transform=i,document.body.removeChild(this.css3DObject.element)}else e=this.tu,s=this.su;this.css3DObject.position.set(e*this.centerOffset.x,s*this.centerOffset.y,0),t&&(i.w.updateRawObject3DWorldMatrixRecursively(this.css3DObject),this.transform.enqueueRenderAttachedObject3D(this.css3DObject))}updateViewScale(t){if(!this.css3DObject)return;const e=this.viewScale;this.iu?(this.css3DObject.scale.set(e,e,e),this.updateCenterOffset(!1)):(this.css3DObject.element.style.width=this.tu/this.viewScale+"px",this.css3DObject.element.style.height=this.su/this.viewScale+"px",this.css3DObject.scale.set(e,e,e)),t&&(i.w.updateRawObject3DWorldMatrixRecursively(this.css3DObject),this.transform.enqueueRenderAttachedObject3D(this.css3DObject))}get element(){return this.htmlElement}set element(t){const e=this.htmlElement=null!=t?t:document.createElement("div");this.readyToDraw?this.hu(e):this.Ca=()=>this.hu(e)}hu(t){this.iu?(t.style.width="auto",t.style.height="auto"):(t.style.width=this.tu/this.viewScale+"px",t.style.height=this.su/this.viewScale+"px");const e=this.initializeBaseComponents(!0);i.w.updateRawObject3DWorldMatrixRecursively(e),this.transform.enqueueRenderAttachedObject3D(e)}get elementWidth(){if(this.iu){if(this.htmlElement){const t=this.htmlElement.style.display;this.htmlElement.style.display="";const e=this.htmlElement.offsetWidth*this.viewScale;return this.htmlElement.style.display=t,e}return 0}return this.tu}set elementWidth(t){this.iu||(this.tu=t,this.htmlElement&&(this.htmlElement.style.width=t/this.viewScale+"px"),this.updateCenterOffset(!0))}get elementHeight(){if(this.iu){if(this.htmlElement){const t=this.htmlElement.style.display;this.htmlElement.style.display="";const e=this.htmlElement.offsetHeight*this.viewScale;return this.htmlElement.style.display=t,e}return 0}return this.su}set elementHeight(t){this.iu||(this.su=t,this.htmlElement&&(this.htmlElement.style.height=t/this.viewScale+"px"),this.updateCenterOffset(!0))}get autoSize(){return this.iu}set autoSize(t){this.iu=t,this.htmlElement&&(t?(this.htmlElement.style.width="auto",this.htmlElement.style.height="auto"):(this.htmlElement.style.width=this.tu/this.viewScale+"px",this.htmlElement.style.height=this.su/this.viewScale+"px"))}}}}]);