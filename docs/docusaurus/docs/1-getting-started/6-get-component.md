# Get Component

Let's look at how to get a Component or GameObject from a Component.

## method1: this.gameObject.getComponent()

You can use `getComponent()` to get a Components which is attached to a GameObject.

```typescript
import { Component, CssSpriteRenderer } from "the-world-engine";

export class GetComponentTest extends Component {
    private _sprite: CssSpriteRenderer|null = null;

    public awake(): void {
        this._sprite = this.gameObject.getComponent(CssSpriteRenderer);
    }
}
```

you can also use `getComponents()` to get all Components which are attached to a GameObject.
and you can use `getComponentsInChildren()` to get a Component which is attached to a GameObject or its children.
```typescript
import { Component, CssSpriteRenderer } from "the-world-engine";

export class GetComponentTest extends Component {
    public awake(): void {
        const components = this.gameObject.getComponents();
        const component = this.gameObject.getComponentInChildren(CssSpriteRenderer);
        const componentsInChildren = this.gameObject.getComponentsInChildren(CssSpriteRenderer);
    }
}
```

## method2: inject from builder

This is how the component injects the dependency into the component rather than importing it.

This method is similar to unity Game Engine's Inspector Drag and Drop

```typescript
import { Component, Bootstrapper as BaseBootstrapper, SceneBuilder, PrefabRef, Camera } from "the-world-engine";

class Component1 extends Component {
    public _component2: Component2|null = null;

    public awake(): void {
        this._component2!.sayHello();
    }
}

class Component2 extends Component {
    public sayHello(): void {
        console.log("Hello");
    }
}

export class Bootstrapper extends BaseBootstrapper {
    public override run(): SceneBuilder {
        
        const instantiater = this.instantiater;
        const component2 = new PrefabRef<Component2>(); // create a prefab ref

        return this.sceneBuilder
            .withChild(instantiater.buildGameObject("camera")
                .withComponent(Camera))

            .withChild(instantiater.buildGameObject("gameObject1")
                .withComponent(Component1, c => {
                    c._component2 = component2.ref!; // inject the dependency
                }))

            .withChild(instantiater.buildGameObject("gameObject2")
                .withComponent(Component2)
                .getComponent(Component2, component2)) // set the prefab ref
        ;
    }
}
```

:::note
Component initialize functions(c => { }) run after the scene is built.
Because of this, it is possible to inject regardless of the initialization order between components

In this example, even though the `.getComponent(Component2, component2))` code is at the bottom of `c._component2 = component2.ref!;`, it works fine
:::

You can also inject GameObjects

```typescript
import { Component, Bootstrapper as BaseBootstrapper, SceneBuilder, PrefabRef, Camera, GameObject } from "the-world-engine";

class Component3 extends Component {
    public player: GameObject|null = null;

    public awake(): void {
        this.player!.transform.position.set(0, 0, 0);
    }
}

export class Bootstrapper extends BaseBootstrapper {
    public override run(): SceneBuilder {
        
        const instantiater = this.instantiater;
        const player = new PrefabRef<GameObject>(); // create a prefab ref

        return this.sceneBuilder
            .withChild(instantiater.buildGameObject("camera")
                .withComponent(Camera))

            .withChild(instantiater.buildGameObject("player")
                .getGameObject(player)) // set the prefab ref

            .withChild(instantiater.buildGameObject("gameObject1")
                .withComponent(Component3, c => {
                    c.player = player.ref!; // inject the dependency
                }))
        ;
    }
}
```

Depending on the situation, you choose the proper method.
