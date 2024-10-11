import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import externalStyles from "../style/externalStyle";

export default function Screen2({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{marginTop:60}}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 20 }}
        >
            <Ionicons name="chevron-back" size={38} color="#00A8E8" />
        </TouchableOpacity>   
      </View>
      <View style={{ flex: 1, backgroundColor:"#fff",padding:30}}>
        <Text style={externalStyles.title}>Why Connect?</Text>
        <View style={externalStyles.imageContainer}>
            <Image style={externalStyles.img} source={require('./../assets/images/second.jpg')} />
        </View>
        <Text style={[externalStyles.description, externalStyles.para]}>
            Broaden your social circle! Whether you're seeking a workout partner or someone to explore the city with, FriendFinder makes it easy to see where others are and connect with your tribe nearby.
        </Text>
        <TouchableOpacity style={externalStyles.button}
        onPress={() => navigation.navigate('Screen3')}>
            <Text style={externalStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent:'center',
    backgroundColor: "#fff",
  }
});
