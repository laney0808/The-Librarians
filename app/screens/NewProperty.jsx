import { useState } from "react";
import { View, /*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { useRouter} from "expo-router";
import Property from "../src/database/Property";
import Manager from "../src/database/Manager";
//import * as ImagePicker from 'expo-image-picker';


export default function NewProperty() {
    const [title, setTitle] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleSubmit = async () => {
        setErrMsg('');
        if (title === '') {
            setErrMsg('title cannot be empty')
            return;
        }
        setLoading(true);
        try{
            const newProperty = Manager.addBaseProp(title, user.id);
            const json = JSON.stringify(newProperty, null, null);
            const {error} = await supabase.from('properties').insert({ title: title, user_id: user.id, json: json}).select().single();
            //insert new property in the data base 
            if (error) {
                setErrMsg(error.message);
                console.log(error);
                setLoading(false);
                return;
            }
        }catch(error){
            setErrMsg(error.message);
            console.log(error);
            setLoading(false);
            return;
        }
        

        // newProperty.setState({
        //     title: title
        // });

       

        setLoading(false);
        setTitle('');
        setErrMsg('submitted successfully');
    }

    return <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Title: </Text>
        <TextInput value={title} onChangeText={setTitle} />
        {errMsg !== '' && <Text>{errMsg}</Text>}
        <Button onPress={handleSubmit}>Submit</Button>
        {loading && <ActivityIndicator />}
    </View>;
}