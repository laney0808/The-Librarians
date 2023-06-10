import Tag from "./Tag";
import Property from "./Property";
import Manager from "./Manager";

const test = () => {
    const prop1 = Property.of('prop1');
    console.log(prop1.toString());
    const tag1 = Tag.of('tag1', prop1);
    console.log(tag1.toString());
}

export default test;