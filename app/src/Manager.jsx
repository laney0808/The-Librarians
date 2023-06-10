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
  addTag(property, tagName) {
    const tag = new Tag();
    tag.rename(tagName, property);
    const tags = property.state.tags;
    tags.set(tagName, tag);
    property.setState({ tags });
  }

  addProperty(tag, propName){
    const property = new Property.of(propName);
    const children = tag.state.children;
    children.set(propName, property);
    tag.setState({children});
  }
}
