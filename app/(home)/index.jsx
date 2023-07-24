import { /*Alert,*/ FlatList, Pressable, View, TextInput, Linking, Button, StyleSheet, Modal} from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { /*Checkbox,*/ Text} from 'react-native-paper';
import test from '../src/Test';
import ConditionList from '../src/components/ConditionList/ConditionList';
import { Picker } from '@react-native-picker/picker';
import SearchResult from '../screens/SearchResult';
import Condition from '../src/components/Condition/Condition';
// import { useRouter } from 'expo-router';
// import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

const SearchScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = async (conditions, operator) => {
    setRefreshing(true);
    let { data } = await supabase.from('contents').select('*');
    setContents(data);
    // if (operator == 'or') {
    //   //use a string builder + reduce() on array to build a condition for each field in such format:
    //   //title: 'title.contains.condition1'
    //   //tag: 'tags.contains.tag1'
    //   //date: ?

    // let string;

    // const { data, error } = await supabase
    // .from('contens')
    // .select('*')
    // .or(string)

    // if (error) {
    //   console.log(error.message);
    //   setRefreshing(false);
    //   return;
    // }

    // setContents(data);
    // setRefreshing(false);

    // } else {
    //   //use a string builder + reduce() on array to build a condition for each field in such format:
    //   //title: '[condition1, condition2, condition3]'
    //   //tag: '[tag1, tag2, tag3]'
    //   //date: ?
    //   const filterTitle = null;
    //   // const filterTags = null;
    //   //TODO complete filter by tag and date
    //   // const filterDate = 1000
    //   // const filterTag = 10000
  
    //   let query = supabase
    //     .from('contents')
    //     .select('*')
  
    //   if (filterTitle)  { query = query.contains('title', filterTitle) }
    //   // if (filterTags)  { query = query.contains('tags', filterTags) }
  
    //   const { data, error } = await query
    //   if (error) {
    //     console.log(error.message);
    //     setRefreshing(false);
    //     return;
    //   }
    //   setContents(data);
      setRefreshing(false);
      setModalVisible(true);
  }

  const closeEditModal = () => {
    setModalVisible(false);
  }

  const renderSearchResult = () => {
    if(!modalVisible){
      return null;
    }
    return (
      <Modal 
      visible = {modalVisible} 
      animationType='slide' 
      transparent={true} 
      onRequestClose={closeEditModal}>
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'gray' }}>
              <SearchResult onSearch={handleSearch} onClose={closeEditModal}/>
          </View>
      </Modal>
    )
  }

    return (
      <View style={{justifyContent:'space-between'}}>
        <ConditionList onSearch={handleSearch}/>
        {/* <Button title='Search' onPress={handleSearch} ></Button> */}
        <Text>date2 must be later than date1; otherwise, an error will log in console</Text>
        {renderSearchResult()}
      </View>
    );
};


export default SearchScreen;


// export default function HomeScreen() {
//     const [contents, setContents] = useState([]);
//     const [refreshing, setRefreshing] = useState(false);//pull to refresh

//     async function fetchContents() {
//         setRefreshing(true);
//         let { data } = await supabase.from('contents').select('*');
//         setRefreshing(false);
//         setContents(data);
//     }

//     useEffect(() => {
//         fetchContents();
//     }, []);

//     useEffect(() => {
//         if (refreshing) {
//             fetchContents();
//             setRefreshing(false);
//         }
//     }, [refreshing]);

//     //TEST BUTTON
//     const handleButtonPress = () => {
//         test();
//     }

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <FlatList
//                 data={contents}
//                 renderItem={({ item }) => <ContentItem content={item} />}
//                 onRefresh={() => setRefreshing(true)}
//                 refreshing={refreshing}
//             />
//             <Button title="Test Run" onPress={handleButtonPress} />
//         </View>
//     );
// }

// function ContentItem({ content }) {
//     //sconst router = useRouter();
//     //TO DO: handile item press
//     const handleItemPress = () => {
//         const url = content.link;
//         Linking.openURL(url);
//     }

//     return (
//         <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleItemPress}>
//             <Text>{content.title}</Text>
//         </Pressable>
//     )
// }