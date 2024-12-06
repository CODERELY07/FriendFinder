// import React, { useState, useEffect } from 'react';
// import { FlatList, View, StyleSheet, Text,TextInput, Button } from 'react-native';
// import * as SQLite from 'expo-sqlite';  // Import SQLite
// import Post from './Post';

// // Simulated list of users (you can later extend this with actual user authentication)
// const users = [
//   { id: '1', username: 'john_doe' },
//   { id: '2', username: 'jane_smith' },
//   { id: '3', username: 'mike_johnson' },
// ];

// // Simulated logged-in user (For simplicity, we choose the first user as logged-in)
// const currentUser = users[0]; // Change this to simulate a different logged-in user

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPostText, setNewPostText] = useState('');
//   const [db, setDb] = useState(null);

//   // Initialize SQLite database and create tables
//   useEffect(() => {
//     const initializeDatabase = async () => {
//       const database = await SQLite.openDatabaseAsync('friendfinder');
//       setDb(database);

//       // Create the table if not exists
//       await database.execAsync(`
//         PRAGMA journal_mode = WAL;
//         CREATE TABLE IF NOT EXISTS posts (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           username TEXT NOT NULL,
//           text TEXT NOT NULL,
//           likes INTEGER DEFAULT 0,
//           likedBy TEXT,
//           comments TEXT
//         );
//       `);
//       loadPosts(); // Load posts from SQLite after table creation
//     };

//     initializeDatabase();
//   }, []);

//   // Load all posts from SQLite
//   const loadPosts = async () => {
//     if (db) {
//       // Get all posts from the database without filtering by the current user
//       const allRows = await db.getAllAsync('SELECT * FROM posts');

//       const loadedPosts = allRows.map(row => ({
//         id: row.id.toString(),
//         username: row.username,
//         text: row.text,
//         likes: row.likes,
//         likedBy: row.likedBy ? row.likedBy.split(',') : [],
//         comments: row.comments ? JSON.parse(row.comments) : [],
//       }));

//       setPosts(loadedPosts);
//     }
//   };

//   // Handle post like functionality
//   const handleLike = async (postId) => {
//     const updatedPosts = posts.map((post) => {
//       if (post.id === postId) {
//         const alreadyLiked = post.likedBy.includes(currentUser.username);
//         let updatedLikedBy = [...post.likedBy];
//         if (alreadyLiked) {
//           updatedLikedBy = updatedLikedBy.filter((user) => user !== currentUser.username);
//         } else {
//           updatedLikedBy.push(currentUser.username);
//         }

//         return {
//           ...post,
//           likedBy: updatedLikedBy,
//           likes: updatedLikedBy.length,
//         };
//       }
//       return post;
//     });
//     setPosts(updatedPosts);

//     // Update like count in SQLite
//     const post = updatedPosts.find(post => post.id === postId);
//     await db.runAsync(
//       'UPDATE posts SET likes = ?, likedBy = ? WHERE id = ?',
//       post.likes,
//       post.likedBy.join(','),
//       postId
//     );
//   };

//   // Handle adding comments to a post
//   const handleAddComment = async (postId, newComments) => {
//     const updatedPosts = posts.map((post) => {
//       if (post.id === postId) {
//         return { ...post, comments: newComments };
//       }
//       return post;
//     });
//     setPosts(updatedPosts);

//     // Update comments in SQLite
//     const post = updatedPosts.find(post => post.id === postId);
//     await db.runAsync(
//       'UPDATE posts SET comments = ? WHERE id = ?',
//       JSON.stringify(post.comments),
//       postId
//     );
//   };

//   // Handle creating a new post
//   const handleCreatePost = async () => {
//     if (newPostText.trim()) {
//       const newPost = {
//         username: currentUser.username,
//         text: newPostText,
//         likes: 0,
//         likedBy: [],
//         comments: [],
//       };
  
//       try {
//         // Insert new post into SQLite
//         const result = await db.runAsync(
//           'INSERT INTO posts (username, text, likes, likedBy, comments) VALUES (?, ?, ?, ?, ?)',
//           newPost.username,
//           newPost.text,
//           newPost.likes,
//           '',
//           JSON.stringify(newPost.comments)
//         );
  
//         // Check for the result and ensure the post ID is available
//         if (result && result.lastInsertRowId) {
//           newPost.id = result.lastInsertRowId.toString();
  
//           // Update local state with the new post
//           setPosts([newPost, ...posts]);
  
//           // Clear the input field after posting
//           setNewPostText('');
//         } else {
//           console.error('Failed to insert post into the database');
//         }
//       } catch (error) {
//         console.error('Error creating post:', error);
//       }
//     }
//   };const logAllPosts = async () => {
//     const db = await SQLite.openDatabaseAsync('friendfinder'); // Open the database
  
//     // Get all posts from the database
//     const allRows = await db.getAllAsync('SELECT * FROM posts');
  
//     // Map through rows and log the posts
//     const loadedPosts = allRows.map(row => ({
//       id: row.id.toString(),
//       username: row.username,
//       text: row.text,
//       likes: row.likes,
//       likedBy: row.likedBy ? row.likedBy.split(',') : [],
//       comments: row.comments ? JSON.parse(row.comments) : [],
//     }));
  
//     // Log all posts to the console
//     console.log("All Posts:", loadedPosts);
//   };
  
//   logAllPosts();

//   return (
//     <View style={styles.container}>
    
//       <View style={[styles.createPostContainer, styles.line]}>
//         <TextInput
//           style={styles.input}
//           value={newPostText}
//           onChangeText={setNewPostText}
//           placeholder="What's on your mind?"
//         />
//         <Button title="Post" onPress={handleCreatePost} />
//       </View>
//       {/* {posts.length > 0 ? (
//         posts.map(post => (
//           <View key={post.id} style={styles.postContainer}>
//             <Text style={styles.username}>{post.username}</Text>
//             <Text>{post.text}</Text>
//             <Text>Likes: {post.likes}</Text>
//             <Text>Liked by: {post.likedBy.join(', ')}</Text>
//             <Text>Comments:</Text>
//             {post.comments.map((comment, index) => (
//               <Text key={index}>{comment}</Text>
//             ))}
//           </View>
//         ))
//       ) : (
//         <Text>No posts available</Text>
//       )} */}
//       <FlatList
//         data={posts}
//         renderItem={({ item }) => (
//           <Post
//             post={item}
//             onLike={handleLike}
//             onAddComment={handleAddComment}
//             currentUser={currentUser}
//           />
//         )}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//     paddingTop: 10,
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   createPostContainer: {
//     padding: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   input: {
//     backgroundColor:'#E7ECEF',
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 5,
//     height: 40,
//     fontSize: 16,
//     height:70,
//   },
//   line:{
//     borderBottomWidth: 1, // Line separator
//     width:'100%',
//     paddingBottom:10,
//     borderBottomColor: '#ccc', // Light gray color for the line
//   }
// });

// export default Feed;
