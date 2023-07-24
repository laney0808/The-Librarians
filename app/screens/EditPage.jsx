import React, {useEffect, useState} from "react";
import { View, StyleSheet/*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Modal, List} from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { supabase } from "../../lib/supabase";
import TagList from "../src/components/TagList";

export default function EditPage({item, onSave, onCancel}) {
    const [title, setTitle] = useState(item.title);
    const [link, setLink] = useState(item.link);
    const itemTags = JSON.parse(item.tags);
    console.log(itemTags);
    const [tags, setTags] = useState(itemTags);
    
    const handleDelTag = (deleteTag) => {
      const newTags = tags.filter((tag)=> tag!==deleteTag);
      setTags(newTags);
      console.log("deleted!")
      return;
    }

    const handleSave = () => {
        onSave(title, link, tags);
    }

    const handleCancel = () => {
        onCancel();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 500}}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 400 }}>
          <TextInput value={title} onChangeText={setTitle} style={{ borderWidth: 1, borderColor: 'purple', marginBottom: 10, width: 300}} />
          <TextInput value={link} onChangeText={setLink} style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} />
          <TagList items={tags} handleDelete={handleDelTag}/>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Save" onPress={handleSave}>save</Button>
            <Button title="Cancel" onPress={handleCancel}>cancel</Button>
          </View>
        </View>
      </View>
    )
}

