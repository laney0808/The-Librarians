import Tag from "./Tag";
import Property from "./Property";
import Manager from "./Manager";

const test = () => {
    const prop1 = Property.of('prop1');
    Manager.addTag('tag1', prop1);
    Manager.addTag('tag2', prop1);
    Manager.addTag('tag3', prop1);
    const tags = Manager.fetchTagList(prop1);
    console.log(tags.toString());//error: prints "prop1tag1" instead of 'tag1'
    console.log('run test finished');
}

export default test;