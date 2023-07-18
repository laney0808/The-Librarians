import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const TagList = ({ items, handleDelete }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <Pressable style={styles.itemBox} onLongPress={() => handleDelete(item)}>
            <Text style={styles.itemText}>{item}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    width: '25%', // Each item takes up 25% of the container width
    padding: 5,
  },
  itemBox: {
    backgroundColor: '#D7BBF5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemText: {
    color: '#6527BE',
  },
});

export default TagList;
