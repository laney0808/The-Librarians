import Tag from './database/Tag'; // Adjust the relative path based on your project structure
import Property from "./database/Property";
import Manager from "./database/Manager";
import Content from "./database/Content";
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';
import { Man } from '@mui/icons-material';


const test = () => {
    const content1 = Content.of('content1', 'sample link');
    const prop1 = Property.of('prop1');
    const tag1 = Manager.addTag('tag1', prop1);
    const tag2 = Manager.addTag('tag2', prop1);
    const prop2 = Manager.addProperty('prop2', tag1);
    const tag3 = Manager.addTag('tag3', prop2);

    const tags = [tag1, tag3];
    // content1.editTag(tags);
    console.log(Manager.fetchContentTags(content1).toString());
    console.log('test finished');



}

export default test;