import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const check = await axios.get(`${baseUrl}/test/welcome`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (userToken && check.status === 200) {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "home",
              },
            ],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
          });
        }
      } catch (e) {
        console.error("Error checking login state:", e);
        navigation.reset({
          index: 0,
          routes: [{ name: "login" }],
        });
      }
    };

    checkLoginState();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
