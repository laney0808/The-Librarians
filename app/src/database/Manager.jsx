// import Property from "./Property";
// import Tag from './Tag';

// export default class Manager {
//   addTag(property, tagName, setState) {
//     const tag = Tag.of(tagName, property);
//     const tags = property.state.tags;
//     tags.set(tagName, tag);
//     setState({ tags });
//   }
// }

import Property from "./Property";
import Tag from './Tag';
import Content from "./Content";

export default class Manager {

  static addBaseProp(propName, user){
    const property = new Property.of(propName);
    return property;
  }

  static addTag(tagName, property, user) {
    const tag = Tag.of(tagName, property);
    property.addTag(tagName, tag);
    return tag;
  }

  static addProperty(propName, tag, user){
    const property = new Property.of(propName, tag);
    tag.addProperty(propName, property);
    return property;
  }

  static addContent(title,link, user){
    const content = new Content.of(title, link, user);
    console.log('content object created');
    return content;
  }

  static fetchTagList(property){
      const tags = property.state.tags;
      return Array.from(tags.values())
  }

  static fetchChildren(tag){
    const children = tag.state.children;
    return Array.from(children.values());
  }

  static fetchContentTags(content){
    const tags = content.state.tags;
    return Array.from(tags.values());
  }
}
