import { useState } from "react";
import { View, /*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Modal} from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { useRouter} from "expo-router";
//import * as ImagePicker from 'expo-image-picker';


export default function NewContent() {
    const [title, setTitle] = useState('');
    const [Msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState(null);
    const [source, setSource] = useState(null);
    const [date, setDate] = useState(Date.now());
    const { user } = useAuth();
    const router = useRouter();

    const handleSubmit = async () => {
        setMsg('');
        if (title === '') {
            setMsg('title cannot be empty')
            return;
        }
        if (link === '') {
            setMsg('link cannot be empty')
            return;
        }
        setLoading(true);
        ///////////
        const { error } = await supabase.from('contents').insert({ title: title, user_id: user.id, link: link, source: source, date: date}).select().single();
        //insert new content in the data base 

        if (error != null) { 
            setLoading(false);
            console.log(error);
            setMsg(error.message);
            return;
        }
        ///////////
        // const error = Manager.addContent(title, link, user);
        // console.log('manager run finish')
        // if (error != null){
        //     setLoading(false);
        //     setMsg(error.message);
        //     return;
        // }
        //////
        setLoading(false);
        console.log('set loading')
        setTitle('');
        setLink('');
        console.log('set title and link')
        router.push('./FeedScreen'); //send back to home page
    }

    return <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Title: </Text>
        <TextInput value={title} onChangeText={setTitle} />
        <Text>Link: </Text>
        <TextInput value={link} onChangeText={setLink} />
        <Text>Source:</Text>
        <TextInput value={link} onChangeText={setSource} />
        <Text>Date: date picker to be added</Text>
        {Msg !== '' && <Text>{Msg}</Text>}
        <Button onPress={handleSubmit}>Submit</Button>
        {loading && <ActivityIndicator />}
    </View>;
}