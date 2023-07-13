import React, {useEffect, useState} from "react";
import { View, StyleSheet/*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Modal, List} from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { supabase } from "../../lib/supabase";
import TagList from "../src/components/TagList";

export default function EditPage({item, onSave, onCancel}) {
    const [title, setTitle] = useState(item.title);
    const [link, setLink] = useState(item.link);
    const [tags, setTags] = useState(['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']);

    const handleSave = () => {
        onSave(title, link, tags);
    }

    const handleCancel = () => {
        onCancel();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <TextInput value={title} onChangeText={setTitle} style={{ borderWidth: 1, borderColor: 'purple', marginBottom: 10 }} />
          <TextInput value={link} onChangeText={setLink} style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} />
          <TagList items={tags}/>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Save" onPress={handleSave}>save</Button>
            <Button title="Cancel" onPress={handleCancel}>cancel</Button>
          </View>
        </View>
      </View>
    )
}

