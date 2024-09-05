import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeHeader = ({ user, navigation }) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove the token from AsyncStorage
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (e) {
      console.log(e)
      console.error("Failed to remove the token.");
    }
  };



  return (
    <View className="flex flex-row justify-between items-center px-3 py-6">
      <View>
        <Text className="text-lg">Welcome, {user}!</Text>
        <Text className="text-4xl font-bold text-[#4682B4]">
          Manage Your Files
        </Text>
      </View>

      <View className="rounded-full border-[#bbb] bg-[#bbb] border w-11 h-11 items-center">
        <TouchableOpacity onPress={logout}>
          <Icon name="user" size={40} color={"#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
