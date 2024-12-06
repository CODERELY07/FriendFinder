// // components/Post.js

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
// import * as SQLite from 'expo-sqlite';

// const Post = ({ post, onLike, onAddComment, currentUser, db }) => {
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState(post.comments || []);

//   // Load comments from SQLite when the component mounts
//   useEffect(() => {
//     if (db && post.id) {
//       loadComments();
//     }
//   }, [db, post.id]);

//   // Function to load comments for the post from SQLite
//   const loadComments = async () => {
//     if (db && post.id) {
//       const result = await db.getAllAsync('SELECT * FROM comments WHERE postId = ?', post.id);
//       const loadedComments = result.map(row => ({
//         id: row.id.toString(),
//         username: row.username,
//         text: row.text,
//       }));
//       setComments(loadedComments);
//     }
//   };

//   const handleCommentChange = (text) => {
//     setComment(text);
//   };

//   const handleCommentSubmit = async () => {
//     if (comment.trim()) {
//       const newComment = { id: comments.length + 1, username: currentUser.username, text: comment };

//       // Insert new comment into SQLite
//       await db.runAsync(
//         'INSERT INTO comments (postId, username, text) VALUES (?, ?, ?)',
//         post.id,
//         currentUser.username,
//         comment
//       );

//       // Update local state with the new comment
//       const updatedComments = [...comments, newComment];
//       setComments(updatedComments);
//       setComment('');

//       // Update comments for the post in Feed component
//       onAddComment(post.id, updatedComments);
//     }
//   };

//   const isLikedByUser = post.likedBy.includes(currentUser.username); // Check if the current user liked this post

//   return (
//     <View style={styles.card}>
//       <Text style={styles.username}>{post.username}</Text>
//       <Text style={styles.text}>{post.text}</Text>

//       <View style={styles.actions}>
//         <TouchableOpacity onPress={() => onLike(post.id)} style={[styles.button, isLikedByUser && styles.likedButton]}>
//           <Text style={styles.buttonText}>{isLikedByUser ? 'Unlike' : 'Like'} ({post.likes})</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => {}} style={styles.button}>
//           <Text style={styles.buttonText}>Comment</Text>
//         </TouchableOpacity>
//       </View>

//       <TextInput
//         style={styles.commentInput}
//         value={comment}
//         onChangeText={handleCommentChange}
//         placeholder="Write a comment..."
//       />
//       <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={comments}
//         renderItem={({ item }) => (
//           <View style={styles.comment}>
//             <Text style={styles.commentText}><Text style={styles.commenterName}>{item.username}:</Text> {item.text}</Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   username: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   text: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 10,
//   },
//   actions: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   button: {
//     marginRight: 15,
//   },
//   likedButton: {
//     backgroundColor: '#3b5998',
//   },
//   buttonText: {
//     color: '#3b5998',
//     fontWeight: 'bold',
//   },
//   commentInput: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 8,
//     marginBottom: 10,
//   },
//   submitButton: {
//     backgroundColor: '#3b5998',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   comment: {
//     marginTop: 5,
//     paddingLeft: 10,
//   },
//   commentText: {
//     fontSize: 12,
//     color: '#555',
//   },
//   commenterName: {
//     fontWeight: 'bold',
//     color: '#3b5998',
//   },
// });

// export default Post;
