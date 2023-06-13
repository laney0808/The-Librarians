import { View } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";
import test from "../src/Test";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async () => {
        setErrMsg('');
        if (email == '') {
            setErrMsg("email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        //wait for auth provider to get back before "loading" is off
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }

    //TEST BUTTON
    const handleButtonPress = () => {
        test();
    }

    return(
     <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Email</Text>
        <TextInput
            autoCapitalize='none'
            textContentType='emailAddress'
            value={email}
            onChangeText={setEmail} />
        <Text>Password</Text>
        <TextInput
            secureTextEntry
            autoCapitalize='none'
            textContentType='password'
            value={password}
            onChangeText={setPassword} />
            <Button onPress={handleSubmit}>Submit</Button>
        {errMsg !== "" && <Text>{errMsg}</Text>}
        {loading && <ActivityIndicator />}
        <Link href="/register"> 
            <Button>Go to register</Button>
        </Link>
        <Button title="Test Run" onPress={handleButtonPress}>Test run</Button>
     </View>
    )
}