import { Component } from 'react';

class Tag extends Component {
  id;
  title = 'new tag';
  property;
  parent = null;
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      children: new Map(),
    };
  }

  static of(title, property) {
    const tag = new Tag();
    tag.title = title.toLowerCase();
    tag.property = property;
    tag.parent = property.parent;
    tag.forceUpdate();
    return tag;
  }

  rename(title){
    this.title = title.toLowerCase();
    this.forceUpdate();
  }

  addProperty(propName, property){
    const children = this.state.children;
    children.set(propName.toLowerCase(), property);
    this.state = {children: children};
    this.forceUpdate();
  }

  toString() {
    return this.title;
  }

  fullName(){
    if (this.parent != null) {
      const prefix = this.parent.fullName();
      return prefix + '/' + this.title;
    } else {
      return this.title;
    }
  }

  render() {
    return (
      // Your Tag component UI goes here
      <div>
        <h2>{this.state.title}</h2>
        {/* Render other components or display tag information */}
      </div>
    );
  }
}

export default Tag;
