import { useState } from "react";
import { View, /*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { useRouter} from "expo-router";
//import * as ImagePicker from 'expo-image-picker';


export default function NewContent() {
    const [title, setTitle] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState(null);
    const { user } = useAuth();
    const router = useRouter();

    const handleSubmit = async () => {
        setErrMsg('');
        if (title === '') {
            setErrMsg('title cannot be empty')
            return;
        }
        if (link === '') {
            setErrMsg('link cannot be empty')
            return;
        }
        setLoading(true);
        const { error } = await supabase.from('contents').insert({ title: title, user_id: user.id, link: link ``}).select().single();
        //insert new todo in the data base 

        if (error != null) { 
            setLoading(false);
            console.log(error);
            setErrMsg(error.message);
            return;
        }
        setLoading(false);
        router.push('/'); //send back to home page
    }

    return <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Title: </Text>
        <TextInput value={title} onChangeText={setTitle} />
        <Text>Link: </Text>
        <TextInput value={link} onChangeText={setLink} />
        {errMsg !== '' && <Text>{errMsg}</Text>}
        <Button onPress={handleSubmit}>Submit</Button>
        {loading && <ActivityIndicator />}
    </View>;
}