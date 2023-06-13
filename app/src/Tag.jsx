import { Component } from 'react';
import Property from './Property';

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
    tag.title = title;
    tag.property = property;
    tag.parent = property.parent;
    return tag;
  }

  rename(title){
    this.title = title;
    this.forceUpdate();
  }

  addProperty(propName, property){
    const children = this.state.children;
    children.set(propName, property);
    this.state = {children: children};
  }

  toString() {
    return this.title;
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
