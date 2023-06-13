import Tag from "./Tag";
import Property from "./Property";
import Manager from "./Manager";
import Content from "./Content";

const test = () => {
    const prop1 = Property.of('prop1');
    const tag1 = Manager.addTag('tag1', prop1);
    Manager.addTag('tag2', prop1);
    Manager.addTag('tag3', prop1);
    const prop2 = Manager.addProperty('prop2', tag1);
    const tag4 = Manager.addTag('tag4', prop2);
    const content1 = Content.of('content1', 'www.sample.link')
    const tags = new Map();
    tags.set(tag4.fullName(), tag4);//this is fine
    tags.set(tag1.fullName(), tag1);
    content1.editTag(tags);//problem is here

    console.log(tag1.fullName());
    console.log(tag4.fullName());
    console.log(content1.hasTag('tag1/tag4'));
    console.log('run test finished');
}

export default test;