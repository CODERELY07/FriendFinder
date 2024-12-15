import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/Ionicons';
import * as SQLite from "expo-sqlite";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Open SQLite database
const db = SQLite.openDatabaseAsync("friendfinder");

// MessagesScreen Component
function MessagesScreen({ navigation }) {
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [username, setUsername] = React.useState(null);
  const [replyToMessage, setReplyToMessage] = React.useState(null); // Track message being replied to
  const [modalVisible, setModalVisible] = React.useState(false); // Track modal visibility
  const [selectedMessage, setSelectedMessage] = React.useState(null); // Track the message being clicked

  React.useEffect(() => {
    const initDB = async () => {
      try {
        const db = await SQLite.openDatabaseAsync("friendfinder");

        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            content TEXT NOT NULL,
            parent_id INTEGER DEFAULT NULL,  
            FOREIGN KEY (parent_id) REFERENCES messages(id)  
          );
        `);
      } catch (e) {
        console.log(e);
      }
    };

    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          Alert.alert('No username found', 'Please log in again.');
        }
      } catch (e) {
        console.log('Error fetching username', e);
      }
    };

    initDB();
    getUsername();
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");

      // Fetch messages along with their replies
      const result = await db.getAllAsync(`
        SELECT * FROM messages WHERE parent_id IS NULL ORDER BY id DESC
      `);

      const messagesWithReplies = await Promise.all(result.map(async (message) => {
        const replies = await db.getAllAsync("SELECT * FROM messages WHERE parent_id = ?", [message.id]);
        return { ...message, replies };
      }));

      setMessages(messagesWithReplies);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleReply = (message) => {
    setSelectedMessage(message); 
    setModalVisible(true); 
  };

  const sendMessage = async () => {
    if (message.trim() === "") {
      Alert.alert("Message cannot be empty.");
      return;
    }
    if (!username) {
      Alert.alert("Please log in to send a message.");
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");

      // Insert reply or new message
      if (selectedMessage) {
        await db.runAsync("INSERT INTO messages (username, content, parent_id) VALUES (?, ?, ?)", [username, message, selectedMessage.id]);
        setSelectedMessage(null); // Clear the reply context
      } else {
        await db.runAsync("INSERT INTO messages (username, content) VALUES (?, ?)", [username, message]);
      }

      setMessage(""); // Clear the input field
      fetchMessages(); // Refresh message list
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      await db.runAsync("DELETE FROM messages WHERE id = ?", [id]);
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const renderItem = ({ item }) => {
    // Render replies as nested messages
    const renderReplies = () => {
      return (
        <View style={styles.replyContainer}>
          {item.replies && item.replies.map((reply) => (
            <View key={reply.id} style={styles.replyMessage}>
              <Text style={styles.replyUser}>{reply.username}:</Text>
              <Text style={styles.replyContent}>{reply.content}</Text>
            </View>
          ))}
        </View>
      );
    };

    return (
      <TouchableOpacity
        style={styles.messageItem}
        onPress={() => handleReply(item)} // Allow user to reply to this message
      >
        <View style={styles.messageContent}>
          <View>
            <Text style={styles.messageTitle}>{item.username}</Text>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
          {item.username === username && (
            <TouchableOpacity
              onPress={() => deleteMessage(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
       
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Message Input Field (Below message list) */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal for Chat (for replying) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalMessages}>
              {selectedMessage && (
                <View style={styles.messageContainer}>
                  <Text style={styles.messageTitle}>{selectedMessage.username}</Text>
                  <Text style={styles.messageContent}>{selectedMessage.content}</Text>
                </View>
              )}

              {selectedMessage && selectedMessage.replies && selectedMessage.replies.map((reply) => (
                <View key={reply.id} style={styles.replyMessage}>
                  <Text style={styles.replyUser}>{reply.username}:</Text>
                  <Text style={styles.replyContent}>{reply.content}</Text>
                </View>
              ))}
            </ScrollView>

            <TextInput
              style={styles.input}
              placeholder="Type your reply"
              value={message}
              onChangeText={setMessage}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                <Icon name="send" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
        options={{ title: "Global Chat" }}
      />
    </MessagesStack.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  messageContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',  
    width: '100%',
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 16,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    padding: 5,
    marginTop: 5,
    height:30,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  replyContainer: {
    paddingLeft: 20,
    marginTop: 10,
  },
  replyMessage: {
    marginBottom: 8,
  },
  replyUser: {
    fontWeight: "bold",
    fontSize: 14,
  },
  replyContent: {
    fontSize: 14,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  modalMessages: {
    maxHeight: 300,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#000",
    fontSize: 16,
  },
});
