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
  { id: '1', title: 'Rose Angel', content: 'How are you?', imageUrl: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=' },
  { id: '2', title: 'Jack Thomas', content: 'Don\'t forget our meeting at 10 AM.', imageUrl: 'https://www.shutterstock.com/image-photo/profile-picture-smiling-young-african-260nw-1873784920.jpg' },
  { id: '3', title: 'Thomas Brown', content: 'Want to grab lunch today?', imageUrl: 'https://thumbs.dreamstime.com/b/head-shot-portrait-confident-businessman-looking-camera-posing-profile-picture-making-video-call-to-business-partners-coach-212585716.jpg' },
  { id: '4', title: 'Emily Davis', content: 'We need to review the budget.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6BkMQEKHWILXy8SzbX5aocWP6YWv0mZnSDA&s' },
  { id: '5', title: 'Sarah Lee', content: 'Have you heard about the latest iPhone?', imageUrl: 'https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg' },
  { id: '6', title: 'Jane Smith', content: 'Are you available for a call tomorrow?', imageUrl: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png' },
  { id: '7', title: 'David Johnson', content: 'I need to schedule a meeting with my team.', imageUrl: 'https://t4.ftcdn.net/jpg/06/51/71/33/360_F_651713397_M2PPLdBT4CWwOwcvXMIUSECRtiJeqDN1.jpg' }, 
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
