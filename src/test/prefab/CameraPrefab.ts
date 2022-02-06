import { Vector2 } from "three";
import { TrackCameraController, Camera, GameObject, GameObjectBuilder, Prefab, PrefabRef, Color } from "../../index";

export class CameraPrefab extends Prefab {
    private _trackTarget = new PrefabRef<GameObject>();

    public withTrackTarget(target: PrefabRef<GameObject>): CameraPrefab {
        this._trackTarget = target;
        return this;
    }

    public make(): GameObjectBuilder {
        return this.gameObjectBuilder
            .withComponent(Camera, c => {
                c.backgroundColor = new Color(0, 0, 0);
            })
            .withComponent(TrackCameraController, c => {
                c.setTrackTarget(this._trackTarget.ref!);
                c.targetOffset = new Vector2(0, 0);
            });
    }
}