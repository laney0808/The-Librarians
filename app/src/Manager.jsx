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

export default class Manager {
  static addTag(tagName, property) {
    const tag = Tag.of(tagName, property);
    property.addTag(tagName, tag);
    return tag;
  }

  static addProperty(propName, tag){
    const property = new Property.of(propName, tag);
    tag.addProperty(propName, property);
    return property;
  }

  static fetchTagList(property){
      const tags = property.state.tags;
      return Array.from(tags.values())
  }

  static fetchChildren(tag){
    const children = tag.state.children;
    return Array.from(children.values());
  }
}
