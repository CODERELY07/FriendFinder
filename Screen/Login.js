import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function Login({navigation}) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleContinue = () => {
   
  };
  

  const renderIndicators = () => {
    return [0, 1, 2].map((index) => (
      <View
        key={index}
        style={[
          styles.circle,
          currentPage === index ? styles.activeCircle : styles.inactiveCircle,
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome{"\n"}FriendFinder</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={require('./../assets/images/first.jpg')} />
      </View>
      <Text style={[styles.description, styles.big]}>
        <Text style={styles.highlight}>Experience </Text>
        a fresh approach to 
        <Text style={styles.highlight}> friendship!</Text>
      </Text>
      <Text style={[styles.description, styles.para]}>
        Our app unites you with like-minded individuals in your area, making meaningful connections effortless.
      </Text>
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.indicatorContainer}>
        {renderIndicators()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:120,
    padding: 20,
    backgroundColor:'#fff',
    flex:1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center', 
  },
  img: {
    width: '120%', 
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginTop: -25,
    marginBottom: 30,
  },
  highlight: {
    color: '#00A8E8',
  },
  button: {
    backgroundColor: '#00A8E8', 
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  big: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  para: {
    color: '#717070',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 26,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeCircle: {
    backgroundColor: '#00A8E8',
  },
  inactiveCircle: {
    backgroundColor: '#B0B0B0',
  },
});
