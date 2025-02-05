import { Time } from "../time/Time";
import { Coroutine } from "./Coroutine";
import { WaitForEndOfFrame, WaitForSeconds, WaitUntil, WaitWhile } from "./YieldInstruction";

/** @internal */
export class CoroutineProcessor {
    private readonly _time: Time;
    private readonly _coroutines: (Coroutine|null)[];
    private _coroutineCount: number;

    private static readonly _needToCompactCount = 16;

    public constructor(time: Time) {
        this._time = time;
        this._coroutines = [];
        this._coroutineCount = 0;
    }

    public addCoroutine(coroutine: Coroutine): void {
        this._coroutines.push(coroutine);
        this._coroutineCount += 1;
    }

    public removeCoroutine(coroutine: Coroutine): void {
        const index = this._coroutines.indexOf(coroutine);
        if (index >= 0) {
            this._coroutines[index] = null;
            this._coroutineCount -= 1;
        }
    }

    public tryCompact(): void {
        const coroutines = this._coroutines;
        if (CoroutineProcessor._needToCompactCount <= coroutines.length - this._coroutineCount) {
            let insertPosition = 0;
            for (let i = 0; i < coroutines.length; ++i) {
                const coroutine = coroutines[i];
                if (coroutine === null) continue;
                coroutines[insertPosition] = coroutine;
                insertPosition += 1;
            }
            coroutines.length = this._coroutineCount;
        }
    }

    public updateAfterProcess(): void {
        const coroutines = this._coroutines;
        for (let i = 0; i < coroutines.length; ++i) {
            const coroutine = coroutines[i];
            if (coroutine === null) continue;

            if (coroutine.currentYieldInstructionExist) {
                this.updateAfterProcessSingleInstruction(coroutine);
            } else {
                coroutines[i] = null;
                this._coroutineCount -= 1;
            }
        }
    }

    private updateAfterProcessSingleInstruction(coroutine: Coroutine): void {
        const currentYieldInstruction = coroutine.currentYieldInstruction;
        if (currentYieldInstruction instanceof WaitForSeconds) {
            coroutine.elapsedTime += this._time.deltaTime;
            if (coroutine.elapsedTime >= currentYieldInstruction.seconds) {
                coroutine.elapsedTime = 0;
                coroutine.fatchNextInstruction();
            }
        } else if (currentYieldInstruction instanceof WaitUntil) {
            if (currentYieldInstruction.predicate()) {
                coroutine.fatchNextInstruction();
            }
        } else if (currentYieldInstruction instanceof WaitWhile) {
            if (!currentYieldInstruction.predicate()) {
                coroutine.fatchNextInstruction();
            }
        } else if (currentYieldInstruction === null) {
            coroutine.fatchNextInstruction();
        }
    }

    public endFrameAfterProcess(): void {
        const coroutines = this._coroutines;
        for (let i = 0; i < coroutines.length; ++i) {
            const coroutine = coroutines[i];
            if (coroutine === null) continue;

            if (coroutine.currentYieldInstructionExist) {
                this.endFrameAfterProcessSingleInstruction(coroutine);
            } else {
                coroutines[i] = null;
                this._coroutineCount -= 1;
            }
        }
    }

    private endFrameAfterProcessSingleInstruction(coroutine: Coroutine): void {
        const currentYieldInstruction = coroutine.currentYieldInstruction;
        if (currentYieldInstruction instanceof WaitForEndOfFrame) {
            coroutine.fatchNextInstruction();
        }
    }
}
