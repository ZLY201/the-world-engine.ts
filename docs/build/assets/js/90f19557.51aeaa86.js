"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[525],{4266:(t,e,i)=>{i.r(e),i.d(e,{assets:()=>j,contentTitle:()=>A,default:()=>y,frontMatter:()=>w,metadata:()=>b,toc:()=>_});var s=i(7462),a=(i(7294),i(3905)),n=i(9017),h=i(708),r=i(6896),o=i(4483),l=i(4286),c=i(4532),p=i(3674),d=i(6120);class m extends p.w{constructor(){super(...arguments),this._speed=4,this._direction=new d.F(0,-1),this._isMoving=!1,this._spriteAtlasAnimator=null,this._tempVector3=new c.P}awake(){this._spriteAtlasAnimator=this.gameObject.getComponent(l.h)}update(){const t=this.engine.input.map;if(t.get("w")?(this._direction.set(0,1),this._isMoving=!0):t.get("s")?(this._direction.set(0,-1),this._isMoving=!0):t.get("a")?(this._direction.set(-1,0),this._isMoving=!0):t.get("d")?(this._direction.set(1,0),this._isMoving=!0):this._isMoving=!1,1===this._direction.x?this._spriteAtlasAnimator.playAnimation(this._isMoving?"walk_right":"idle_right"):-1===this._direction.x?this._spriteAtlasAnimator.playAnimation(this._isMoving?"walk_left":"idle_left"):1===this._direction.y?this._spriteAtlasAnimator.playAnimation(this._isMoving?"walk_up":"idle_up"):-1===this._direction.y&&this._spriteAtlasAnimator.playAnimation(this._isMoving?"walk_down":"idle_down"),this._isMoving){const t=this._tempVector3.set(this._direction.x,this._direction.y,0).multiplyScalar(this.engine.time.deltaTime*this._speed);this.gameObject.transform.position.add(t)}}}class u extends h.A{run(){const t=this.instantiater;return this.sceneBuilder.withChild(t.buildGameObject("camera",new c.P(0,0,10)).withComponent(r.V)).withChild(t.buildGameObject("sprite1",new c.P(0,0,0)).withComponent(o.$,(t=>{t.asyncSetImageFromPath("https://i.stack.imgur.com/eUJdp.png",9,4,(()=>{t.exists&&(t.imageWidth*=3,t.imageHeight*=3)})),t.imageIndex=0})).withComponent(l.h,(t=>{t.addAnimation("idle_up",[0]),t.addAnimation("walk_up",[1,2,3,4,5,6,7,8]),t.addAnimation("idle_left",[9]),t.addAnimation("walk_left",[10,11,12,13,14,15,16,17]),t.addAnimation("idle_down",[18]),t.addAnimation("walk_down",[19,20,21,22,23,24,25,26]),t.addAnimation("idle_right",[27]),t.addAnimation("walk_right",[28,29,30,31,32,33,34,35]),t.frameDuration=.2})))}}class g extends h.A{run(){const t=this.instantiater;return this.sceneBuilder.withChild(t.buildGameObject("camera",new c.P(0,0,10)).withComponent(r.V)).withChild(t.buildGameObject("sprite1",new c.P(0,0,0)).withComponent(o.$,(t=>{t.asyncSetImageFromPath("https://i.stack.imgur.com/eUJdp.png",9,4,(()=>{t.exists&&(t.imageWidth*=3,t.imageHeight*=3)})),t.imageIndex=0})).withComponent(l.h,(t=>{t.addAnimation("idle_up",[0]),t.addAnimation("walk_up",[1,2,3,4,5,6,7,8]),t.addAnimation("idle_left",[9]),t.addAnimation("walk_left",[10,11,12,13,14,15,16,17]),t.addAnimation("idle_down",[18]),t.addAnimation("walk_down",[19,20,21,22,23,24,25,26]),t.addAnimation("idle_right",[27]),t.addAnimation("walk_right",[28,29,30,31,32,33,34,35]),t.frameDuration=.1})).withComponent(m))}}const w={},A="Create Component: Sprite Animations",b={unversionedId:"getting-started/sprite-animations",id:"getting-started/sprite-animations",title:"Create Component: Sprite Animations",description:"Learn about Sprite Animation using CssSpriteAtlasRenderer Components and SpriteAtlasAnimator Components",source:"@site/docs/1-getting-started/5-sprite-animations.mdx",sourceDirName:"1-getting-started",slug:"/getting-started/sprite-animations",permalink:"/the-world-engine.ts/build/docs/getting-started/sprite-animations",draft:!1,editUrl:"https://github.com/The-World-Space/the-world-engine.ts/tree/main/docs/docusaurus/docs/1-getting-started/5-sprite-animations.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Create Component",permalink:"/the-world-engine.ts/build/docs/getting-started/create-component"},next:{title:"Get Component",permalink:"/the-world-engine.ts/build/docs/getting-started/get-component"}},j={},_=[{value:"Make Scene",id:"make-scene",level:2},{value:"Create PlayerController",id:"create-playercontroller",level:2}],f={toc:_};function y(t){let{components:e,...i}=t;return(0,a.kt)("wrapper",(0,s.Z)({},f,i,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"create-component-sprite-animations"},"Create Component: Sprite Animations"),(0,a.kt)("p",null,"Learn about Sprite Animation using ",(0,a.kt)("inlineCode",{parentName:"p"},"CssSpriteAtlasRenderer")," Components and ",(0,a.kt)("inlineCode",{parentName:"p"},"SpriteAtlasAnimator")," Components"),(0,a.kt)("h2",{id:"make-scene"},"Make Scene"),(0,a.kt)("p",null,"Create a scene using the components ",(0,a.kt)("inlineCode",{parentName:"p"},"CssSpriteAtlasRenderer")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"SpriteAtlasAnimator"),"."),(0,a.kt)("p",null,"we will use ",(0,a.kt)("a",{parentName:"p",href:"https://i.stack.imgur.com/eUJdp.png"},"this asset"),"."),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://i.stack.imgur.com/eUJdp.png",alt:"sprite atlas"})),(0,a.kt)("p",null,"The Sprite Atlas component allows you to clip a sprite sheet into a number of sprites.\nSprite Atlas is good for animations."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="./asset/Bootstrapper.ts"',title:'"./asset/Bootstrapper.ts"'},'import { \n    Bootstrapper as BaseBootstrapper,\n    Camera,\n    CssSpriteAtlasRenderer,\n    SceneBuilder,\n    SpriteAtlasAnimator\n} from "the-world-engine";\nimport { Vector3 } from "three/src/Three";\n\nexport class Bootstrapper extends BaseBootstrapper {\n    public run(): SceneBuilder {\n        const instantiater = this.instantiater;\n\n        return this.sceneBuilder\n            .withChild(instantiater.buildGameObject("camera", new Vector3(0, 0, 10))\n                .withComponent(Camera))\n            \n            .withChild(instantiater.buildGameObject("sprite1", new Vector3(0, 0, 0))\n                .withComponent(CssSpriteAtlasRenderer, c => {\n                    c.asyncSetImageFromPath(\n                        "https://i.stack.imgur.com/eUJdp.png",\n                        9, 4, // split the image into 9 column and 4 rows\n                        () => {\n                            if (!c.exists) return;\n                            c.imageWidth *= 3;\n                            c.imageHeight *= 3;\n                            //scale the image to 3x its original size\n                        }\n                    );\n\n                    c.imageIndex = 0;\n                })\n                .withComponent(SpriteAtlasAnimator, c => {\n                    c.addAnimation("idle_up", [0]);\n                    c.addAnimation("walk_up", [1, 2, 3, 4, 5, 6, 7, 8]);\n                    c.addAnimation("idle_left", [9]);\n                    c.addAnimation("walk_left", [10, 11, 12, 13, 14, 15, 16, 17]);\n                    c.addAnimation("idle_down", [18]);\n                    c.addAnimation("walk_down", [19, 20, 21, 22, 23, 24, 25, 26]);\n                    c.addAnimation("idle_right", [27]);\n                    c.addAnimation("walk_right", [28, 29, 30, 31, 32, 33, 34, 35]);\n\n                    c.frameDuration = 0.2;\n                }))\n        ;\n    }\n}\n')),(0,a.kt)(n.Z,{bootstrapper:u,ignoreEvents:!0,mdxType:"DocumentGame"}),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"atlasIndex")," increases from left to right from top to bottom."),(0,a.kt)("h2",{id:"create-playercontroller"},"Create PlayerController"),(0,a.kt)("p",null,"create a component ",(0,a.kt)("inlineCode",{parentName:"p"},"PlayerController")," that will control the player movement and animation."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="./asset/script/PlayerController.ts"',title:'"./asset/script/PlayerController.ts"'},'import { Component, SpriteAtlasAnimator } from "the-world-engine";\nimport { Vector2, Vector3 } from "three/src/Three";\n\nexport class PlayerController extends Component {\n    private readonly _speed = 4;\n    private readonly _direction = new Vector2(0, -1);\n    private _isMoving = false;\n    private _spriteAtlasAnimator: SpriteAtlasAnimator|null = null;\n\n    private readonly _tempVector3 = new Vector3();\n\n    public awake(): void {\n        this._spriteAtlasAnimator = this.gameObject.getComponent(SpriteAtlasAnimator);\n    }\n    \n    public update(): void {\n        const inputMap = this.engine.input.map; //input map is a dictionary of keyboard inputs\n\n        if (inputMap.get("w")) {\n            this._direction.set(0, 1);\n            this._isMoving = true;\n        } else if (inputMap.get("s")) {\n            this._direction.set(0, -1);\n            this._isMoving = true;\n        } else if (inputMap.get("a")) {\n            this._direction.set(-1, 0);\n            this._isMoving = true;\n        } else if (inputMap.get("d")) {\n            this._direction.set(1, 0);\n            this._isMoving = true;\n        } else {\n            this._isMoving = false;\n        }\n\n        if (this._direction.x === 1) {\n            this._spriteAtlasAnimator!.playAnimation(this._isMoving ? "walk_right" : "idle_right");\n        } else if (this._direction.x === -1) {\n            this._spriteAtlasAnimator!.playAnimation(this._isMoving ? "walk_left" : "idle_left");\n        } else if (this._direction.y === 1) {\n            this._spriteAtlasAnimator!.playAnimation(this._isMoving ? "walk_up" : "idle_up");\n        } else if (this._direction.y === -1) {\n            this._spriteAtlasAnimator!.playAnimation(this._isMoving ? "walk_down" : "idle_down");\n        }\n\n        if (this._isMoving) {\n            const addVector = this._tempVector3\n                .set(this._direction.x, this._direction.y, 0)\n                .multiplyScalar(this.engine.time.deltaTime * this._speed);\n\n            this.gameObject.transform.position.add(addVector);\n        }\n    }\n}\n')),(0,a.kt)("p",null,"add the component to the player GameObject."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="./asset/Bootstrapper.ts"',title:'"./asset/Bootstrapper.ts"'},'//...\n.withChild(instantiater.buildGameObject("sprite1", new Vector3(0, 0, 0))\n    //...\n    .withComponent(PlayerController))\n')),(0,a.kt)(n.Z,{bootstrapper:g,allowScroll:!0,mdxType:"DocumentGame"}),"Now move the sprite with w, a, s, d")}y.isMDXComponent=!0},4286:(t,e,i)=>{i.d(e,{h:()=>n});var s=i(3674),a=i(4483);class n extends s.w{constructor(){super(...arguments),this.disallowMultipleComponent=!0,this.requiredComponents=[a.$],this.nl=null,this.ia={},this.sa=null,this.ea=null,this.na=0,this.ra=!1,this.ha=2,this.oa=0,this.aa=null}awake(){this.nl=this.gameObject.getComponent(a.$),null!==this.aa&&(this.playAnimation(this.aa),this.aa=null)}update(){null!==this.nl&&this.ra&&(this.oa+=this.engine.time.deltaTime,this.oa>=this.ha&&(this.oa=0,this.na++,this.na>=this.ea.length&&(this.na=0),this.nl.imageIndex=this.ea[this.na]))}playAnimation(t){null!==this.nl?this.sa!==t&&(this.sa=t,this.ea=this.ia[t],this.na=0,this.nl.imageIndex=this.ia[t][0],this.ra=!0):this.aa=t}stopAnimation(){this.ra=!1,this.aa=null}addAnimation(t,e){0!==e.length?this.ia[t]=e:console.warn(`Animation "${t}" has no frames.`)}get frameDuration(){return this.ha}set frameDuration(t){this.ha=t}}},4483:(t,e,i)=>{i.d(e,{$:()=>l});var s,a,n=i(3367),h=i(4627),r=i(6924),o=i(8788);(a=s||(s={}))[a.ObjectFit=0]="ObjectFit",a[a.ClipPath=1]="ClipPath";class l extends r.Y{constructor(){super(...arguments),this.Aa=s.ObjectFit,this.Ia=0,this.ja=0,this.Ga=!1,this.Ha=!1,this.Wa=1,this.nn=o.r.Pixelated,this.pa=1,this.Sa=1,this.Xa=0,this.Ya=0,this.Ea=0,this.Ca=null}renderInitialize(){this.Ca?this.Ca():this.asyncSetImageFromPath(n.Q.defaultSpriteSrc,1,1)}updateCenterOffset(t){if(this.css3DObject)if(this.Aa===s.ObjectFit)this.css3DObject.position.set(this.Ia*this.centerOffset.x,this.ja*this.centerOffset.y,0),t&&(h.w.updateRawObject3DWorldMatrixRecursively(this.css3DObject),this.transform.enqueueRenderAttachedObject3D(this.css3DObject));else{const e=this.Xa%this.pa,i=Math.floor(this.Xa/this.pa),s=this.Ga?-(this.Ia*this.pa/2-this.Ia/2)+e*this.Ia:this.Ia*this.pa/2-this.Ia/2-e*this.Ia,a=this.Ha?this.ja*this.Sa/2-this.ja/2-i*this.ja:-(this.ja*this.Sa/2-this.ja/2)+i*this.ja;this.css3DObject.position.set(this.Ia*this.centerOffset.x+s,this.ja*this.centerOffset.y+a,0),t&&(h.w.updateRawObject3DWorldMatrixRecursively(this.css3DObject),this.transform.enqueueRenderAttachedObject3D(this.css3DObject))}}updateViewScale(t){if(this.css3DObject)if(this.Aa===s.ObjectFit){const e=this.viewScale,i=this.Ga?-1:1,s=this.Ha?-1:1;this.css3DObject.scale.set(this.Ia/this.Ya*e*i,this.ja/this.Ea*e*s,1),t&&(h.w.updateRawObject3DWorldMatrixRecursively(this.css3DObject),this.transform.enqueueRenderAttachedObject3D(this.css3DObject))}else{const e=this.viewScale,i=this.htmlElement;i.style.width=this.Ia*this.pa/e+"px",i.style.height=this.ja*this.Sa/e+"px";const s=this.Ga?-1:1,a=this.Ha?-1:1;this.css3DObject.scale.set(e*s,e*a,e),t&&(h.w.updateRawObject3DWorldMatrixRecursively(this.css3DObject),this.transform.enqueueRenderAttachedObject3D(this.css3DObject))}}$a(){if(this.htmlElement)if(this.Aa===s.ObjectFit){const t=-this.Xa%this.pa*this.Ya,e=-Math.floor(this.Xa/this.pa)*this.Ea;this.htmlElement.style.objectPosition=t+"px "+e+"px"}else{const t=Math.floor(this.Xa/this.pa),e=this.pa-this.Xa%this.pa-1;this.htmlElement.style.clipPath="inset("+100/this.Sa*t+"% "+100/this.pa*e+"% "+(100-(100/this.Sa*t+100/this.Sa))+"% "+(100-(100/this.pa*e+100/this.pa))+"%)"}}get image(){return this.htmlElement}asyncSetImageFromPath(t,e,i,s){var a;if(!this.readyToDraw)return void(this.Ca=()=>this.asyncSetImageFromPath(t,e,i,s));const n=null!==(a=this.htmlElement)&&void 0!==a?a:new Image;n.src=t;const h=t=>{this.exists&&(n.removeEventListener("load",h),this.setImage(n,e,i),null==s||s())};n.addEventListener("load",h)}setImage(t,e,i){if(!t.complete)throw new Error(`Image {${t.src}} is not loaded.`);this.pa=e,this.Sa=i,this.htmlElement=t,t.alt=this.gameObject.name+"_sprite_atlas",t.style.imageRendering=this.nn,t.style.opacity=this.Wa.toString(),this.Aa===s.ObjectFit?(1!==this.viewScale&&console.warn("CssSpriteAtlas.viewScale is not supported in CssSpriteAtlasRenderMode.ObjectFit, for supressing this warning set viewScale to 1."),this.Ya=t.naturalWidth/this.pa,this.Ea=t.naturalHeight/this.Sa,0===this.Ia&&(this.Ia=.1*this.Ya),0===this.ja&&(this.ja=.1*this.Ea),t.style.width=this.Ya+"px",t.style.height=this.Ea+"px",t.style.objectFit="none"):(0===this.Ia&&(this.Ia=t.naturalWidth/this.pa*.1),0===this.ja&&(this.ja=t.naturalHeight/this.Sa*.1),t.style.width=this.Ia*this.pa/this.viewScale+"px",t.style.height=this.ja*this.Sa/this.viewScale+"px");const a=this.initializeBaseComponents(!1);this.$a(),h.w.updateRawObject3DWorldMatrixRecursively(a),this.transform.enqueueRenderAttachedObject3D(a)}get renderMode(){return this.Aa}set renderMode(t){if(this.Aa!==t&&(this.Aa=t,this.htmlElement)){const t=this.htmlElement;this.Aa===s.ObjectFit?(1!==this.viewScale&&console.warn("CssSpriteAtlas.viewScale is not supported in CssSpriteAtlasRenderMode.ObjectFit"),t.style.clipPath="",this.Ya=t.naturalWidth/this.pa,this.Ea=t.naturalHeight/this.Sa,0===this.Ia&&(this.Ia=this.Ya),0===this.ja&&(this.ja=this.Ea),t.style.width=this.Ya+"px",t.style.height=this.Ea+"px",t.style.objectFit="none"):(t.style.objectFit="",t.style.objectPosition="",0===this.Ia&&(this.Ia=t.naturalWidth/this.pa),0===this.ja&&(this.ja=t.naturalHeight/this.Sa),t.style.width=this.Ia*this.pa/this.viewScale+"px",t.style.height=this.ja*this.Sa/this.viewScale+"px"),this.updateViewScale(!1),this.updateCenterOffset(!1),this.$a(),h.w.updateRawObject3DWorldMatrixRecursively(this.css3DObject),this.transform.enqueueRenderAttachedObject3D(this.css3DObject)}}get imageIndex(){return this.Xa}set imageIndex(t){this.Xa=t,this.$a(),this.Aa===s.ClipPath&&this.updateCenterOffset(!0)}get columnCount(){return this.pa}get rowCount(){return this.Sa}get imageWidth(){return this.Ia}set imageWidth(t){this.Ia=t,this.Aa===s.ObjectFit?this.css3DObject&&(this.css3DObject.scale.x=this.Ia/this.Ya*this.viewScale,this.css3DObject.scale.x*=this.Ga?-1:1):this.htmlElement&&(this.htmlElement.style.width=t*this.pa/this.viewScale+"px"),this.updateCenterOffset(!0)}get imageHeight(){return this.ja}set imageHeight(t){this.ja=t,this.Aa===s.ObjectFit?this.css3DObject&&(this.css3DObject.scale.y=this.ja/this.Ea*this.viewScale,this.css3DObject.scale.y*=this.Ha?-1:1):this.htmlElement&&(this.htmlElement.style.height=t*this.Sa/this.viewScale+"px"),this.updateCenterOffset(!0)}get imageFlipX(){return this.Ga}set imageFlipX(t){this.Ga=t,this.css3DObject&&(this.Ga?0<this.css3DObject.scale.x&&(this.css3DObject.scale.x*=-1):this.css3DObject.scale.x<0&&(this.css3DObject.scale.x*=-1),this.Aa===s.ObjectFit?(h.w.updateRawObject3DWorldMatrixRecursively(this.css3DObject),this.transform.enqueueRenderAttachedObject3D(this.css3DObject)):(this.$a(),this.updateCenterOffset(!0)))}get imageFlipY(){return this.Ha}set imageFlipY(t){this.Ha=t,this.css3DObject&&(this.Ha?0<this.css3DObject.scale.y&&(this.css3DObject.scale.y*=-1):this.css3DObject.scale.y<0&&(this.css3DObject.scale.y*=-1),this.Aa===s.ObjectFit?(h.w.updateRawObject3DWorldMatrixRecursively(this.css3DObject),this.transform.enqueueRenderAttachedObject3D(this.css3DObject)):(this.$a(),this.updateCenterOffset(!0)))}get opacity(){return this.Wa}set opacity(t){this.Wa=t,this.htmlElement&&(this.htmlElement.style.opacity=this.Wa.toString())}get imageRenderingMode(){return this.nn}set imageRenderingMode(t){this.nn=t,this.htmlElement&&(this.htmlElement.style.imageRendering=this.nn)}}}}]);