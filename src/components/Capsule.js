import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const Capsule = ({ tag, isSelected, handleTagSelection }) => {
  return (
    <TouchableOpacity
      onPress={() => handleTagSelection(tag.tag)}
      className={`py-1 px-3 bg-gray-200 inline mx-1 my-1 rounded-xl ${
        isSelected ? "border-blue-600 border" : ""
      }`}
    >
      <View className="w-full flex flex-row items-center gap-2">
        <Icons name={tag.icon} size={15} color={tag.color} />
        <Text className={`text-center ${isSelected ? "text-blue-600" : ""}`}>
          {tag.tag}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Capsule;
