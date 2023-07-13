import { StyleSheet } from "react-native";

const conditionST = StyleSheet.create({
    condition: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginTop: 10,
        width: 380
    },
    
    picker: {
        flex: 4
    },

    input: {
        flex:6, 
        height: 25, 
        alignSelf:'center'
    },
});

export default conditionST;