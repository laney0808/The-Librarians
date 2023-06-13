import { Component } from "react";

class Property extends Component {
    id = '';
    title = 'new Property';
    parent = null;
    state = {};

  constructor(props) {
    super(props);
    this.state = {
      tags: new Map(),
    };
  }

  static of(title, parent) {
    const property = new Property();
    property.title = title.toLowerCase();
    property.parent = parent;
    return property;
  }//is there any situation where i would need this?

  addTag(tagName, tag){
    const tags = this.state.tags;
    tags.set(tagName.toLowerCase(), tag);
    this.state = {tags: tags};
    this.forceUpdate();
  }

  toString(){
    return this.title;
  }

  render() {
    return (
      // Your Property component UI goes here
      <div>
        <h2>{this.state.title}</h2>
        {/* Render other components or display property information */}
      </div>
    );
  }
}

export default Property;
