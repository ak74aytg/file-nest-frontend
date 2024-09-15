import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const Loader = ({
  size = "large",
  color = "#0000ff",
}) => {
  return (
    <View
      className={`w-full z-10  absolute flex justify-center items-center`}
    >
      <View
        className="w-full bg-transparent h-44 rounded-3xl flex items-center p-4 "
      >
        <ActivityIndicator size={size} color={color} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default Loader;
