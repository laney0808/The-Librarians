import React, {useEffect, useState} from "react";
import { View, StyleSheet/*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Modal, List} from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { supabase } from "../../lib/supabase";

export default function EditTag({onSave, onCancel}) {
    const [title, setTitle] = useState('');
  
    const handleSave = () => {
        onSave(title);
    }

    const handleCancel = () => {
        onCancel();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 500}}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <TextInput value={title} onChangeText={setTitle} style={{ borderWidth: 1, borderColor: 'purple', marginBottom: 10, width: 300}} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Save" onPress={handleSave}>save</Button>
            <Button title="Cancel" onPress={handleCancel}>cancel</Button>
          </View>
        </View>
      </View>
    )
}

