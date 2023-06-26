import { Component } from 'react';
import { Text, View } from 'react-native';

class Content extends Component {
    id = '';
    user_id = '';
    title = '';
    link = '';
    state = {};

  constructor(props) {
    super(props);
    this.state = {
      tags: new Map(),
      publishedDate: new Date()
    };
  }

  static of(title, link, user) {
    const content = new Content();
    content.title = title.toLowerCase();
    content.link = link;
    content.user_id = user;
    return content;
  }

  rename(title){
    this.title = title.toLowerCase();
  }

  //ERROR: does not work using setState()
  editTag(tags) {//in map
    //for this map, key is the fullName of the tag
    this.state = {tags};
    this.forceUpdate();
  }

  hasTag(key) {//fullName
    const tags = this.state.tags;
    return tags.has(key);
  }

  fetchContentTag(){
    const tags = this.state.tags;
    return Array.from(tags.values());
  }

  toString(){
    return this.title + ' renewed';
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
