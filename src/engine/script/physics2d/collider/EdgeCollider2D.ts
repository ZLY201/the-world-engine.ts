import type { Shape } from "../../../../box2d.ts/build/index";
import { ChainShape, Vec2_zero } from "../../../../box2d.ts/build/index";
import { Vector2, Vector3 } from "three/src/Three";
import { Collider2D } from "./Collider2D";
import type { GameObject } from "../../../hierarchy_object/GameObject";
import type { ReadonlyVector2 } from "../../../math/ReadonlyVector2";
import { getOrCreatePhysicsDebugRenderObject } from "../PhysicsDebugRender";
import { Object2DAttacher } from "../Object2DAttacher";
import { PrefabRef } from "../../../hierarchy_object/PrefabRef";
import { Color } from "../../../render/Color";
import { Css2DEdgeRenderer } from "../../render/Css2DEdgeRenderer";

export class EdgeCollider2D extends Collider2D {
    private _points: Vector2[] = [
        new Vector2(-2, 0),
        new Vector2(2, 0)
    ];
    private _edgeRadius = 0;
    private _debugDraw = true;
    private _debugObject: GameObject|null = null;
    private _debugRenderer: Css2DEdgeRenderer|null = null;

    public override onEnable(): void {
        super.onEnable();
        if (this._debugDraw) {
            const objectAttacher = this.gameObject.addComponent(Object2DAttacher);

            const physicsDebugRenderObject = getOrCreatePhysicsDebugRenderObject(this.engine);
            const debugRenderer = new PrefabRef<Css2DEdgeRenderer>();
            this._debugObject = physicsDebugRenderObject.addChildFromBuilder(
                this.engine.instantiater.buildGameObject(this.gameObject.name + "_debug_edge")
                    .withChild(this.engine.instantiater.buildGameObject("debug_edge", new Vector3(this.offset.x, this.offset.y, 200))
                        .withComponent(Css2DEdgeRenderer, c => {
                            c.points = this._points;
                            c.viewScale = 0.01;
                            c.edgeWidth = 2;
                            c.edgeColor = new Color(1, 1, 0, 0.3);
                            c.pointerEvents = false;
                        })
                        .getComponent(Css2DEdgeRenderer, debugRenderer)));
            
            this._debugRenderer = debugRenderer.ref;
            objectAttacher!.target = this._debugObject;
        }
    }

    public override onDisable(): void {
        super.onDisable();
        if (this._debugObject) {
            this._debugObject.destroy();
            this._debugObject = null;
        }
    }

    protected override createShape(): Shape {
        const shape = new ChainShape();
        shape.CreateChain(this._points, Vec2_zero, Vec2_zero);
        shape.m_radius = this._edgeRadius;
        return shape;
    }

    public get points(): readonly ReadonlyVector2[] {
        return this._points;
    }

    public set points(value: readonly ReadonlyVector2[]) {
        this._points.length = 0;
        for (let i = 0; i < value.length; i++) {
            this._points.push(value[i].clone());
        }
        this.updateFixture();
        if (this._debugRenderer) {
            this._debugRenderer.points = this._points;
        }
    }

    public get edgeRadius(): number {
        return this._edgeRadius;
    }

    public set edgeRadius(value: number) {
        this._edgeRadius = value;
        this.updateFixture();
    }

    public get debugDraw(): boolean {
        return this._debugDraw;
    }

    public set debugDraw(value: boolean) {
        this._debugDraw = value;
    }
}