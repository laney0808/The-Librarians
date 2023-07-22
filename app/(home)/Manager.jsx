import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can use any icon library you prefer
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

// Sample file data
const files = [
  { id: 1, name: 'File 1', parent: null },
  { id: 2, name: 'File 2', parent: null },
  { id: 3, name: 'File 3', parent: null },
  { id: 4, name: 'File 4', parent: 1 },
  { id: 5, name: 'File 5', parent: 1 },
  { id: 6, name: 'File 6', parent: 2 },
];

const FileManager = () => {
  const [currentDirectory, setCurrentDirectory] = useState(null);//item
  const [currentType, setCurrentType] = useState('property');//property/tag
  const [fileList, setFileList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);//pull to refresh
  const {user} = useAuth();


  useEffect(() => {
    // Fetch the initial file list (root directory)
    fetchFiles(null);//id
  }, []);

  useEffect(() => {
    if (refreshing) {
        fetchFiles(currentDirectory);
        setRefreshing(false);
    }
}, [refreshing]);
//todo: fetchfile is not fetching root level tags
  const fetchFiles = async (parentDir) => { //id
    // API call to fetch files for the given parent ID
    setRefreshing(true);
    if (currentType == 'property'){
        let { data: filteredItems, error1 } = await supabase
        .from('Tags')
        .select("*")
        .eq('parent', null);
        setRefreshing(false);
        setFileList(filteredItems);
    } else {
        let { data: filteredItems, error2 } = await supabase
        .from('properties')
        .select("*")
        .eq('parent', parentDir);
        setRefreshing(false);
        setFileList(filteredItems);
    }
  };

  const handleDirectoryClick = (file) => {
    //determine whether the next layer is prop or tag
    setCurrentType (currentType == 'property'? 'tag' : 'property');
    setCurrentDirectory(file);
    fetchFiles(file.id);
  };

  const handleBackClick = async () => {
    setRefreshing(true);
    if (currentDirectory) {
      if (currentType == 'property'){
        let {data: parentTag, error} = await supabase
        .from('Tags')
        .select("*")
        .eq('id', currentDirectory.parent);
        setRefreshing(false);
        if (error) {
          console.log(error.message);
        } else {
          setCurrentType('tag');
          setCurrentDirectory(parentTag);
        }
      } else {
        if(currentDirectory.parent){
          let {data: parentProp, error} = await supabase
          .from('properties')
          .select("*")
          .eq('id', currentDirectory.parent);
          setRefreshing(false);
          if (error) {
            console.log(error.message);
          } else {
            setCurrentType('properties');
            setCurrentDirectory(parentProp);
          }
        }
      }
      fetchFiles(currentDirectory);
    }
  };

  const handleAddClick = async () => {
    // Implement your logic for adding a new file
    console.log('Add button clicked');
    setRefreshing(true);
    if (currentType == 'tag'){
      const { error } = await supabase
      .from('properties')
      .insert([
        { title: 'new tag', user_id: user.id, parent: currentDirectory.parent},
      ])
      .select()
   } else {
      if (currentDirectory){
        const { error } = await supabase
        .from('Tags')
        .insert([
          { title: 'new tag', user_id: user.id, parent: currentDirectory.parent},
        ])
        .select()
      } else {
        const { error } = await supabase
        .from('Tags')
        .insert([
          { title: 'new tag', user_id: user.id},
        ])
        .select()
      }
      
   }
   setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.fileItem} onPress={() => handleDirectoryClick(item)}>
      <FontAwesome name="file" size={24} color="black" style={styles.fileIcon} />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.breadcrumb}>
        {currentDirectory && (
          <TouchableOpacity onPress={handleBackClick} style={styles.breadcrumbItem}>
            <FontAwesome name="arrow-left" size={18} color="black" />
          </TouchableOpacity>
        )}
        <Text>{currentDirectory ? currentDirectory.name : 'Root'}</Text>
      </View>
      <FlatList
        data={fileList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.fileList}
        onRefresh={() => setRefreshing(true)}
        refreshing={refreshing} 
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddClick}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  breadcrumbItem: {
    marginRight: 8,
  },
  fileList: {
    flexGrow: 1,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fileIcon: {
    marginRight: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FileManager;

