import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import Feed from '../components/Feed';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import externalStyles from "../style/externalStyle";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddLocationScreen from "./AddLocationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from 'expo-sqlite';


const initDB = async () => {
  console.log('Init Db');
  try {
    // Open the database
    const db = await SQLite.openDatabaseAsync('friendfinder');
    
    // Using `execAsync` to execute multiple queries at once
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT NOT NULL,
        Email TEXT NOT NULL,
        Password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS post (
        PostID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER NOT NULL,
        Content TEXT NOT NULL,
        FOREIGN KEY (UserID) REFERENCES user(UserID)
      );
    `);

    console.log('Database initialized successfully');
  } catch (e) {
    console.log('Error: ', e);
  }
};
initDB();
const fetchUserIDFromDb = async (email) => {
  try {
    const db = await SQLite.openDatabaseAsync('friendfinder');
    const result = await db.getFirstAsync('SELECT UserID FROM user WHERE email = ?', email);
    
    if (result) {
      return result.UserID;  
    } else {
      console.log("No user found with this email.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching UserID:", error);
    return null;
  }
};

const fetchUsernameFromDb = async (email) => {
  try {
    const db = await SQLite.openDatabaseAsync('friendfinder');
    const result = await db.getFirstAsync('SELECT Username FROM user WHERE email = ?', email);
    
    if (result) {
      return result.Username;  
    } else {
      console.log("No user found with this email.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    return null;
  }
};

const selectPost = async () => {
  console.log('Select Post');
  
  try {
    const db = await SQLite.openDatabaseAsync('friendfinder');
    const allRows = await db.getAllAsync(`
      SELECT post.Content, post.UserID 
      FROM post 
      JOIN user ON post.UserID = user.UserID
    `);
    
    for (const row of allRows) {
      console.log(`Post Content: ${row.Content}, UserID: ${row.UserID}`);
    }
  } catch (e) {
    console.log("Error: ", e);
  }
};
const insertPost = async (userID, content) => {
  console.log('Insert Post');
  if (content.trim() === '') {
    console.log('Content cannot be empty');
    return;
  }
  try {
    // Open the database
    const db = await SQLite.openDatabaseAsync('friendfinder');
    
    // Assuming you want to insert a post for an existing user with UserID = 1

    // Insert a new post into the post table using `runAsync` with parameter binding
    const result = await db.runAsync('INSERT INTO post (UserID, Content) VALUES (?, ?)', userID, content);

    // Log the result of the insert
    console.log('Inserted Post ID:', result.lastInsertRowId);
    console.log('Changes:', result.changes);

    // Optionally, you can close the database connection
    await db.closeAsync();
    
  } catch (e) {
    console.log('Error: ', e);
  }
};

function HomeScreen() {
  const [username, setUsername] = useState(null);
  const [userID, setUserID] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    let isMounted = true;
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          // Fetch username from the database using the email
          const fetchedUsername = await fetchUsernameFromDb(email);
          const fetchedUserId  = await fetchUserIDFromDb(email);
          setUsername(fetchedUsername);
          setUserID(fetchedUserId)
        } else {
          console.log("No email found.");
        }
      } catch (error) {
        console.error("Error retrieving email or fetching username:", error);
      }
    };

    getEmail();
    return () => {
      isMounted = false;
    };
  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.line}>
       <Text style={styles.logoText}>FriendFinder</Text>
      </View>
      <View style={externalStyles.header}>
        <Text style={externalStyles.headerText}>
          {username} {"\n"}
          <Text style={externalStyles.subHeaderText}>Join the fun!</Text>
        </Text>
      </View>
      <View>
        <TextInput
           placeholder="Enter post content"
           value={content} 
           onChangeText={setContent}  
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="INSERT post"
          onPress={() => insertPost(userID,content)}
        /> 
      </View>
      <View style={styles.btn}>
        <Button
          title="Select post"
          onPress={() => selectPost()}
        /> 
      </View>
      {/* <Feed /> */}
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
  friendItem: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 1,
    padding: 10,
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
  nearbyList: {
    marginTop: 15,
  },
  logoText: {
    fontFamily: 'Arial', // Facebook uses a clean sans-serif font like Arial
    fontSize: 24, // Adjust the font size based on your design
    color: '#00A8E8', // Facebook blue color
    fontWeight: 'bold', // Bold font weight
    letterSpacing: 0.5, // Slight letter spacing
  },

});
