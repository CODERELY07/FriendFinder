import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Screen3({ navigation }) {
return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Details Screen</Text>
    {/* <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate("Home")}
    /> */}
    </View>
);
}

const styles = StyleSheet.create({})