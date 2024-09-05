import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import Icons from "react-native-vector-icons/FontAwesome5";
import moment from "moment";

const Document = ({ data, isActive, onToggle }) => {
  const uploadedAt = data?.metaData?.uploaded_at || "";

  useEffect(() => {
    const handleBackPress = () => {
      if (isActive) {
        onToggle();
        return true; // Prevent default back button behavior
      }
      return false; // Allow default back button behavior
    };

    // Add event listener for back button press
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    // Cleanup the event listener on component unmount
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [isActive]);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + "..."; // Adjust -3 for the "..."
    }
    return title;
  };

  const truncatedTitle = truncateTitle(data.title, 25);

  return (
    <View className="bg-[#fff] mx-3 mb-5 shadow shadow-black rounded-xl">
      <View className="flex flex-row justify-between px-4 items-center">
        <TouchableOpacity
        //   onPress={() => onToggle(false)}
          className="h-16 w-[90%] flex flex-row items-center"
        >
          <View className="bg-[#B3E5FC] h-8 w-8 items-center justify-center rounded-md mr-4">
            <Icons name="file" size={20} color={"blue"} />
          </View>
          <View>
            <Text className="text-lg">{truncatedTitle}</Text>
            <Text style={{ fontSize: 12 }} className="font-extralight">
              {uploadedAt
                ? moment(uploadedAt).format("DD/MM/YYYY h:mma")
                : "No Date"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="h-full flex flex-row items-center"
          onPress={onToggle}
        >
          <Icons name="ellipsis-h" size={20} color={"#808080"} />
        </TouchableOpacity>
      </View>

      {/* Options view */}
      {isActive && (
        <View
          style={{ position: "absolute", bottom: 50, right: 8 }}
          className="bg-slate-100 w-32 p-4 rounded-md shadow"
        >
          <TouchableOpacity
            className="mb-4"
            onPress={() => {
              /* Handle Open */ onToggle();
            }}
          >
            <Text className="text-lg">Open</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mb-4"
            onPress={() => {
              /* Handle Edit */ onToggle();
            }}
          >
            <Text className="text-lg">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* Handle Delete */ onToggle();
            }}
          >
            <Text className="text-lg text-red-500">Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Document;
