import { useState } from "react";
import { View, /*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { useRouter} from "expo-router";
import Property from "../src/database/Property";
//import * as ImagePicker from 'expo-image-picker';


export default function NewProperty() {
    const [title, setTitle] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleSubmit = async () => {
        setErrMsg('');
        if (title === '') {
            setErrMsg('title cannot be empty')
            return;
        }
        try{
            const newProperty = Property(title);
        }catch(error){
            console.log("unnable to create new property")
        }
        

        // newProperty.setState({
        //     title: title
        // });

        //setJson(JSON.stringify(newProperty));
        setLoading(true);

        try { 
            await supabase.from('properties').insert({ title: title, user_id: user.id}).select().single();
        //insert new property in the data base 
        } catch (error) {
            setLoading(false);
            console.log(error);
            setErrMsg(error.message);
            return;
        }

        setLoading(false);
        router.push('/NewContent'); //send back to new content
    }

    return <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Title: </Text>
        <TextInput value={title} onChangeText={setTitle} />
        {errMsg !== '' && <Text>{errMsg}</Text>}
        <Button onPress={handleSubmit}>Submit</Button>
        {loading && <ActivityIndicator />}
    </View>;
}