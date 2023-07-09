import { Component } from 'react';
import { Text, View } from 'react-native';
import { supabase } from '../../../lib/supabase';

class Content extends Component {
    id = '';
    user_id = '';
    title = '';
    link = '';
    tags = [];
    publishedDate = 0;

  constructor(props) {
    super(props);
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
    this.tags = tags;
  }

  hasTag(key) {//fullName
    const tags = this.tags;
    return tags.includes(key);
  }

  toString(){
    return this.title;
  }

  render() {
    const { title } = this.title;
    return (
      <View>
        <Text>Title: {title}</Text>
        {/* Render other components or display content information */}
      </View>
    );
  }
}

export default Content;
