import { Component } from "../../../engine/hierarchy_object/Component";
import { Collision2D } from "../../../engine/physics/2d/Collision2D";
import { ContactPoint2D } from "../../../engine/physics/2d/ContactPoint2D";

export class CollisionEventTest extends Component {
    private _contactBuffer: ContactPoint2D[] = [];

    public onCollisionEnter2D(collision: Collision2D) {
        let str = 
            "CollisionEventTest.onCollisionEnter2D\n" +
            `a: ${collision.collider.gameObject.name}\n` +
            `b: ${collision.otherCollider.gameObject.name}\n` +
            `a.velocity: ${collision.rigidbody?.velocity.x}, ${collision.rigidbody?.velocity.y}\n` +
            `b.velocity: ${collision.otherRigidbody?.velocity.x}, ${collision.otherRigidbody?.velocity.y}\n` +
            `relativeVelocity: ${collision.relativeVelocity.x}, ${collision.relativeVelocity.y}\n\n`;
        
        const contacts = this._contactBuffer;
        const contactCount = collision.getContacts(contacts);

        for (let i = 0; i < contactCount; ++i) {
            str +=
                `    contact ${i}\n` +
                `    normal: ${contacts[i].normal.x}, ${contacts[i].normal.y}\n` +
                `    point: ${contacts[i].point.x}, ${contacts[i].point.y}\n\n`;
        }

        console.log(str);
    }

    public onCollisionStay2D(collision: Collision2D) {
        console.log(`CollisionEventTest.onCollisionStay2D gameObject: ${this.gameObject.name}`, collision);
    }

    public onCollisionExit2D(collision: Collision2D) {
        console.log(`CollisionEventTest.onCollisionExit2D gameObject: ${this.gameObject.name}`, collision);
    }
}