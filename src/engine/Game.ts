import { Bootstrapper } from "./bootstrap/Bootstrapper";
import { CameraContainer } from "./render/CameraContainer";
import { EngineGlobalObject } from "./EngineGlobalObject";
import { GameState, GameStateKind } from "./GameState";
import { Scene } from "./hierarchy_object/Scene";
import { IInputEventHandleable } from "./input/IInputEventHandleable";
import { SceneProcessor } from "./SceneProcessor";
import { Time } from "./time/Time";
import { GameScreen } from "./render/GameScreen";
import { BootstrapperConstructor } from "./bootstrap/BootstrapperConstructor";
import { Transform } from "./hierarchy_object/Transform";
import { CoroutineProcessor } from "./coroutine/CoroutineProcessor";
import { Color } from "./render/Color";
import { TransformMatrixProcessor } from "./render/TransformMatrixProcessor";
import { OptimizedCSS3DRenderer } from "./render/OptimizedCSS3DRenderer";

/**
 * game engine class
 */
export class Game {
    private readonly _rootScene: Scene;
    private readonly _gameScreen: GameScreen;
    private readonly _renderer: OptimizedCSS3DRenderer;
    private readonly _cameraContainer: CameraContainer;
    private readonly _time: Time;
    private readonly _gameState: GameState;
    private readonly _sceneProcessor: SceneProcessor;
    private readonly _coroutineProcessor: CoroutineProcessor;
    private readonly _transformMatrixProcessor: TransformMatrixProcessor;
    private readonly _engineGlobalObject: EngineGlobalObject;
    private readonly _container: HTMLElement;
    private _animationFrameId: number|null;
    private _isDisposed: boolean;
    private _resizeFrameBufferBind: () => void;
    private _loopBind: () => void;

    /**
     * 
     * @param container html element that mount the game view
     */
    public constructor(container: HTMLElement) {
        this._rootScene = new Scene();
        this._gameScreen = new GameScreen(container.clientWidth, container.clientHeight);
        this._container = container;
        this._renderer = new OptimizedCSS3DRenderer();
        this._renderer.setSize(container.clientWidth, container.clientHeight);
        this._renderer.domElement.style.width = "100%";
        this._renderer.domElement.style.height = "100%";
        this._cameraContainer = new CameraContainer((color: Color) => {
            this._renderer.domElement.style.backgroundColor = "rgba(" + (color.r * 255) + "," + (color.g * 255) + "," + (color.b * 255) + "," + color.a + ")";
        });
        this._time = new Time();
        this._gameState = new GameState(GameStateKind.WaitingForStart);
        this._sceneProcessor = new SceneProcessor();
        this._coroutineProcessor = new CoroutineProcessor(this._time);
        this._transformMatrixProcessor = new TransformMatrixProcessor();
        this._engineGlobalObject = new EngineGlobalObject(
            this._rootScene,
            this._cameraContainer,
            this._time,
            this._gameState,
            this._gameScreen,
            this._sceneProcessor,
            this._coroutineProcessor,
            this._transformMatrixProcessor,
            this._renderer.domElement
        );
        this._animationFrameId = null;
        this._isDisposed = false;
        container.appendChild(this._renderer.domElement);
        this._renderer.domElement.onscroll = () => { //block scroll to prevent camera bug
            this._renderer.domElement.scrollLeft = 0;
            this._renderer.domElement.scrollTop = 0;
        };
        this._resizeFrameBufferBind = this.resizeFramebuffer.bind(this);
        window.addEventListener("resize", this._resizeFrameBufferBind);
        this._loopBind = this.loop.bind(this);
    }

    private resizeFramebuffer(): void {
        const width = this._container.clientWidth;
        const height = this._container.clientHeight;
        if (width === this._gameScreen.width && height === this._gameScreen.height) return;
        this._gameScreen.resize(width, height);
        this._renderer.setSize(width, height);
        this._renderer.domElement.style.width = "100%";
        this._renderer.domElement.style.height = "100%";
    }

    /**
     * run game
     * @param bootstrapperCtor 
     * @param interopObject 
     */
    public run<T, U extends Bootstrapper<T> = Bootstrapper<T>>(bootstrapperCtor: BootstrapperConstructor<T, U>, interopObject?: T): void {
        if (this._isDisposed) throw new Error("Game is disposed.");
        if (this._gameState.kind !== GameStateKind.WaitingForStart) throw new Error("Game is already running.");
        this._gameState.kind = GameStateKind.Initializing;
        this._time.start();
        const bootstrapper = new bootstrapperCtor(this._engineGlobalObject, interopObject);
        bootstrapper.run().build();
        //If a camera exists in the bootstrapper,
        //it is certain that the camera exists in the global variable from this point on.
        if (!this._cameraContainer.camera) throw new Error("Camera is not exist or not active in the scene.");
        this._gameState.kind = GameStateKind.Running;
        this._sceneProcessor.startProcessNonSyncedEvent(); // execute start() and update() event
        this._coroutineProcessor.updateAfterProcess();
        if (!this._cameraContainer.camera) throw new Error("Camera is not exist or not active in the scene.");
        this._sceneProcessor.processRemoveObject();
        const renderObjects = this._transformMatrixProcessor.update();
        this._renderer.render(renderObjects, this._rootScene, this._cameraContainer.camera);
        this._transformMatrixProcessor.flush();
        this._coroutineProcessor.endFrameAfterProcess();
        this.loop();
    }

    private loop(): void {
        this._animationFrameId = requestAnimationFrame(this._loopBind);
        this._time.update();
        this._sceneProcessor.startProcessNonSyncedEvent();
        this._coroutineProcessor.tryCompact();
        this._coroutineProcessor.updateAfterProcess();
        if (!this._cameraContainer.camera) throw new Error("Camera is not exist or not active in the scene.");
        this._sceneProcessor.processRemoveObject();
        const renderObjects = this._transformMatrixProcessor.update();
        this._renderer.render(renderObjects, this._rootScene, this._cameraContainer.camera);
        this._transformMatrixProcessor.flush();
        this._coroutineProcessor.endFrameAfterProcess();
    }

    /**
     * stop game (you can resume game after game is stopped.)
     */
    public stop(): void {
        if (this._isDisposed) throw new Error("Game is disposed.");
        if (this._gameState.kind !== GameStateKind.Running) throw new Error("Game is not running.");
        this._gameState.kind = GameStateKind.Stopped;
        if (this._animationFrameId) cancelAnimationFrame(this._animationFrameId);
        this._animationFrameId = null;
    }

    /**
     * resume game
     */
    public resume(): void {
        if (this._isDisposed) throw new Error("Game is disposed.");
        if (this._gameState.kind !== GameStateKind.Stopped) throw new Error("Game is not stopped.");
        this._gameState.kind = GameStateKind.Running;
        this.loop();
    }

    /**
     * dispose game
     */
    public dispose(): void {
        if (this._isDisposed) return;
        this._gameState.kind = GameStateKind.Finalizing;
        if (this._animationFrameId) cancelAnimationFrame(this._animationFrameId);
        this._engineGlobalObject.dispose();
        this._rootScene.children.slice().forEach(child => {
            if (child instanceof Transform) child.gameObject.destroy();
        });
        this._container.removeChild(this._renderer.domElement);
        window.removeEventListener("resize", this._resizeFrameBufferBind);
        this._isDisposed = true;
        this._gameState.kind = GameStateKind.Finalized;
    }

    /**
     * get inputHandler for eventhandle toggle.
     */
    public get inputHandler(): IInputEventHandleable {
        return this._engineGlobalObject.input;
    }

    /**
     * get current game state
     */
    public get currentGameState(): GameStateKind {
        return this._gameState.kind;
    }
}
