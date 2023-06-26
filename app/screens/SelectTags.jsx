import React, {useState} from "react";
import { FlatList, View, /*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Modal, List} from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { supabase } from "../../lib/supabase";
import Manager from '../src/database/Manager'

export default function SelectTags() {
    const [properties, setProperties] = useState([]);

    const renderProperty = (property) => {
        <List.Accordion title={property.title}>
            <List.Item title='item'></List.Item>
        </List.Accordion>
    }

    return (
        <View>
            <Text>selectTags list</Text>
        </View>
    );
}