import { useState } from "react";
import { View, /*Image*/ } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Modal} from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { useRouter} from "expo-router";
import Manager from "../src/database/Manager";
import NewProperty from "../screens/NewProperty";
//import * as ImagePicker from 'expo-image-picker';


export default function NewContent() {
    const [title, setTitle] = useState('');
    const [Msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState(null);
    const { user } = useAuth();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

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
        const content = Manager.addContent(title, link, user.id);
        const json = JSON.stringify(content, null, null);
        const { error } = await supabase.from('contents').insert({ title: title, user_id: user.id, link: link, json: json }).select().single();
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

    const openEditModal = () => {
        setModalVisible(true);
    }

    const closeEditModal = () => {
        setModalVisible(false);
    }

    //Problem: new property page is a small white card with no text or button 

    const renderNewProperty = () => {
        if(!modalVisible){
          return null;
        }
        return (
          <Modal 
          visible = {modalVisible} 
          animationType='slide' 
          transparent={true} 
          onRequestClose={closeEditModal}
          onPress = {closeEditModal}>
            <View style={{alignItems:'center', justifyContent:'center', backgroundColor:'gray'}}>
              <View style={{backgroundColor:'white', width:"80%", alignItems:'center', justifyContent:'space-between', padding:20, borderRadius:10,}}>
              <Text>new property</Text>
              <View style={{height: 500}}>
                <NewProperty/>
              </View>
              <Button style={{backgroundColor:'white',}} title='close' onPress={closeEditModal}>close</Button>
              </View>
            </View>
          </Modal>
        )
    }

    return <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Title: </Text>
        <TextInput value={title} onChangeText={setTitle} />
        <Text>Link: </Text>
        <TextInput value={link} onChangeText={setLink} />
        {Msg !== '' && <Text>{Msg}</Text>}
        <Button onPress={handleSubmit}>Submit</Button>
        {loading && <ActivityIndicator />}
        <Button onPress={openEditModal}>
          Create New Property
        </Button>
        {renderNewProperty()}
    </View>;
}