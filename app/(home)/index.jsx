import { /*Alert,*/ FlatList, Pressable, View, TextInput, Linking, Button, StyleSheet} from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { /*Checkbox,*/ Text} from 'react-native-paper';
import test from '../src/Test';
import ConditionList from '../src/components/conditionList/ConditionList';
import conditionListST from '../src/components/conditionList/conditionListST';
import Condition from '../src/components/conditionList/condition/Condition';
import { Picker } from '@react-native-picker/picker';
// import { useRouter } from 'expo-router';
// import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

const SearchScreen = () => {
    // const [conditions, setConditions] = useState([new Condition(), new Condition]);
    // const [operator, setOperator] =useState('and');

    // const addCondition = () => {
    //   const newCondition = new Condition();
    //   setConditions([...conditions, newCondition]);
    // };
  
    // const removeCondition = (index) => {
    //   setConditions((prevConditions) => {
    //     const updatedConditions = [...prevConditions];
    //     updatedConditions.splice(index, 1);
    //     return updatedConditions;
    //   });
    // };
  
    // const handleOperatorChange = () => {
    //   if (operator === 'and') {
    //     setOperator('or');
    //     console.log('operator changed to or');
    //   } else {
    //     setOperator('and');
    //     console.log('operator changed to and');
    //   }
  
    // }

    // const renderCondition =({item})  => (
    //   <View style={{flexDirection:'row', height: 40, alignItems:"center"}}>
    //     <Condition condition={item}/>
    //     <View className='btnContainer' style={{height:25, alignSelf:'flex-end'}}>
    //         <Button title='-'onPress={removeCondition}/> 
    //       </View>
    //   </View>
    // )

    return (
      <View style={{justifyContent:'space-between'}}>
        <ConditionList/>
        <Button title='Search' ></Button>
        <Text>date2 must be later than date1; otherwise, an error will log in console</Text>
      </View>
      // <View style={{flexDirection:'column'}}>
      //   <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      //     <Button title="Add Condition" onPress={addCondition} />
      //     <Button title="Operator" onPress={handleOperatorChange}/>
      //     {
      //       (operator === 'and') ? (
      //         <Text style={{backgroundColor:'yellow'}}>and</Text>
      //       ) : (
      //         <Text style={{backgroundColor:'yellow'}}>or</Text>
      //       )
      //     }
      //   </View>
      //     <FlatList 
      //       data={conditions}
      //       renderItem={renderCondition}
      //       style={{}}
      //     />
      // </View>
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