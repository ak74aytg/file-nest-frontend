import { View, Text, TextInput } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchPanel = () => {
  return (
    <View
      style={{ elevation: 9 }}
      className="bg-[#fff] mx-3 mt-3 mb-9 shadow shadow-black shadow-offset-0 shadow-offset-t-2 rounded-xl"
    >
      <View className="h-12 flex flex-row justify-between items-center px-2">
        <TextInput
          placeholder="Search your files"
          className="opacity-50 h-12 w-[90%]"
        />
        <Icon name="search" size={20} color={"#bbb"} />
      </View>
    </View>
  );
};

export default SearchPanel;
