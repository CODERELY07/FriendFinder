import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import Login from "./Screen/Login";

const Stack = createNativeStackNavigator();
function HomeScreen({ navigation }) {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ fontSize: 20 }}>← Back</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Login Screen"
          onPress={() => navigation.navigate("Details")}
        />
      </View>
    </>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LOGIN"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Details"
          options={{ headerShown: false }}
          component={DetailsScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
