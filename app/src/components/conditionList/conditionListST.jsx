import { StyleSheet } from "react-native";

const conditionListST = StyleSheet.create({
    conditionListContainer: {
        flexDirection:'column'
    },

    btnContainer: {
        height:25, 
        alignSelf:'flex-end'
    },

    conditions: {
        flex:9,
        justifyContent: 'flex-start'
    },
    
    conditionContainer: {
        flexDirection:'row', 
        height: 40, 
        alignItems:"center"
    },

    buttons:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center'
    }
    
})

export default conditionListST;

