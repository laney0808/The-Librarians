import { /*Alert,*/ FlatList, Pressable, View, TextInput, Linking, Button, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { /*Checkbox,*/ Text} from 'react-native-paper';
import conditionListST from './ConditionListST';
import Condition from '../Condition/Condition';

const ConditionList= () => {
    const [conditions, setConditions] = useState([new Condition()]);
    const [operator, setOperator] =useState('and');

    const addCondition = () => {
      const newCondition = new Condition();
      setConditions([...conditions, newCondition]);
    };
  
    const removeCondition = (index) => {
      setConditions((prevConditions) => {
        const updatedConditions = [...prevConditions];
        updatedConditions.splice(index, 1);
        return updatedConditions;
      });
    };
  
    const handleOperatorChange = () => {
      if (operator === 'and') {
        setOperator('or');
        console.log('operator changed to or');
      } else {
        setOperator('and');
        console.log('operator changed to and');
      }
  
    }

    const renderCondition =({item})  => (
        <View style={conditionListST.conditionContainer}>
          <Condition condition={item}/>
          <View style={conditionListST.btnContainer}>
              <Button title='-'onPress={removeCondition}/> 
            </View>
        </View>
        //bug: if date2 is later than date1, the error message will only occur in console and not in interface
    )

    return (
      <View style={conditionListST.conditionListContainer}>
        <View style={conditionListST.buttons}>
          <Button title="Add Condition" onPress={addCondition} />
          <Button title="Operator" onPress={handleOperatorChange}/>
          {
            (operator === 'and') ? (
              <Text style={{backgroundColor:'yellow'}}>and</Text>
            ) : (
              <Text style={{backgroundColor:'yellow'}}>or</Text>
            )
          }
        </View>
          <FlatList 
            data={conditions}
            renderItem={renderCondition}
            style={{}}
          />
      </View>
    );
};


export default ConditionList;