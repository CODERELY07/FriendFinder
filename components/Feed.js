import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import styles from "../style/HomeScreenStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Feed = ({ item, userID }) => {
    // const [username, setUsername] = useState('');
    // const getUsername = async () => {
    //     try {
    //       const storeUsername = await AsyncStorage.getItem("username");
    //       if (storeUsername) {
    //         setUsername(storeUsername); // Set the email to state
    //       } else {
    //         console.log("Username is missing from AsyncStorage");
    //       }
    //     } catch (error) {
    //       console.error("Error retrieving username from AsyncStorage:", error);
    //     }
    //   };
      
    //   useEffect(()=>{
    //     getUsername();
    //   }, [])
    if (!item) {
      return <Text>Loading...</Text>;
    }
    
    return (
      <View style={[styles.box, { paddingVertical: 10, paddingTop:0, marginLeft: 1, width: "99%", flexDirection: "column", alignItems: "left" }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold" }}>{}</Text>
        
        </View>
        <Text style={{ fontWeight: "bold" }}>{item.PostUsername}</Text>
        <View>
          <Text>{item.Content}</Text>
        </View>
        <View style={{ borderTopColor: '#B0B0B0',marginTop:5, borderTopWidth: 1 }}>
      
        </View>
  
      
      </View>
    );
  };
  

export default Feed;
