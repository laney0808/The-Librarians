import React, {useEffect, useState} from "react";
import { View, /*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Modal, List} from "react-native-paper";
import { useAuth } from "../../contexts/auth";
import { supabase } from "../../lib/supabase";
import Manager from '../src/database/Manager';
import SelectTags from "./SelectTags";
import Content from "../src/database/Content";

export default function EditPage({item}) {
    const [activeProperty, setActiveProperty] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);
    const title = item.title;

    const parsedItem = JSON.parse(item.json);
    const content = new Content.of(title);
    Object.assign(content, parsedItem);
    content.state.tags = new Map(parsedItem.state.tags);

    const test = () => {
        console.log(content.state.tags.toString());
    }
    const user = useAuth();

    const handleExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <View>
            <Text style={{fontSize:20}}>{title}</Text>
            <Button title={'test'} onPress={test}>test</Button>
        </View>
    )
}