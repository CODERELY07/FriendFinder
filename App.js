import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from '@expo/vector-icons/AntDesign';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons"; 
import { StyleSheet } from "react-native";
import Screen1 from "./Screen/Screen1";
import Screen2 from "./Screen/Screen2";
import Screen3 from "./Screen/Screen3";
import HomeStackScreen from "./Screen/HomeStackScreen";
import MessagesStackScreen from "./Screen/MessageStacksScreen";
import ProfileStackScreen from "./Screen/ProfileStackScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Screen1"
          options={{ headerShown: false }}
          component={Screen1}
        />
        <Stack.Screen
          name="Screen2"
          options={{ headerShown: false }}
          component={Screen2}
        />
        <Stack.Screen
          name="Screen3"
          options={{ headerShown: false }}
          component={Screen3}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={Main}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
