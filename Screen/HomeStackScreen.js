import * as React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import externalStyles from "../style/externalStyle";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddLocationScreen from "./AddLocationScreen";

function HomeScreen() {
  const navigation = useNavigation();
  const friendsData = [
    {
      id: "1",
      uri: "https://www.shutterstock.com/image-photo/profile-picture-smiling-young-african-260nw-1873784920.jpg",
    },
    {
      id: "2",
      uri: "https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E=",
    },
    {
      id: "3",
      uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_1280.jpg",
    },
    {
      id: "4",
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCWG18FMyS1pXtWKr4Eb7_XLr0lScrVylmpg&s",
    },
    {
      id: "5",
      uri: "https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
    },
  ];

  const nearbyFriendsData = [
    {
      id: "1",
      name: "Emily Davis",
      uri: "https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E=",
      mapUri: "https://i.sstatic.net/HILmr.png",
    },
    {
      id: "2",
      name: "Jane Smith",
      uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_1280.jpg",
      mapUri: "https://i.sstatic.net/HILmr.png",
    },
  ];

  const renderFriend = ({ item }) => (
    <Image source={{ uri: item.uri }} style={styles.friendImage} />
  );

  const renderNearbyFriend = ({ item }) => (
    <View style={externalStyles.locationBox}>
      <View style={styles.friendInfo}>
        <Image source={{ uri: item.uri }} style={styles.smallFriendImage} />
        <Text style={styles.friendName}>
          {item.name}
          {"\n"}
          <Text style={styles.friendStatus}>Join the fun!</Text>
        </Text>
      </View>
      <Image source={{ uri: item.mapUri }} style={styles.mapImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={externalStyles.header}>
        <Image
          source={{
            uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
          }}
          style={externalStyles.profileImage}
        />
        <Text style={externalStyles.headerText}>
          John Doe {"\n"}
          <Text style={externalStyles.subHeaderText}>Join the fun!</Text>
        </Text>
      </View>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          "The best adventures are the ones shared—let's meet where the map
          leads us!"
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Message your Friends</Text>
      <FlatList
        data={friendsData}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.friendList}
      />

      <Text style={styles.sectionTitle}>Location of Friends Nearby!</Text>
      <FlatList
        data={nearbyFriendsData}
        renderItem={renderNearbyFriend}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.nearbyList}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          height: 50,
          width: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignContent: "center",
          position: "absolute",
          bottom: 15,
          right: 15,
        }}
        onPress={() => navigation.navigate("AddLocation")}
      >
        <AntDesign name="pluscircle" size={50} color="#00A8E8" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  quoteBox: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    backgroundColor: "#fff",
    shadowRadius: 3,
    borderRadius: 3,
    padding: 5,
    elevation: 5,
    marginTop: 10,
  },
  quoteText: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: "500",
    fontSize: 18,
    marginTop: 30,
  },
  friendList: {
    marginTop: 15,
  },
  friendImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 5,
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 1,
    padding: 10,
  },
  smallFriendImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  friendName: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  friendStatus: {
    color: "#717070",
    fontWeight: "400",
    fontSize: 12,
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  nearbyList: {
    marginTop: 15,
  },
});
