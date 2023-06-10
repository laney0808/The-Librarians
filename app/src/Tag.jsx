import { Component } from 'react';
import Property from './Property';

class Tag extends Component {
  title;
  property;

  constructor(props) {
    super(props);
    this.state = {
      children: new Map(),
      property: null,
    };
  }

  static of(title, property) {
    const tag = new Tag();
    tag.init(title, property);
    return tag;
  }

  init(title, property){
    this.title = title;
    this.property = property;
    this.setState((state) => {
      return {property: property};
    });
  }

  toString() {
    const propertyTitle = this.property ? this.property.toString() : 'no';
    return propertyTitle + this.title;
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
