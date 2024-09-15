import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import Icons from "react-native-vector-icons/Feather";

const Alert = ({ status, onClose, error, success }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500, // Duration of one full rotation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Duration of the fade-in
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, [rotateAnim, fadeAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const fadeStyle = {
    opacity: fadeAnim,
  };

  return (
    <View
      style={{
        height: 906,
        width: 406,
        zIndex: 10,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={[{ elevation: 10 }]}
        className="w-72 bg-stone-200 h-52 rounded-3xl flex items-center p-4 shadow-"
      >
        {status !== "success" ? (
          <View className="flex items-center">
            <Animated.View
              style={{ opacity:fadeAnim, transform: [{ rotate: rotateInterpolate }] }}
            >
              <Icons name="alert-triangle" size={50} color={"orange"} />
            </Animated.View>
            <Text className="text-lg">Something went wrong</Text>
            <Text className="text-md">File not {error}</Text>
          </View>
        ) : (
          <View className="flex items-center">
            <Animated.View
              style={{opacity: fadeAnim, transform: [{ rotate: rotateInterpolate }] }}
            >
              <Icons name="check-circle" size={50} color={"green"} />
            </Animated.View>
            <Text className="text-lg">Successful</Text>
            <Text className="text-md">Your file {success} successfully</Text>
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
