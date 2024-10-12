import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Screen1 from "./Screen/Screen1";
import Screen2 from "./Screen/Screen2";
import Screen3 from "./Screen/Screen3";
import Main from "./Screen/Main";
const Stack = createNativeStackNavigator();

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

