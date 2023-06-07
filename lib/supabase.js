import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const projectUrl = process.env.SUPABASE_PROJECT_URL;
const projectKey = process.env.SUPABASE_PROJECT_KEY;

export const supabase = createClient(projectUrl, projectKey, {
    auth: {
        storage: AsyncStorage //this is so that the user stays logged in the next time they open the app
    }
});


