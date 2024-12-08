// CommentsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import Feed from '../components/Feed'; // Import Feed component
import AntDesign from '@expo/vector-icons/AntDesign';

const CommentsScreen = () => {
  const route = useRoute();
  const { postID, userID } = route.params; 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postUsername, setPostUsername] = useState("");

    const  fetchPostUsername = async () =>{
        try {
            const db = await SQLite.openDatabaseAsync("friendfinder");
        
            // Assuming you're fetching the username based on postID
            const result = await db.getAllAsync(
                "SELECT user.Username as username FROM post JOIN user ON post.UserID = user.UserID WHERE post.PostID = ?", 
                [postID] // Use postID to filter the post
            );
        
            // Check if the result contains data
            const username = result.length > 0 ? result[0].username : '';
            setPostUsername(username); // Set the username state
            console.log(username); // Log the username for debugging
        } catch (e) {
            console.log('Error fetching comments:', e); // Log errors
        }
        
  }
  const fetchComments = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      
      // Query to get the post content and comments
      const result = await db.getAllAsync(`
        SELECT post.Content as PostContent, comment.CommentID, comment.Content as CommentContent, user.Username
        FROM comment 
        JOIN post ON comment.PostID = post.PostID
        JOIN user ON comment.UserID = user.UserID 
        WHERE comment.PostID = ?
      `, [postID]);
  
      if (result && Array.isArray(result)) {
        // Separate the post content and comments
        const postContent = result.length > 0 ? result[0].PostContent : '';

        const comments = result.map(item => ({
          CommentID: item.CommentID,
          Content: item.CommentContent,
          Username: item.Username
        }));
  
        // Set the post content and comments state
        setComments(comments);
        setPostContent(postContent); // Assuming you define a state variable for post content
      } else {
        console.log("No comments found or result format is incorrect.");
      }
    } catch (e) {
      console.log('Error fetching comments:', e);
    }
  };
  
  
  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      console.log("Comment cannot be empty");
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync("friendfinder");
      await db.runAsync("INSERT INTO comment (PostID, UserID, Content) VALUES (?, ?, ?)", [postID, userID, newComment]);
      setNewComment("");
      fetchComments(); 
    } catch (e) {
      console.log('Error adding comment:', e);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchPostUsername();
  }, [postID]); 

  return (
    <View style={styles.container}>
      <Feed item={{PostID: postID, Content: postContent, PostUsername: postUsername}} userID={userID} />
      
      <FlatList
      showsVerticalScrollIndicator={false}
        data={comments}
        keyExtractor={(item) => item.CommentID.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentUsername}>{item.Username}</Text>
            <Text style={styles.commentContent}>{item.Content}</Text>
          </View>
        )}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Write a comment"
        value={newComment}
        onChangeText={setNewComment}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
        <Text style={styles.addButtonText}>Add Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  commentContainer: {
    marginBottom: 15,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  commentContent: {
    marginTop: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#00A8E8',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommentsScreen;
