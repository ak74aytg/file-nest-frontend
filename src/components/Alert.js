import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "react-native-vector-icons/Feather";

const Alert = ({ status, onClose }) => {
  return (
    <View
      className={`h-[906] w-[406] z-10  absolute flex justify-center items-center`}
    >
      <View style={{elevation:10}} className="w-72 bg-stone-200 h-52 rounded-3xl flex items-center p-4 shadow-">
        {status !== "success" ? (
          <View className="flex items-center">
            <Icons name="alert-triangle" size={50} color={"orange"} />
            <Text className="text-lg">Something went wrong</Text>
            <Text className="text-md">File not supported</Text>
          </View>
        ) : (
          <View className="flex items-center">
            <Icons name="check-circle" size={50} color={"green"} />
            <Text className="text-lg">Successful</Text>
            <Text className="text-md">Your file uploaded successfully</Text>
          </View>
        )}
        <View className="w-full border-b-2 border-gray-400 mt-8"></View>
        <TouchableOpacity
          className="bg-yellow-300 w-24 rounded-xl py-2 mt-5"
          onPress={onClose}
        >
          <Text className="text-center">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Alert;
