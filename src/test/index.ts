import { Game } from "../engine/Game";
import { TestBootstrapper } from "./TestBootstrapper";
//import { mutIteratableCollectionTest1 } from "./../engine/collection/CollectionTest";

function startTestGame(container: HTMLElement) {
    const game = new Game(container);
    game.run(TestBootstrapper);
    game.inputHandler.startHandleEvents();
}

//mutIteratableCollectionTest1();
startTestGame(document.getElementById("game_view")!);
