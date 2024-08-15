// src/screens/SplashScreen.js
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          // User is logged in, navigate to the Home screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
          });
        } else {
          // User is not logged in, navigate to the Login screen
          navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
          });
        }
      } catch (e) {
        console.error("Failed to retrieve the token.");
      }
    };

    checkLoginState();
  }, []);

  console.log(AsyncStorage.getItem('userToken'))

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
