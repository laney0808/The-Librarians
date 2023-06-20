import React from 'react';
import { View, Text, FlatList, Button, Pressable, Modal} from 'react-native';
import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

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

    const renderEditModal = () => {
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
            <View style={{backgroundColor:'white', padding:20, borderRadius:10, width:"80%"}}>
            <Text>Edit Page</Text>
            <Button title='close' onPress={closeEditModal}></Button>
            </View>
          </View>
        </Modal>
      )
    }

    // const renderContent = ({item}) => {
    //   return (
    //     <View>
    //       <Text>{item.title}</Text>
    //       {/* <Button title='edit' onPress={() => openEditModal(item)}/> */}
    //     </View>
    //   )
    // }

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
          <Button title='close' onPress={() => closeEditModal(item)}/>
        </View>
      )
  }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={contents}
                // renderItem={({ item }) => <ContentItem content={item} />}
                renderItem = {({item}) => <ContentItem item={item}/>}
                onRefresh={() => setRefreshing(true)}
                refreshing={refreshing}
            />
            {renderEditModal()}
        </View>
    );
}



// const FeedScreen = () => {
//   return (
//     <View>
//       <Text>Feed Screen</Text>
//       {/* Render your list of items */}
//     </View>
//   );
// };

// export default FeedScreen;