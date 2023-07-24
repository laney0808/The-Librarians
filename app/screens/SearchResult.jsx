import { View, Text, FlatList, Button, Pressable, Modal} from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SearchResult({filteredItems, onClose}) {
    const [refreshing, setRefreshing] = useState(false);
    console.log('Filtered Items:', filteredItems)

    function ContentItem({ item }) {
        //TO DO: handle item press - implement open link
        const handleLinkPress = () => {
            // const url = content.link;
            // Linking.openURL(url);
            console.log('this log replaces open link')
        }
    //TODO: edit and delete in search result
        return (
          <View>
            <Pressable onPress={handleLinkPress}>
              <Text>{item.title}</Text>
            </Pressable>
            {/* <Button title='edit' onPress={() => openEditModal(item)}/>
            <Button title='bin' onPress={() => deleteContent(item.id)} color={'red'}/> */}
          </View>
        )
    }
    
    const handleClose = () => {
        onClose();
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <View style={{ backgroundColor: 'white', padding: 150, borderRadius: 10 }}>
                <FlatList
                    data={filteredItems}
                    renderItem = {({item}) => <ContentItem item={item}/>}
                    keyExtractor={(item) => item.id.toString()} // Add keyExtractor to avoid warning
                    contentContainerStyle={{ flexGrow: 1 }} 
                />    
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button title="Close" onPress={handleClose}>cancel</Button>
                </View>
            </View>
          </View>
    );
}