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
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native"; 

const messagesData = [
  { id: '1', title: 'Rose Angel', content: 'How are you?', imageUrl: 'https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.jpg?s=612x612&w=0&k=20&c=d8W_C2D-2rXlnkyl8EirpHGf-GpM62gBjpDoNryy98U=' },
  { id: '2', title: 'Jack Thomas', content: 'Hello', imageUrl: 'https://www.shutterstock.com/image-photo/profile-picture-smiling-young-african-260nw-1873784920.jpg' },
  { id: '3', title: 'Thomas Brown', content: 'Hi!', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCWG18FMyS1pXtWKr4Eb7_XLr0lScrVylmpg&s' },
  { id: '4', title: 'Emily Davis', content: 'What!.', imageUrl: 'https://media.gettyimages.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=tFkDOWmEyqXQmUHNxkuR5TsmRVLi5VZXYm3mVsjee0E=' },
  { id: '5', title: 'Sarah Lee', content: 'Heyy', imageUrl: 'https://media.gettyimages.com/id/1395128746/photo/portrait-of-confident-young-businesswomen-standing-in-a-convention-center-during-product-and.jpg?s=612x612&w=gi&k=20&c=b5YU_WVagGUrh6s7hiC3JJOTaofLduPHiowOsXq6ETQ=' },
  { id: '6', title: 'Jane Smith', content: 'Who are you', imageUrl: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_1280.jpg' },
  { id: '7', title: 'David Johnson', content: 'Where are you?', imageUrl: 'https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg' }, 
];

function MessagesScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => navigation.navigate('MessagesText', { message: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.profilePic} />
      <Text style={styles.messageTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messagesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

function MessageTextChat({ route }) {
  const { message } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>{message.content}</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        justifyContent: 'center'
      }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginRight: 10,
          }}
          placeholder="Type your reply..."
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            borderRadius: 8,
            padding: 10,
          }}
        >
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const MessagesStack = createNativeStackNavigator();

export default function MessagesStackScreen() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ title: 'Messages' }}
      />
      <MessagesStack.Screen
        name="MessagesText"
        component={MessageTextChat}
        options={({ route }) => ({ title: route.params.message.title })}
      />
    </MessagesStack.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContent: {
    fontSize: 16,
    marginTop: 8,
  },
});
