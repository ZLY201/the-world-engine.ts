import { Euler, Vector3 } from "three";

export type ReadOnlyEuler = {
    /**
     * @default 0
     */
    readonly x: number;

    /**
     * @default 0
     */
    readonly y: number;

    /**
     * @default 0
     */
    readonly z: number;

    /**
     * @default THREE.Euler.DefaultOrder
     */
    readonly order: string;
    readonly isEuler: true;

    clone(): Euler;
    equals(euler: ReadOnlyEuler): boolean;
    toArray(array?: number[], offset?: number): number[];
    toVector3(optionalResult?: Vector3): Vector3;
};