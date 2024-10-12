import * as React from "react";
import { Button, Text, View, Image, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
          }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          John Doe {"\n"}
          <Text style={{ color: "#717070", fontWeight: "400", fontSize: 12 }}>
            Join the fun!
          </Text>
        </Text>
      </View>
      <View
        style={{
          shadowColor: "#171717",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.7,
          backgroundColor: "#fff",
          shadowRadius: 3,
          borderRadius: 3,
          padding: 5,
          elevation: 5,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            padding: 10,
            backgroundColor: "white",
            borderRadius: 5,
            textAlign: "center",
          }}
        >
          "The best adventures are the ones shared—let's meet where the map
          leads us!"
        </Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontWeight: "500", fontSize: 18 }}>
          Message your Friends
        </Text>
        <View style={{flexDirection:'row',gap:10,marginTop:15}}>
            <Image
            source={{
                uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={{ width: 70, height: 70, borderRadius: 35 }}
            />
            <Image
            source={{
                uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={{ width: 70, height: 70, borderRadius: 35 }}
            />
            <Image
            source={{
                uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={{ width: 70, height: 70, borderRadius: 35 }}
            />
            <Image
            source={{
                uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={{ width: 70, height: 70, borderRadius: 35 }}
            />
            <Image
            source={{
                uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            }}
            style={{ width: 70, height: 70, borderRadius: 35 }}
            />
        </View>
      </View>
      <View style={{ marginTop: 60 }}>
        <Text style={{ fontWeight: "500", fontSize: 18 }}>
            Location of Friends Nearby!
        </Text>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </SafeAreaView>
  );
}

function MessageScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Messages screen</Text>
      <Button
        title="Go to Messages"
        onPress={() => navigation.navigate("Details")}
      />
    </SafeAreaView>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
}

const MessagesStack = createNativeStackNavigator();

function MessagesStackScreen() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="Message"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </MessagesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Main() {
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
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
