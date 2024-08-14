// screens/OTPScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function OTPScreen({ route, navigation }) {
  const { control, handleSubmit } = useForm();
  // const { userId } = route.params;
  userId = 3;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`YOUR_BACKEND_URL/verify-otp`, {
        userId,
        otp: data.otp,
      });
      if (response.data.success) {
        navigation.navigate("Home"); // Navigate to the main app screen after successful OTP verification
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView className="bg-white">
      <View className="bg-[#1b1534] h-full">
        <View className="flex-1 justify-start pt-10 px-8 bg-white rounded-t-3xl">
          <Text className="text-3xl font-bold mb-10 text-center">
            Enter OTP
          </Text>

          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="OTP"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                className="border border-gray-300 rounded-3xl text-xl bg-[#efefef] p-3 mb-8"
              />
            )}
          />
          <View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="border rounded-3xl text-xl bg-[#1b1534] p-3 mb-8"
            >
              <Text className="text-lg text-center text-white font-extrabold">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
