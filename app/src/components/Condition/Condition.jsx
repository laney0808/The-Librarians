import { Component } from "react";
import {
  View,
  Button,
  Platform,
  TextInput,
  StyleSheet,
  Text
} from "react-native";
import { DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import {Picker} from "@react-native-picker/picker";
import conditionST from './ConditionST'

class Condition extends Component {
  static Type = {
    Title: "title",
    Tags: "tags",
    Date: "date"
  };

  static Modifier1 = {
    Contain: "contain",
    NotContain: "notContain"
  };

  static Modifier2 = {
    From: "from",
    Until: "until",
    Within: "within"
  };

  constructor() {
    super();
    this.state = {
      type: Condition.Type.Title,
      modifier1: Condition.Modifier1.Contain,
      modifier2: Condition.Modifier2.From,
      textInput: "",
      tagsInput: [],
      dateInput: new Date(),
      dateInput2: new Date(),
      errMsg: ''
    };
    this.setModifier= this.setModifier.bind(this)
  }

  setType(typeString) {
    const typeMap = {
      title: Condition.Type.Title,
      tags: Condition.Type.Tags,
      date: Condition.Type.Date
    };

    if (typeMap.hasOwnProperty(typeString)) {
      const newType = typeMap[typeString];
      this.setState({type: newType }, () => console.log('set type ' + this.state.type));
    } else {
      // Handle invalid type
      console.error(`Invalid type: ${typeString}`);
    }
  }

  setModifier(value) {
    const modifierMap = {
      contain: Condition.Modifier1.Contain,
      notContain: Condition.Modifier1.NotContain,
      from: Condition.Modifier2.From,
      until: Condition.Modifier2.Until,
      within: Condition.Modifier2.Within
    };
    if (modifierMap.hasOwnProperty(value)) {
      const modifier = modifierMap[value];
      switch (this.state.type) {
        case Condition.Type.Title:
          if (Object.values(Condition.Modifier1).includes(modifier)) {
            this.setState({ modifier1: value }, () => console.log('set modifier ' + this.state.modifier1));
          } else {
            console.error(`Invalid modifier: ${value}`);
          }
          break;
        case Condition.Type.Tags:
          if (Object.values(Condition.Modifier1).includes(modifier)) {
            this.setState({ modifier1: value }, () => console.log('set modifier ' + this.state.modifier1));
          } else {
            console.error(`Invalid modifier: ${value}`);
          }
          //repeated code: same as title
          break;
        case Condition.Type.Date:
          if (Object.values(Condition.Modifier2).includes(modifier)) {
            this.setState({ modifier2: value }, () => console.log('set modifier ' + this.state.modifier2));
            
          } else {
            console.error(`Invalid modifier: ${value}`);
          }
          break;
        default:
          console.error(`Invalid type:` + this.state.type);
          break;
      }
    }
  }

  setInput = (value) => {
    switch (this.state.type) {
      case Condition.Type.Title:
        if (typeof value === "string") {
          this.setState({ textInput: value }, () => console.log('change text input'));
          
        } else {
          console.error(
            "invalid input: type is " + typeof value + ", should be string"
          );
        }
        break;
      case Condition.Type.Tags:
        if (Array.isArray(value)) {
          this.setState({ tagsInput: value }, () => console.log('change tag input'));
          
        } else {
          console.error(
            "invalid input: type is " + typeof value + ", should be array"
          );
        }
        break;
      case Condition.Type.Date:
        if (value instanceof Date) {
          this.setState({ dateInput: value }, () => console.log('set date1 to ' + this.state.dateInput));
          
        } else {
          console.error(
            "invalid input: type is " + typeof value + ", should be date"
          );
        }
        break;
      default:
        console.error(`Invalid type:` + this.state.type);
        break;
    }
  }

  setDate2(value){
    if (value instanceof Date) {
      if (value < this.state.dateInput){
        this.setState({errMsg: 'end date must be later'}, ()=> console.log('end date error'));
        return;
      }
      this.setState({ dateInput: value, errMsg: ''});
      console.log('set date2 to ' + this.state.dateInput)
    } else {
      console.error(
        "invalid input: type is " + typeof value + ", should be date"
      );
    }
  }

  //TODO string builder for supabase filtering

  toString = () => {
    let condition = '';
    if (this.state.type == Condition.Type.Title){
      condition = 'title.contains.' + '[' + this.state.textInput + 'test' + ']';
    } else if (this.state.type == Condition.Type.Tags){
      condition = 'tags.contains.' + '[' + this.tagsInput + ']';
    } else if (this.state.type == Condition.Type.Date){
      if (this.state.modifier2 == Condition.Modifier2.From){
        condition = 'date.gte.' + this.state.dateInput;
      } else if (this.state.modifier2 == Condition.modifier2.Until){
        condition = 'date.lte.' + this.state.dateInput;
      } else {
        console.log('date-within to be developed');
        condition = 'title.contains.' + '[]';
      }
    }
    return condition;
  }

  printError(){
      return (
        <Text>this.state.errMsg</Text>
      );
  }

  render() {
    const showDatePickerAndroid = async (no) => {
      try {
        DateTimePickerAndroid.open({
          date: this.state.dateInput,
          value: new Date(),
          onChange: (value) => setDate(value["nativeEvent"]["timestamp"]),
        });
        const setDate = (timestamp) => {
          const date = new Date(timestamp);
          if (no === 1){
            this.setInput(date);
          } else {
            this.setDate2(date);
          }
          
        }
        // if (action === DateTimePickerAndroid.dateSetAction) {
        //   const selected = new Date(year, month, day);
        //   this.setInput(selected);
        //   console.log('date selected');
        // }
      } catch (error) {
        console.warn("Error opening date picker: ", error);
      }
    };

    return (
      <View style={conditionST.condition}>
        <View style={conditionST.picker}>
          <Picker
            selectedValue={this.state.type}
            onValueChange={(value)=>this.setType(value)}>
            <Picker.Item label="Title" value="title" />
            <Picker.Item label="Date" value="date" />
            <Picker.Item label="Tags" value="tags" />
          </Picker>
        </View>
        <View style={conditionST.picker}>
        {this.state.type === Condition.Type.Title ||
        this.state.type === Condition.Type.Tags ? (
            <Picker
              selectedValue={this.state.modifier1}
              onValueChange={this.setModifier}>
              <Picker.Item label="Contains" value="contains" />
              <Picker.Item label="Option closed" value="notContain" />
              {/* TODO: "does not contain" needs reconstruction*/}
            </Picker>
        ) : (
            <Picker
              selectedValue={this.state.modifier2}
              onValueChange={this.setModifier}
            >
              <Picker.Item label="From" value="from" />
              <Picker.Item label="Until" value="until" />
              <Picker.Item label="Within" value="within" />
            </Picker>
        )}
        </View>
        <View style={conditionST.input}>
        {this.state.type === Condition.Type.Title ? (
            <TextInput
              value={this.state.textInput}
              onChangeText={this.setInput}
              placeholder="Enter text"
            />
        ) : this.state.type === Condition.Type.Tags ? (
            <TextInput
              placeholder="to be replaced by accordion list"
            />
        ) : (
          <View>
            {this.state.modifier2 === "within" ? (
              <View style={{justifyContent: 'space-around', flexDirection:'row'}}>
                <Button title="date 1" onPress={() => showDatePickerAndroid(1)} />
                <Button title='date 2' onPress={() => showDatePickerAndroid(2)}/>
              </View>
            ) : (
              <Button title="Select Date" onPress={() => showDatePickerAndroid(1)} />
            )}
          </View>
        )}
        </View>
      </View>
    );
  }
}

export default Condition;