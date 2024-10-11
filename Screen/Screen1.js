import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import externalStyles from "../style/externalStyle";

export default function Screen1({navigation}) {
  const [currentPage, setCurrentPage] = useState(0);

  const renderIndicators = () => {
    return [0, 1, 2].map((index) => (
      <View
        key={index}
        style={[
          externalStyles.circle,
          currentPage === index ? externalStyles.activeCircle : externalStyles.inactiveCircle,
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={externalStyles.title}>Welcome{"\n"}FriendFinder</Text>
      <View style={externalStyles.imageContainer}>
        <Image style={externalStyles.img} source={require('./../assets/images/first.jpg')} />
      </View>
      <Text style={[externalStyles.description, externalStyles.big]}>
        <Text style={externalStyles.highlight}>Experience </Text>
        a fresh approach to 
        <Text style={externalStyles.highlight}> friendship!</Text>
      </Text>
      <Text style={[externalStyles.description, externalStyles.para]}>
        Our app unites you with like-minded individuals in your area, making meaningful connections effortless.
      </Text>
      <TouchableOpacity style={externalStyles.button}
      onPress={() => navigation.navigate('Screen2')}>
        <Text style={externalStyles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={externalStyles.indicatorContainer}>
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
  }
});
