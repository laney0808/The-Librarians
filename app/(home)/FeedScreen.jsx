import React from 'react';
import { View, Text, FlatList, Button, Pressable, Modal} from 'react-native';
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import EditPage from '../screens/EditPage';

export default function HomeScreen() {
    const [contents, setContents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);//pull to refresh
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    async function fetchContents() {
        setRefreshing(true);
        let { data } = await supabase.from('contents').select('*');
        setRefreshing(false);
        setContents(data);
    }

    useEffect(() => {
        fetchContents();
    }, []);

    useEffect(() => {
        if (refreshing) {
            fetchContents();
            setRefreshing(false);
        }
    }, [refreshing]);

    const openEditModal = (item) => {
      setModalVisible(true);
      setSelectedItem(item);
      console.log('set modal visible')
    }

    const closeEditModal = () => {
      setModalVisible(false);
      setSelectedItem(null);
    }

    const handleSave = async (newTitle, newLink, newTags) => {
      console.log("saving!")
      
      const { error1 } = await supabase
      .from('contents')
      .update({ title: newTitle })
      .eq('id', selectedItem.id)
      .select()

      const { error2 } = await supabase
      .from('contents')
      .update({ link: newLink })
      .eq('id', selectedItem.id)
      .select()

      //TODO: json stringyfy new tags

      const tags = JSON.stringify(newTags);

      const { error3 } = await supabase
      .from('contents')
      .update({ tags: tags })
      .eq('id', selectedItem.id)
      .select()

      if (error1) {
        console.log(error1);
      }
      if (error2) {
        console.log(error2);
      }
      setModalVisible(false);
      setSelectedItem(null);
      fetchContents();
    }

    const renderEditPage = () => {
      if(!modalVisible||!selectedItem){
        return null;
      }
      return (
        <Modal 
        visible = {modalVisible} 
        animationType='slide' 
        transparent={true} 
        onRequestClose={closeEditModal}>
          <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'gray' }}>
                <EditPage item = {selectedItem} onSave={handleSave} onCancel={closeEditModal}/>
            </View>
        </Modal>
      )
    }

    async function deleteContent(id) {
      const { error } = await supabase
      .from('contents')
      .delete()
      .eq('id', id);
      if(error){
        console.log(error)
        return;
      }
      console.log('successfully removed id ' + id);
      fetchContents();
    }

    function ContentItem({ item }) {
      //TO DO: handle item press
      const handleLinkPress = () => {
          // const url = content.link;
          // Linking.openURL(url);
          console.log('this log replaces open link')
      }
  
      return (
        <View style={{flexDirection:'row'}}>
          <Pressable style={{width: 200, alignItems:'center', justifyContent:'center'}} onPress={handleLinkPress}>
            <Text>{item.title}</Text>
          </Pressable>
          <Button title='edit' onPress={() => openEditModal(item)}/>
          <Button title='bin' onPress={() => deleteContent(item.id)} color={'red'}/>
        </View>
      )
  }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={contents}
                renderItem = {({item}) => <ContentItem item={item}/>}
                onRefresh={() => setRefreshing(true)}
                refreshing={refreshing}
            />
            {renderEditPage()}
        </View>
    );
}