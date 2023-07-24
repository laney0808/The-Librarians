import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can use any icon library you prefer
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';
import EditTag from '../screens/EditTag';

const TagManager = () => {
  const [currentDirectory, setCurrentDirectory] = useState(null);//item
  const [currentType, setCurrentType] = useState('property');//property/tag
  const [fileList, setFileList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);//pull to refresh
  const {user} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  //note: we are not allowing edition of tag/prop title after initialization for now


  useEffect(() => {
    // Fetch the initial file list (root directory)
    fetchFiles(0);//id
    setCurrentType('property');
  }, []);

  useEffect(() => {
    if (refreshing) {
        fetchFiles(currentDirectory? currentDirectory.id : 0);
        setRefreshing(false);
    }
}, [refreshing]);
//todo: fetchfile is not fetching root level tags

  const fetchFiles = async (parentDir) => { //id
    // API call to fetch files for the given parent ID
    setRefreshing(true);
    let filteredItems;
    let error;
    if (currentType == 'property'){
        if (parentDir == null) {
          //Fetch root level files where parent is 0 (root)
          let { data, error} = await supabase
          .from('Tags')
          .select("*")
          .eq('parent', 0);
          if (error) {
            console.log(error.message);
          } else {
            filteredItems = data;
          }
        } else {
          let {data, error} = await supabase
          .from('Tags')
          .select('*')
          .eq('parent', parentDir);
          if (error) {
            console.log(error.message);
          } else {
            filteredItems = data;
          }
        }
        
    } else {
        let { data, error } = await supabase
        .from('properties')
        .select("*")
        .eq('parent', parentDir);
        if (error) {
          console.log(error.message);
        } else {
          filteredItems = data;
        }
    }
    setRefreshing(false);
    setFileList(filteredItems || []);
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
        if (currentDirectory.parent == null) {
          setCurrentDirectory(null);
        } else {
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
        }
      } else {
        setCurrentType('property')
        if(currentDirectory.parent != 0){
          let {data: parentProp, error} = await supabase
          .from('properties')
          .select("*")
          .eq('id', currentDirectory.parent);
          setRefreshing(false);
          if (error) {
            console.log(error.message);
          } else {
            setCurrentDirectory(parentProp);
          }
        } else {
          setCurrentDirectory(null);
        }
      }
      fetchFiles(currentDirectory.id);
    }
  };

  const handleAddClick = async () => {
    console.log('Add button clicked');
    openEditModal();
  }

  const handleSave = async (newTitle) => {
    console.log('saving!');
    setRefreshing(true);
    //Consider different current type
    if (currentType == 'tag'){
      const { error } = await supabase
      .from('properties')
      .insert([
        { title: newTitle, user_id: user.id, parent: currentDirectory.id},
      ])
      .select()
   } else {
      if (currentDirectory){
        const { error } = await supabase
        .from('Tags')
        .insert([
          { title: newTitle, user_id: user.id, parent: currentDirectory.id},
        ])
        .select()
      } else {
        const { error } = await supabase
        .from('Tags')
        .insert([
          { title: newTitle, user_id: user.id, parent: 0},
        ])
        .select()
      }
   }
   setRefreshing(false);
   setModalVisible(false);
  };
//TODO
  const openEditModal = () => {
    setModalVisible(true);
    console.log('set modal visible')
  }

  const closeEditModal = () => {
    setModalVisible(false);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.fileItem} onPress={() => handleDirectoryClick(item)}>
      <FontAwesome name="file" size={24} color="black" style={styles.fileIcon} />
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
//TODO: render edit pages for tag and prop respectively
  const renderEditTag = () => {
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
              <EditTag onSave={handleSave} onCancel={closeEditModal}/>
          </View>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.breadcrumb}>
        {currentDirectory && (
          <TouchableOpacity onPress={handleBackClick} style={styles.breadcrumbItem}>
            <FontAwesome name="arrow-left" size={18} color="black" />
          </TouchableOpacity>
        )}
        <Text>{currentDirectory ? currentDirectory.title : 'Root'}</Text>
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
      {renderEditTag()}
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

export default TagManager;

