import { Component } from "react";

class Property extends Component {
    id = '';
    user_id;
    title = 'new Property';
    parent = null; //id

  constructor(props) {
    super(props);
  }

  static of(title, parent, user) {
    const property = new Property();
    property.title = title.toLowerCase();
    property.parent = parent;
    property.user_id = user;
    return property;
  }//is there any situation where i would need this?

  addTag(tagName, tag){
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
