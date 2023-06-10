import { /*Alert,*/ FlatList, Pressable, View, Linking, Button } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { /*Checkbox,*/ Text} from 'react-native-paper';
import test from '../src/Test';
// import { useRouter } from 'expo-router';
// import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

export default function HomeScreen() {
    const [contents, setContents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);//pull to refresh

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

    //TEST BUTTON
    const handleButtonPress = () => {
        test();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={contents}
                renderItem={({ item }) => <ContentItem content={item} />}
                onRefresh={() => setRefreshing(true)}
                refreshing={refreshing}
            />
            <Button title="Test Run" onPress={handleButtonPress} />
        </View>
    );
}

function ContentItem({ content }) {
    //sconst router = useRouter();
    //TO DO: handile item press
    const handleItemPress = () => {
        const url = content.link;
        Linking.openURL(url);
    }

    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleItemPress}>
            <Text>{content.title}</Text>
        </Pressable>
    )
}