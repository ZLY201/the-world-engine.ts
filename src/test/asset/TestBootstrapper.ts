import { Vector2, Vector3 } from "three/src/Three";
import { Bootstrapper } from "../../engine/bootstrap/Bootstrapper";
import { SceneBuilder } from "../../engine/bootstrap/SceneBuilder";
import { FpsCounter } from "./script/FpsCounter";
import { TestLayer } from "./TestLayer";
import { Camera, CameraType } from "../../engine/script/render/Camera";
import { EditorCameraController } from "../../engine/script/controller/EditorCameraController";
import { EditorGridRenderer } from "../../engine/script/post_render/EditorGridRenderer";
import { CssTextRenderer } from "../../engine/script/render/CssTextRenderer";
import { Color } from "../../engine/render/Color";
import { Physics2DLoader } from "../../engine/physics/2d/Physics2DLoader";
import { PhysicsTestPrefab } from "./prefab/PhysicsTestPrefab";

/** @internal */
export class TestBootstrapper extends Bootstrapper {
    public run(): SceneBuilder {

        console.clear();

        this.setting.render
            .useCss3DRenderer(true);

        this.setting.physics
            .loader(Physics2DLoader)
            .layerCollisionMatrix<TestLayer>({
                default: { player: true, level: true, default: true },
                level: { player: true, level: true },
                player: { player: true }
            });

        const instantiater = this.instantiater;

        return this.sceneBuilder
            
            .withChild(instantiater.buildPrefab("physics_test", PhysicsTestPrefab, new Vector3(0, 0, 0)).make())

        //.withChild(instantiater.buildPrefab("render_test", RenderTestPrefab, new Vector3(0, -25, 0)).make())

        //.withChild(instantiater.buildPrefab("top_down_scene", TopDownScenePrefab,  new Vector3(0, -50, 0)).make())
            
            .withChild(instantiater.buildGameObject("editor_camera", new Vector3(0, 0, 80))
                .withComponent(Camera, c => {
                    c.viewSize = 10;
                    c.backgroundColor = new Color(0, 0, 0);
                    c.cameraType = CameraType.Orthographic;
                })
                .withComponent(EditorCameraController, c => {
                    c.maxViewSize = 40;
                })
                .withComponent(EditorGridRenderer, c => {
                    c.enabled = false;
                    c.renderWidth = 100;
                    c.renderHeight = 100;
                })
                .withComponent(CssTextRenderer, c => {
                    c.pointerEvents = false;
                    c.text = "e : spawn object  d : despawn object";
                    c.textWidth = 18;
                    c.centerOffset = new Vector2(0, 3);
                })
                .withChild(instantiater.buildGameObject("fps_counter")
                    .withComponent(CssTextRenderer, c => {
                        c.autoSize = true;
                        c.centerOffset = new Vector2(-1.8, 1.8);
                        c.textColor = new Color(1, 1, 1);
                    })
                    .withComponent(FpsCounter)))
        ;
    }
}
