import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TagList = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
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
