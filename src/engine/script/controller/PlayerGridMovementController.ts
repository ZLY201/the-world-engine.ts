import { Vector2 } from "three/src/Three";

import { EventContainer, IEventContainer } from "../../collection/EventContainer";
import { ReadonlyVector2 } from "../../math/ReadonlyVector2";
import { WritableVector2 } from "../../math/WritableVector2";
import { Pathfinder } from "../ai/pathfind/Pathfinder";
import { IGridCollidable } from "../grid_physics2d/IGridCollidable";
import { Directable, Direction } from "../helper/Directable";
import { IGridPositionable } from "../helper/IGridPositionable";
import { GridPointer } from "../input/GridPointer";
import { PointerGridEvent } from "../input/PointerGridInputListener";

/**
 * make gameobject moves on grid coordinates
 * 
 * supports keyboard wasd and arrow keys input
 * 
 * supports pathfinding as optional feature
 * 
 * disallow multiple component
 */
export class PlayerGridMovementController extends Directable implements IGridPositionable {
    public override readonly disallowMultipleComponent: boolean = true;

    private _speed = 8;
    private _gridCellHeight = 1;
    private _gridCellWidth = 1;
    private readonly _collideMaps: IGridCollidable[] = [];
    private readonly _collideSize: number = 0.5;
    private readonly _gridCenter: Vector2 = new Vector2();
    private readonly _currentPosition: Vector2 = new Vector2();
    private readonly _targetPosition: Vector2 = new Vector2();
    private readonly _initPosition: Vector2 = new Vector2(); //integer position
    private readonly _onMoveToTargetEvent = new EventContainer<(x: number, y: number) => void>(); //integer position
    private readonly _onMovedToTargetEvent = new EventContainer<(x: number, y: number) => void>(); //integer position

    private _gridPointer: GridPointer|null = null;
    private _pathfinder: Pathfinder|null = null;
    private _movingByPathfinder = false;
    private _foundedPath: Vector2[]|null = null;
    private _currentPathIndex = 0;
    private _pathfindStartFunction: (() => void)|null = null;
    private readonly _cachedParentWorldPosition: Vector2 = new Vector2();
    private _receiveKeyboardInput = true;

    private readonly _tempVector2 = new Vector2();
    private readonly _temp2Vector2 = new Vector2();

    public start(): void {
        this._pathfinder = new Pathfinder(
            this._collideMaps, 
            this._gridCellWidth * this._collideSize,
            this._gridCellHeight * this._collideSize
        );

        const transform = this.transform;
        const position = transform.position;
        position.x = this._gridCenter.x + this._initPosition.x * this._gridCellWidth;
        position.y = this._gridCenter.y + this._initPosition.y * this._gridCellHeight;
        this._currentPosition.set(transform.localPosition.x, transform.localPosition.y);

        const parent = transform.parent;
        if (parent) this._cachedParentWorldPosition.set(parent.position.x, parent.position.y);
    }

    public update(): void {
        this._pathfindStartFunction?.();
        if (this._receiveKeyboardInput) {
            this.processInput();
        }
        this.processPathfinderInput();
        this.processMovement();
    }

    private processInput(): void {
        if (this.isMoving) {
            this.tryCancelPathfinder();
            return;
        }

        const inputMap = this.engine.input.map;
        const currentPosition = this._currentPosition;
        if (inputMap.get("w") || inputMap.get("ArrowUp")) {
            this.direction = Direction.Up;
            if (this.checkCollision(currentPosition.x, currentPosition.y + this._gridCellHeight)) return;
            this._targetPosition.set(currentPosition.x, currentPosition.y + this._gridCellHeight);
            this.invokeOnMoveToTarget();
            this.isMoving = true;
        } else if (inputMap.get("s") || inputMap.get("ArrowDown")) {
            this.direction = Direction.Down;
            if (this.checkCollision(currentPosition.x, currentPosition.y - this._gridCellHeight)) return;
            this._targetPosition.set(currentPosition.x, currentPosition.y - this._gridCellHeight);
            this.invokeOnMoveToTarget();
            this.isMoving = true;
        } else if (inputMap.get("a") || inputMap.get("ArrowLeft")) {
            this.direction = Direction.Left;
            if (this.checkCollision(currentPosition.x - this._gridCellWidth, currentPosition.y)) return;
            this._targetPosition.set(currentPosition.x - this._gridCellWidth, currentPosition.y);
            this.invokeOnMoveToTarget();
            this.isMoving = true;
        } else if (inputMap.get("d") || inputMap.get("ArrowRight")) {
            this.direction = Direction.Right;
            if (this.checkCollision(currentPosition.x + this._gridCellWidth, currentPosition.y)) return;
            this._targetPosition.set(currentPosition.x + this._gridCellWidth, currentPosition.y);
            this.invokeOnMoveToTarget();
            this.isMoving = true;
        }
    }

    private noncheckProcessInput(currentPosotion: Vector2): boolean {
        const inputMap = this.engine.input.map;
        if (inputMap.get("w") || inputMap.get("ArrowUp")) {
            this.direction = Direction.Up;
            if (this.checkCollision(currentPosotion.x, currentPosotion.y + this._gridCellHeight)) return false;
            this._targetPosition.set(currentPosotion.x, currentPosotion.y + this._gridCellHeight);
            this.invokeOnMoveToTarget();
            return true;
        } else if (inputMap.get("s") || inputMap.get("ArrowDown")) {
            this.direction = Direction.Down;
            if (this.checkCollision(currentPosotion.x, currentPosotion.y - this._gridCellHeight)) return false;
            this._targetPosition.set(currentPosotion.x, currentPosotion.y - this._gridCellHeight);
            this.invokeOnMoveToTarget();
            return true;
        } else if (inputMap.get("a") || inputMap.get("ArrowLeft")) {
            this.direction = Direction.Left;
            if (this.checkCollision(currentPosotion.x - this._gridCellWidth, currentPosotion.y)) return false;
            this._targetPosition.set(currentPosotion.x - this._gridCellWidth, currentPosotion.y);
            this.invokeOnMoveToTarget();
            return true;
        } else if (inputMap.get("d") || inputMap.get("ArrowRight")) {
            this.direction = Direction.Right;
            if (this.checkCollision(currentPosotion.x + this._gridCellWidth, currentPosotion.y)) return false;
            this._targetPosition.set(currentPosotion.x + this._gridCellWidth, currentPosotion.y);
            this.invokeOnMoveToTarget();
            return true;
        }
        return false;
    }

    private invokeOnMoveToTarget(): void {
        this._onMoveToTargetEvent.invoke(
            Math.floor((this._targetPosition.x - this._gridCenter.x) / this._gridCellWidth),
            Math.floor((this._targetPosition.y - this._gridCenter.y) / this._gridCellHeight)
        );
    }

    private invokeOnMovedToTarget(): void {
        this._onMovedToTargetEvent.invoke(
            Math.floor((this._currentPosition.x - this._gridCenter.x) / this._gridCellWidth),
            Math.floor((this._currentPosition.y - this._gridCenter.y) / this._gridCellHeight)
        );
    }

    private tryCancelPathfinder(): void {
        const inputMap = this.engine.input.map;
        if (inputMap.get("w") || inputMap.get("ArrowUp")) {
            this._movingByPathfinder = false;
        } else if (inputMap.get("s") || inputMap.get("ArrowDown")) {
            this._movingByPathfinder = false;
        } else if (inputMap.get("a") || inputMap.get("ArrowLeft")) {
            this._movingByPathfinder = false;
        } else if (inputMap.get("d") || inputMap.get("ArrowRight")) {
            this._movingByPathfinder = false;
        }
    }

    private processPathfinderInput(): void {
        if (!this._movingByPathfinder) return;

        const transform = this.transform;
        const currentPositionVector2 = this._tempVector2.set(transform.localPosition.x, transform.localPosition.y);
        const currentPath = this._foundedPath![this._currentPathIndex];
        const distance = currentPath.distanceTo(currentPositionVector2);
        if (distance < this._speed * this.engine.time.deltaTime) {
            this._currentPathIndex++;
            if (this._currentPathIndex >= this._foundedPath!.length) {
                this._movingByPathfinder = false;
                return;
            } else {
                this.invokeOnMovedToTarget();
            }
        }
        if (this.checkCollision(currentPath.x, currentPath.y)) { //path changed while moving
            this._movingByPathfinder = false;
            return;
        }
        if (this._targetPosition.equals(this._foundedPath![this._currentPathIndex])) return;
        this._targetPosition.copy(this._foundedPath![this._currentPathIndex]);
        this.invokeOnMoveToTarget();
        const prevPositionX = this._foundedPath![this._currentPathIndex - 1].x;
        const prevPositionY = this._foundedPath![this._currentPathIndex - 1].y;
        const currentPositionX = this._foundedPath![this._currentPathIndex].x;
        const currentPositionY = this._foundedPath![this._currentPathIndex].y;
        if (prevPositionY < currentPositionY) {
            this.direction = Direction.Up;
        } else if (prevPositionY > currentPositionY) {
            this.direction = Direction.Down;
        } else if (prevPositionX < currentPositionX) {
            this.direction = Direction.Right;
        } else if (prevPositionX > currentPositionX) {
            this.direction = Direction.Left;
        }
        this.isMoving = true;
    }

    private processMovement(): void {
        if (!this.isMoving) return;
        const transform = this.transform;
        const vector2Pos = this._tempVector2.set(transform.localPosition.x, transform.localPosition.y);
        let distance = vector2Pos.distanceTo(this._targetPosition);
        const oneStepDistance = this._speed * this.engine.time.deltaTime;

        if (distance < oneStepDistance) {
            if (this.noncheckProcessInput(this._targetPosition)) {
                distance = vector2Pos.distanceTo(this._targetPosition);
                this.invokeOnMovedToTarget();
            }
        }

        const direction = this._temp2Vector2.copy(this._targetPosition).sub(vector2Pos).normalize();
        
        if (distance < oneStepDistance) {
            this.isMoving = false;
            this._currentPosition.copy(this._targetPosition);
            transform.localPosition.x = this._currentPosition.x;
            transform.localPosition.y = this._currentPosition.y;
            this.invokeOnMovedToTarget();
        } else {
            direction.multiplyScalar(oneStepDistance);

            this.gameObject.transform.localPosition.x += direction.x;
            this.gameObject.transform.localPosition.y += direction.y;
        }
    }

    /**
     * 
     * @param x local position x
     * @param y local position y
     * @returns 
     */
    private checkCollision(x: number, y: number): boolean {
        x += this._cachedParentWorldPosition.x;
        y += this._cachedParentWorldPosition.y;
        
        const collideMaps = this._collideMaps;
        for (let i = 0; i < collideMaps.length; ++i) {
            if (collideMaps[i].checkCollision(x, y, this._collideSize, this._collideSize)) {
                return true;
            }
        }
        return false;
    }

    private _lastPointerDownTime = -1;
    private readonly _lastPointerDownPosition: Vector2 = new Vector2();
    private readonly _doubleClickTime = 0.3;

    private readonly onPointerDown = (event: PointerGridEvent): void => {
        if (event.button !== 0) return;
        this._movingByPathfinder = false;
        const currentElapsedTime = this.engine.time.unscaledTime;
        if (currentElapsedTime - this._lastPointerDownTime < this._doubleClickTime) {
            if (this._lastPointerDownPosition.equals(event.gridPosition)) {
                this.onDoubleClick(event);
                this._lastPointerDownTime = -1;
            }
        } else {
            this._lastPointerDownTime = currentElapsedTime;
            this._lastPointerDownPosition.copy(event.gridPosition);
        }
    };

    private onDoubleClick(event: PointerGridEvent): void {
        if (this._movingByPathfinder) {
            this._movingByPathfinder = false;
            this._pathfindStartFunction = (): void => {
                this.tryStartPathfind(event.gridPosition); 
            };
            return;
        }
        this._pathfindStartFunction = (): void => {
            this.tryStartPathfind(event.gridPosition); 
        };
    }

    /**
     * try to move to target grid position
     * @param targetGridPosition 
     * @returns if object already moving by pathfinder return false,
     * 
     * if object can't move to target grid position return false,
     * 
     * if object can move to target grid position return true
     */
    public tryStartPathfind(targetGridPosition: Vector2): boolean {
        if (this._movingByPathfinder) return false;
        this._pathfindStartFunction = null;
        
        const foundedPath = this._foundedPath = this._pathfinder!.findPath(this.positionInGrid, targetGridPosition);
        if (!foundedPath || foundedPath.length <= 1) return false;
        for (let i = 0; i < foundedPath.length; ++i) {
            const path = foundedPath[i];
            path.x = path.x * this._gridCellWidth + this._gridCenter.x;
            path.y = path.y * this._gridCellHeight + this._gridCenter.y;
        }
        this._currentPathIndex = 1;
        this.isMoving = true;
        this._movingByPathfinder = true;

        return true;
    }

    /**
     * cancel moving by pathfinder
     */
    public cancelPathfind(): void {
        this._movingByPathfinder = false;
    }

    /**
     * on move to target event position is grid position (integer)
     */
    public get onMoveToTarget(): IEventContainer<(x: number, y: number) => void> {
        return this._onMoveToTargetEvent;
    }

    /**
     * on moved to target event position is grid position (integer)
     */
    public get onMovedToTarget(): IEventContainer<(x: number, y: number) => void> {
        return this._onMovedToTargetEvent;
    }

    /**
     * teleport to target grid position
     * @param positionInGrid position in grid coordinates
     */
    public teleport(positionInGrid: ReadonlyVector2): void {
        this.isMoving = false;
        this._movingByPathfinder = false;

        (this._currentPosition as WritableVector2)
            .copy(positionInGrid)
            .multiplyScalar(this._gridCellWidth)
            .add(this._gridCenter);
        (this._targetPosition as WritableVector2)
            .copy(this._currentPosition);
        
        this.transform.localPosition.x = this._currentPosition.x;
        this.transform.localPosition.y = this._currentPosition.y;
        this.invokeOnMoveToTarget();
        this.invokeOnMovedToTarget();
    }

    /**
     * move speed (default: 8)
     */
    public get speed(): number {
        return this._speed;
    }

    /**
     * move speed (default: 8)
     */
    public set speed(value: number) {
        this._speed = value;
    }

    /**
     * grid center position (default: (0, 0))
     */
    public get gridCenter(): ReadonlyVector2 {
        return this._gridCenter;
    }

    /**
     * grid center position (default: (0, 0))
     */
    public set gridCenter(value: ReadonlyVector2) {
        (this._gridCenter as WritableVector2).copy(value);
    }

    /**
     * grid cell height (default: 1)
     */
    public get gridCellHeight(): number {
        return this._gridCellHeight;
    }

    /**
     * grid cell height (default: 1)
     */
    public set gridCellHeight(value: number) {
        this._gridCellHeight = value;
    }

    /**
     * grid cell width (default: 1)
     */
    public get gridCellWidth(): number {
        return this._gridCellWidth;
    }

    /**
     * grid cell width (default: 1)
     */
    public set gridCellWidth(value: number) {
        this._gridCellWidth = value;
    }

    /**
     * initial grid position (default: (0, 0))
     * 
     * this option is valid only when evaluated before PlayerGridMovementController.start()
     */
    public set initPosition(value: ReadonlyVector2) {
        (this._initPosition as WritableVector2).copy(value);
    }

    /**
     * grid pointer for pathfinding (default: null)
     */
    public set gridPointer(value: GridPointer|null) {
        if (this._gridPointer) {
            this._gridPointer.onPointerDown.removeListener(this.onPointerDown);
        }
        this._gridPointer = value;
        if (this._gridPointer) {
            this._gridPointer.onPointerDown.addListener(this.onPointerDown);
        }
    }

    /**
     * grid pointer for pathfinding (default: null)
     */
    public get gridPointer(): GridPointer|null {
        return this._gridPointer;
    }

    /**
     * add collide map for collision detection
     * @param collideMap 
     */
    public addCollideMap(collideMap: IGridCollidable): void {
        this._collideMaps.push(collideMap);
        this._pathfinder?.addCollideMap(collideMap);
    }

    /**
     * remove collide map for collision detection
     */
    public removeCollideMap(collideMap: IGridCollidable): void {
        const index = this._collideMaps.indexOf(collideMap);
        if (index >= 0) {
            this._collideMaps.splice(index, 1);
            this._pathfinder?.removeCollideMap(collideMap);
        }
    }

    /**
     * remove all collide maps for collision detection
     */
    public removeAllCollideMaps(): void {
        this._collideMaps.length = 0;
        this._pathfinder?.removeAllCollideMaps();
    }

    /**
     * set grid cell size and grid center position from grid collide map
     * @param collideMap
     */
    public setGridInfoFromCollideMap(collideMap: IGridCollidable): void {
        this._gridCellWidth = collideMap.gridCellWidth;
        this._gridCellHeight = collideMap.gridCellHeight;
        this._gridCenter.set(collideMap.gridCenterX, collideMap.gridCenterY);
    }

    /**
     * position in grid coordinate(integer value)
     */
    public get positionInGrid(): Vector2 {
        return new Vector2(
            Math.floor((this.transform.localPosition.x - this._gridCenter.x) / this._gridCellWidth),
            Math.floor((this.transform.localPosition.y - this._gridCenter.y) / this._gridCellHeight)
        );
    }

    /**
     * receive keyboard input (default: true)
     * 
     * if set true, this object will receive keyboard w, a, s, d, arrow up, arrow down, arrow left, arrow right input
     */
    public get receiveKeyboardInput(): boolean {
        return this._receiveKeyboardInput;
    }

    /**
     * receive keyboard input (default: true)
     * 
     * if set true, this object will receive keyboard w, a, s, d, arrow up, arrow down, arrow left, arrow right input
     */
    public set receiveKeyboardInput(value: boolean) {
        this._receiveKeyboardInput = value;
    }
}
