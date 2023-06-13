import Property from "./Property";
import Tag from "./Tag";
import { Component } from 'react';
import { Text, View } from 'react-native';

class Content extends Component {
    id = '';
    title = '';
    user_id = '';
  constructor(props) {
    super(props);
    this.state = {
      tags: new Map(),
      publishedDate: new Date()
    };
  }

  addTag(tag) {
    const { tags } = this.state;
    tags.set(tag.title, tag);
    this.setState({ tags });
  }

  showProps() {
    const { tags } = this.state;

    // Filter and display properties
    const properties = Array.from(tags.values()).filter(property => (!property.parent)||this.state.tags.has(property.parent.title));
    console.log(properties);
  }

  toString(){
    return this.content 
  }

  render() {
    const { title } = this.state;
    return (
      <View>
        <Text>Title: {title}</Text>
        {/* Render other components or display content information */}
      </View>
    );
  }
}

export default Content;
