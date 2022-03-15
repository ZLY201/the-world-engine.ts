import type {
    Contact as B2Contact,
    Fixture as B2Fixture,
    FixtureDef as B2FixtureDef,
    Manifold as B2Manifold,
    Shape as B2Shape,
    BodyDef as B2BodyDef,
    World as B2World
} from "../../../box2d.ts/build/index";
import { Vector2 } from "three/src/Three";
import type { CollisionLayerMaskConverter } from "../CollisionLayerMaskConverter";
import type { PhysicsObject2D } from "./PhysicsObject2D";
import type { Collision2DPool } from "./Collision2DPool";
import type { Collider2D } from "../../script/physics2d/collider/Collider2D";
import type { DeepReadonly } from "../../type/DeepReadonly";
import type { GameObject } from "../../hierarchy_object/GameObject";
import type { IPhysics2D } from "./IPhysics2D";
import type { IPhysicsObject2D } from "./PhysicsObject2D";
import type { PhysicsMaterial2D } from "./PhysicsMaterial2D";
import type { PhysicsSettingObject } from "../../bootstrap/setting/PhysicsSetting";
import type { RigidBody2D } from "../../script/physics2d/RigidBody2D";
import type { Physics2DLoader } from "./Physics2DLoader";

/** @internal */
export class Physics2DProcessor implements IPhysics2D {
    //configuration variables
    private _defaultMaterial: PhysicsMaterial2D|null = null;
    private _velocityIterations = 8;
    private _positionIterations = 3;
    
    // private _velocityThreshold: number = 1;
    // private _defaultContactOffset: number = 0.01;

    // private _queriesHitTriggers: boolean = true;
    // private _queriesStartInColliders: boolean = true;
    // private _reuseCollisionCallbacks = true;
    private _collisionLayerMaskConverter: CollisionLayerMaskConverter|null = null;

    //engine internal variables
    private _world: B2World|null = null;
    private readonly _gameObjectToBodyMap = new Map<GameObject, PhysicsObject2D>();
    private _loader: typeof Physics2DLoader|null = null;

    /** @internal */
    public applyPhysicsSettings(physicSetting: DeepReadonly<PhysicsSettingObject>): void {
        if(!physicSetting.loader) return;

        this._loader = physicSetting.loader;
        this._world = new this._loader.World(new this._loader.Vec2(0, -9.81));

        const ContactListener = class extends this._loader.ContactListener {
            private _physicsProcessor: Physics2DProcessor;
            private _collision2DPool: Collision2DPool;
        
            public constructor(physicsProcessor: Physics2DProcessor) {
                super();
                this._physicsProcessor = physicsProcessor;
                this._collision2DPool = new this._physicsProcessor._loader!.Collision2DPool();
            }
        
            public override BeginContact(contact: B2Contact<B2Shape, B2Shape>): void {
                const collider2dA = contact.GetFixtureA().GetUserData() as Collider2D;
                const collider2dB = contact.GetFixtureB().GetUserData() as Collider2D;
                if (collider2dA.isTrigger || collider2dB.isTrigger) {
                    //todo fix lock problem
                    collider2dA.gameObject.gameObjectEventContainer.invokeOnTriggerEnter2D(collider2dB);
                    collider2dB.gameObject.gameObjectEventContainer.invokeOnTriggerEnter2D(collider2dA);
                } else {
                    if (this._physicsProcessor.reuseCollisionCallbacks) {
                        const collsion2d = this._collision2DPool.getInstance();
                        collsion2d.setData(contact);
                        
                        collider2dA.gameObject.gameObjectEventContainer.invokeOnCollisionEnter2D(collsion2d);
                        collider2dB.gameObject.gameObjectEventContainer.invokeOnCollisionEnter2D(collsion2d);
        
                        this._collision2DPool.release(collsion2d);
                    } else {
                        const collision2d = new this._physicsProcessor._loader!.Collision2D();
                        collision2d.setData(contact);
        
                        collider2dA.gameObject.gameObjectEventContainer.invokeOnCollisionEnter2D(collision2d);
                        collider2dB.gameObject.gameObjectEventContainer.invokeOnCollisionEnter2D(collision2d);
                    }
                }
            }
        
            public override EndContact(contact: B2Contact<B2Shape, B2Shape>): void {
                const collider2dA = contact.GetFixtureA().GetUserData() as Collider2D;
                const collider2dB = contact.GetFixtureB().GetUserData() as Collider2D;
                if (collider2dA.isTrigger || collider2dB.isTrigger) {
                    collider2dA.gameObject.gameObjectEventContainer.invokeOnTriggerExit2D(collider2dB);
                    collider2dB.gameObject.gameObjectEventContainer.invokeOnTriggerExit2D(collider2dA);
                } else {
                    if (this._physicsProcessor.reuseCollisionCallbacks) {
                        const collsion2d = this._collision2DPool.getInstance();
                        collsion2d.setData(contact);
        
                        collider2dA.gameObject.gameObjectEventContainer.invokeOnCollisionExit2D(collsion2d);
                        collider2dB.gameObject.gameObjectEventContainer.invokeOnCollisionExit2D(collsion2d);
        
                        this._collision2DPool.release(collsion2d);
                    } else {
                        const collision2d = new this._physicsProcessor._loader!.Collision2D();
                        collision2d.setData(contact);
        
                        collider2dA.gameObject.gameObjectEventContainer.invokeOnCollisionExit2D(collision2d);
                        collider2dB.gameObject.gameObjectEventContainer.invokeOnCollisionExit2D(collision2d);
                    }
                }
            }
        
            public override PreSolve(contact: B2Contact<B2Shape, B2Shape>, _oldManifold: B2Manifold): void {
                const collider2dA = contact.GetFixtureA().GetUserData() as Collider2D;
                const collider2dB = contact.GetFixtureB().GetUserData() as Collider2D;
                if (collider2dA.isTrigger || collider2dB.isTrigger) {
                    collider2dA.gameObject.gameObjectEventContainer.invokeOnTriggerStay2D(collider2dB);
                    collider2dB.gameObject.gameObjectEventContainer.invokeOnTriggerStay2D(collider2dA);
                } else {
                    if (this._physicsProcessor.reuseCollisionCallbacks) {
                        const collsion2d = this._collision2DPool.getInstance();
                        collsion2d.setData(contact);
        
                        collider2dA.gameObject.gameObjectEventContainer.invokeOnCollisionStay2D(collsion2d);
                        collider2dB.gameObject.gameObjectEventContainer.invokeOnCollisionStay2D(collsion2d);
        
                        this._collision2DPool.release(collsion2d);
                    } else {
                        const collision2d = new this._physicsProcessor._loader!.Collision2D();
                        collision2d.setData(contact);
        
                        collider2dA.gameObject.gameObjectEventContainer.invokeOnCollisionStay2D(collision2d);
                        collider2dB.gameObject.gameObjectEventContainer.invokeOnCollisionStay2D(collision2d);
                    }
                }
            }
        };

        this._world.SetContactListener(new ContactListener(this));

        if (physicSetting.gravity) this._world?.SetGravity(physicSetting.gravity);
        if (physicSetting.defaultMaterial) this._defaultMaterial = physicSetting.defaultMaterial.clone();
        if (physicSetting.velocityIterations) this._velocityIterations = physicSetting.velocityIterations;
        if (physicSetting.positionIterations) this._positionIterations = physicSetting.positionIterations;
        // if (physicSetting.velocityThreshold) this._velocityThreshold = physicSetting.velocityThreshold;
        // if (physicSetting.defaultContactOffset) this._defaultContactOffset = physicSetting.defaultContactOffset;
        // if (physicSetting.queriesHitTriggers) this._queriesHitTriggers = physicSetting.queriesHitTriggers;
        // if (physicSetting.queriesStartInColliders) this._queriesStartInColliders = physicSetting.queriesStartInColliders;
        if (physicSetting.reuseCollisionCallbacks) this.reuseCollisionCallbacks = physicSetting.reuseCollisionCallbacks;
        if (physicSetting.collisionLayerMaskMatrix) this._collisionLayerMaskConverter = new this._loader.CollisionLayerMaskConverter(physicSetting.collisionLayerMaskMatrix);
    }

    /** @internal */
    public update(deltaTime: number): void {
        if (!this._world) return;

        { //synchronize physics world with game world
            let body = this._world.GetBodyList();

            while (body) {
                const currentBody = body;
                body = body.GetNext();

                const entity = currentBody.GetUserData() as PhysicsObject2D;
                if (entity.destroyed) {
                    this._world.DestroyBody(currentBody);
                    continue;
                }

                const transform = entity.gameObject.transform;
                const gamePosition = transform.position;
                const gameRotation = transform.eulerAngles;

                const b2Position = currentBody.GetPosition();
                const b2Rotation = currentBody.GetAngle();

                if (gamePosition.x !== b2Position.x || gamePosition.y !== b2Position.y) {
                    currentBody.SetPosition(gamePosition);
                    currentBody.SetAwake(true);
                }

                if (gameRotation.z !== b2Rotation) {
                    currentBody.SetAngle(gameRotation.z);
                    currentBody.SetAwake(true);
                }
            }
        }

        this._world.Step(deltaTime, this._velocityIterations, this._positionIterations);

        { //synchronize game world with physics world
            let body = this._world.GetBodyList();

            while (body) {
                const currentBody = body;
                body = body.GetNext();

                const entity = currentBody.GetUserData() as PhysicsObject2D;
                if (entity.destroyed) {
                    this._world.DestroyBody(currentBody);
                    continue;
                }

                const transform = entity.gameObject.transform;
                transform.position.x = currentBody.GetPosition().x;
                transform.position.y = currentBody.GetPosition().y;
                transform.eulerAngles.z = currentBody.GetAngle();
            }
        }

        //onTrigger invoke
        //onCollision invoke
    }

    /**
     * bodyDef.userData must not be set.
     * @internal
     */
    public addRigidBody(gameObject: GameObject, rigidBody: RigidBody2D, bodyDef: B2BodyDef): IPhysicsObject2D {
        if (!this._world) throw new Error("Physics2D is not loaded.");

        let physicsObject = this._gameObjectToBodyMap.get(gameObject);
        if (!physicsObject) {
            physicsObject = new this._loader!.PhysicsObject2D(
                gameObject,
                this._world.CreateBody(bodyDef),
                () => this._gameObjectToBodyMap.delete(gameObject)
            );
            this._gameObjectToBodyMap.set(gameObject, physicsObject);
            return physicsObject.addRigidBody(rigidBody);
        } else {
            const physicsBody = physicsObject.addRigidBody(rigidBody);
            const body = physicsBody.body;
            body.SetType(bodyDef.type);
            body.SetPosition(bodyDef.position);
            body.SetAngle(bodyDef.angle);
            body.SetLinearVelocity(bodyDef.linearVelocity);
            body.SetAngularVelocity(bodyDef.angularVelocity);
            body.SetLinearDamping(bodyDef.linearDamping);
            body.SetAngularDamping(bodyDef.angularDamping);
            body.SetSleepingAllowed(bodyDef.allowSleep);
            body.SetAwake(bodyDef.awake);
            body.SetFixedRotation(bodyDef.fixedRotation);
            body.SetBullet(bodyDef.bullet);
            body.SetEnabled(bodyDef.enabled);
            body.SetUserData(bodyDef.userData);
            body.SetGravityScale(bodyDef.gravityScale);
            return physicsBody;
        }
    }

    /** @internal */
    public removeRigidBody(gameObject: GameObject): void {
        const physicsObject = this._gameObjectToBodyMap.get(gameObject);
        if (!physicsObject) throw new Error("PhysicsObject2D not found"); 
        physicsObject.removeRigidBody();
    }

    private createColliderDefaultBodyDef(gameObject: GameObject): B2BodyDef {
        const bodyDef = new this._loader!.BodyDef();
        bodyDef.type = this._loader!.BodyType.b2_kinematicBody;
        bodyDef.position.x = gameObject.transform.position.x;
        bodyDef.position.y = gameObject.transform.position.y;
        bodyDef.angle = gameObject.transform.eulerAngles.z;
        return bodyDef;
    }

    /** @internal */
    public addCollider(gameObject: GameObject, collider: Collider2D, fixturedef: B2FixtureDef): B2Fixture {
        if (!this._world) throw new Error("Physics2D is not loaded.");
        
        let physicsObject = this._gameObjectToBodyMap.get(gameObject);
        if (!physicsObject) {
            physicsObject = new this._loader!.PhysicsObject2D(
                gameObject,
                this._world.CreateBody(this.createColliderDefaultBodyDef(gameObject)),
                () => this._gameObjectToBodyMap.delete(gameObject)
            );
        }
        this._gameObjectToBodyMap.set(gameObject, physicsObject);
        return physicsObject.addCollider(collider, fixturedef);
    }

    /** @internal */
    public removeCollider(gameObject: GameObject, collider: Collider2D, fixture: B2Fixture): void {
        const physicsObject = this._gameObjectToBodyMap.get(gameObject);
        if (!physicsObject) throw new Error("PhysicsObject2D not found");
        physicsObject.removeCollider(collider, fixture);
    }

    public get physicsLoader(): Physics2DLoader|null {
        return this._loader;
    }

    public get gravity(): Vector2 {
        if (!this._world) throw new Error("Physics2D is not loaded.");
        const b2Vec2 = this._world.GetGravity();
        return new Vector2(b2Vec2.x, b2Vec2.y);
    }

    public set gravity(value: Vector2) {
        if (!this._world) throw new Error("Physics2D is not loaded.");
        this._world.SetGravity(new this._loader!.Vec2(value.x, value.y));
    }

    public get defaultMaterial(): PhysicsMaterial2D|null {
        return this._defaultMaterial;
    }

    public get velocityIterations(): number {
        return this._velocityIterations;
    }

    public set velocityIterations(value: number) {
        this._velocityIterations = value;
    }

    public get positionIterations(): number {
        return this._positionIterations;
    }

    public set positionIterations(value: number) {
        this._positionIterations = value;
    }

    // public get velocityThreshold(): number {
    //     throw new Error("Method not implemented.");
    // }

    // public set velocityThreshold(_value: number) {
    //     throw new Error("Method not implemented.");
    // }

    public get maxLinearCorrection(): number {
        if (!this._loader) throw new Error("Physics2D is not loaded.");
        return this._loader.maxLinearCorrection;
    }

    public get maxAngularCorrection(): number {
        if (!this._loader) throw new Error("Physics2D is not loaded.");
        return this._loader.maxAngularCorrection;
    }

    public get maxTranslationSpeed(): number {
        if (!this._loader) throw new Error("Physics2D is not loaded.");
        return this._loader.maxTranslation;
    }

    public get maxRotationSpeed(): number {
        if (!this._loader) throw new Error("Physics2D is not loaded.");
        return this._loader.maxRotation;
    }

    public get baumgarteScale(): number {
        if (!this._loader) throw new Error("Physics2D is not loaded.");
        return this._loader.baumgarte;
    }

    public get baumgarteTimeOfImpactScale(): number {
        if (!this._loader) throw new Error("Physics2D is not loaded.");
        return this._loader.toiBaumgarte;
    }

    public get timeToSleep(): number {
        if (!this._loader) throw new Error("Physics2D is not loaded.");
        return this._loader.timeToSleep;
    }

    public get linearSleepTolerance(): number {
        if (!this._loader) throw new Error("Physics2D is not loaded.");
        return this._loader.linearSleepTolerance;
    }

    public get angularSleepTolerance(): number {
        if (!this._loader) throw new Error("Physics2D is not loaded.");
        return this._loader.angularSleepTolerance;
    }

    // for performance reasons, we don't use this get set method

    // public get reuseCollisionCallbacks(): boolean {
    //     return this._reuseCollisionCallbacks;
    // }

    // public set reuseCollisionCallbacks(value: boolean) {
    //     this._reuseCollisionCallbacks = value;
    // }

    public reuseCollisionCallbacks = true;
    
    public get collisionLayerMask(): CollisionLayerMaskConverter {
        return this._collisionLayerMaskConverter!;
    }
}
