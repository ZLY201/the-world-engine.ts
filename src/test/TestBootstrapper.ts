import { Vector2, Vector3 } from "three";
import { CssHtmlElementRenderer, CssSpriteRenderer } from "..";
import { Bootstrapper } from "../engine/bootstrap/Bootstrapper";
import { SceneBuilder } from "../engine/bootstrap/SceneBuilder";
import { Camera } from "../engine/script/render/Camera";
import { Rotator } from "./script/Rotator";

export class TestBootstrapper extends Bootstrapper {
    run(): SceneBuilder {
        const instantlater = this.engine.instantlater;
        
        return this.sceneBuilder
            .withChild(instantlater.buildGameObject("camera", new Vector3(0, 0, 10))
                .withComponent(Camera, c => {
                    c.viewSize = 100;
                }))

            .withChild(instantlater.buildGameObject("test_object")
                .withComponent(CssSpriteRenderer)
                .withComponent(Rotator))

            .withChild(instantlater.buildGameObject("test_object2")
                .withComponent(CssHtmlElementRenderer, c => {
                    c.autoSize = true;
                    const element = document.createElement("div");
                    element.innerText = "test";
                    element.style.backgroundColor = "#F0DB4F";
                    element.style.color = "#323330";
                    c.setElement(element);
                    c.centerOffset = new Vector2(0.5, 0.5);
                }));
    }
}