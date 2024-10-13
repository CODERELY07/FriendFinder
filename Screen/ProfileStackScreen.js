import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import externalStyles from "../style/externalStyle";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TextInput } from "react-native"; 

function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1,backgroundColor:'#fff',padding:15}}
    >
      <Text style={[externalStyles.title, styles.alignCenter]}>Profile</Text>
      <View style={[externalStyles.header,{justifyContent:'space-between'}]}>
        <View style={externalStyles.header}>
          <Image
            source={{ uri: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg' }}
            style={externalStyles.profileImage}
          />
          <Text style={externalStyles.headerText}>
            John Doe {"\n"}
            <Text style={externalStyles.subHeaderText}>Edit Profile</Text>
          </Text>
        </View>
       
        <TouchableOpacity>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={[externalStyles.locationBox, {width:'100%'}]}>
        <Text style={{width:'100%',padding:40,textAlign:'center'}}>
          Bio
        </Text>
      </View>
      <View style={[externalStyles.locationBox,{justifyContent:'space-between',alignItems:'center', flexDirection:'row', paddingVertical:20,paddingHorizontal:10}]}>
        <View style={{alignItems:'center',flexDirection:'row'}}>
          <EvilIcons name="location" size={24} color="black" />
          <Text>
            Location
          </Text>
        </View>
        
        <Text style={{textAlign:'center'}}>
          Edit
        </Text>
      </View>
      <View style={[externalStyles.locationBox, {width:'100%'}]}>
        <Image source={{ uri: 'https://i.sstatic.net/HILmr.png'}} style={{height:240,width:'100%'}}/>
      </View>
     </SafeAreaView>
  );
}


const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}


const styles = StyleSheet.create({
  alignCenter:{
    textAlign:'center',
    paddingTop:40,
  }
});