import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import externalStyles from '../style/externalStyle';
export default function AddLocationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Share Your Location</Text>
      </View>
      
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Location..."
          placeholderTextColor="#aaa"
        />
        <FontAwesome name="search" size={20} style={styles.searchIcon} />
      </View>

      <View style={[externalStyles.locationBox, {width:'100%',marginTop:50}]}>
        <Image resizeMode='cover' source={{ uri: 'https://i.sstatic.net/HILmr.png'}} style={{height:400,width:'100%'}}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,

  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    height: 20,
    paddingRight: 40,
    borderColor: 'transparent', 
  },
  searchIcon: {
    position: 'absolute',
    right: 10, 
  },
  image: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },
});
