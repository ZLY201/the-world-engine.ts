import { GameObjectBuilder } from "@src/engine/hierarchy_object/GameObjectBuilder";
import { Prefab } from "@src/engine/hierarchy_object/Prefab";
import { Color } from "@src/engine/render/Color";
import { CssEdgeRenderer } from "@src/engine/script/render/CssEdgeRenderer";
import { CssHtmlElementRenderer } from "@src/engine/script/render/CssHtmlElementRenderer";
import { CssPolygonRenderer2D } from "@src/engine/script/render/CssPolygonRenderer2D";
import { CssSpriteAtlasRenderer, CssSpriteAtlasRenderMode } from "@src/engine/script/render/CssSpriteAtlasRenderer";
import { CssTextRenderer, TextAlign } from "@src/engine/script/render/CssTextRenderer";
import { GlobalConfig } from "@src/GlobalConfig";
import { Vector2, Vector3 } from "three/src/Three";

/** @internal */
export class RenderTestPrefab extends Prefab {

    public make(): GameObjectBuilder {
        const instantiater = this.instantiater;

        return this.gameObjectBuilder
            .withChild(instantiater.buildGameObject("title", new Vector3(0, 10, 0))
                .withComponent(CssTextRenderer, c => {
                    c.text = "Render Test";
                    c.fontSize = 20;
                    c.textWidth = 50;
                    c.textAlign = TextAlign.Center;
                }))

            .withChild(instantiater.buildGameObject("html_element_render_test_object", new Vector3(-40, -5, 0))
                .withComponent(CssHtmlElementRenderer, c => {
                    const element = document.createElement("div");
                    element.style.backgroundColor = "#dddddd";
                    element.appendChild(new Text("hi! i'm a test object!"));
                    element.appendChild(document.createElement("br"));
                    element.appendChild(document.createElement("br"));
                    element.appendChild(new Text("you can add html elements on game objects!"));
                    element.appendChild(document.createElement("br"));
                    element.appendChild(document.createElement("br"));
                    const button = document.createElement("button");
                    button.innerText = "click me!";
                    const counter = document.createElement("span");
                    counter.innerText = "0";
                    button.onclick = (): void => {
                        counter.innerText = (parseInt(counter.innerText) + 1).toString();
                    };
                    element.appendChild(button);
                    element.appendChild(document.createElement("br"));
                    element.appendChild(new Text("count: "));
                    element.appendChild(counter);
                    element.appendChild(document.createElement("br"));
                    const slider = document.createElement("input");
                    slider.type = "range";
                    slider.min = "0";
                    slider.max = "100";
                    slider.value = "0";
                    element.appendChild(slider);

                    c.element = element;
                    setTimeout(() => {
                        const div = document.createElement("div");
                        div.innerText = "hello world!";
                        div.style.backgroundColor = "#dddddd";
                        c.element = div;
                    }, 1000000);
                    c.viewScale = 0.05;
                    c.autoSize = false;
                    c.elementWidth = 10;
                    c.elementHeight = 10;
                    c.centerOffset = new Vector2(0.5, 0.5);
                }))
                
            .withChild(instantiater.buildGameObject("text_render_test_object", new Vector3(-20, 0, 0))
                .withComponent(CssTextRenderer, c => {
                    c.enabled = true;
                    c.autoSize = false;
                    c.textWidth = 16;
                    c.fontFamily = "Sans";
                    c.text = "lorem ipsum dolor sit amet, consectetur";
                    c.textAlign = TextAlign.Center;
                }))
                
            .withChild(instantiater.buildGameObject("polygon_render_test_object", new Vector3(0, 0, 0))
                .withComponent(CssPolygonRenderer2D, c => {
                    c.enabled = true;
                    c.viewScale = 0.01;
                    c.setShapeToRegularPolygon(10, 6);
                    c.color = new Color(0.2, 0.2, 0.2, 1);
                }))
                
            .withChild(instantiater.buildGameObject("edge_render_test_object", new Vector3(20, 0, 0))
                .withComponent(CssEdgeRenderer, c => {
                    c.edgeWidth = 2;
                    c.edgeColor = new Color(1, 1, 1, 0.3);
                    c.viewScale = 0.01;
                    c.edgeWidth = 10;
                }))

            .withChild(instantiater.buildGameObject("sprite_atlas_test_object", new Vector3(40, 0, 0))
                //.active(false)
                .withComponent(CssSpriteAtlasRenderer, c => {
                    //c.enabled = false;
                    c.asyncSetImageFromPath(GlobalConfig.defaultSpriteSrc, 3, 2);
                    c.viewScale = 1;
                    c.imageIndex = 0;
                    c.pointerEvents = true;
                    c.imageFlipX = true;
                    c.imageFlipY = true;
                    c.imageWidth = 4;
                    c.imageHeight = 8;
                    c.centerOffset = new Vector2(0, 0);
                    c.renderMode = CssSpriteAtlasRenderMode.ObjectFit;
                    //settimeout loop
                    setTimeout(() => {
                        c.imageIndex = 1;
                        setTimeout(() => {
                            c.imageIndex = 2;
                            setTimeout(() => {
                                c.imageIndex = 3;
                                setTimeout(() => {
                                    c.imageIndex = 4;
                                    setTimeout(() => {
                                        c.imageIndex = 5;
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 5000);
                }))
        ;
    }
}
