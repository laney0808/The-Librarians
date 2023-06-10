import { Component } from "react";

class Property extends Component {
    title = '';
  constructor(props) {
    super(props);
    this.state = {
      tags: new Map(),
      parent: null,
    };
  }

  static of(title) {
    const property = new Property();
    property.title = title;
    return property;
  }//is there any situation where i would need this?

  static addProp(title, parent) {
    const property = new Property();
    property.setState({ parent });
    property.title = title;
    return property;
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
