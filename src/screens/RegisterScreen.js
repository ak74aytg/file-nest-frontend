// screens/SignupScreen.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";


const StyledView = styled(View);

export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("YOUR_BACKEND_URL/signup", data);
      if (response.data.success) {
        navigation.navigate("OTP", { userId: response.data.userId });
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
          <Text className="text-3xl font-bold mb-10 text-center">Signup</Text>

          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Username"
                value={value}
                onChangeText={onChange}
                className="border border-gray-300 text-xl rounded-3xl bg-[#efefef] p-3 mb-8"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                className="border border-gray-300 rounded-3xl text-xl bg-[#efefef] p-3 mb-8"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Password"
                secureTextEntry
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
          <View className="flex flex-row w-full items-center justify-around">
            <StyledView className="h-0.5 bg-gray-300 flex-1 my-1" />
            <Text className="mx-2">or</Text>
            <StyledView className="h-0.5 bg-gray-300 flex-1 my-1" />
          </View>
          <View className="flex flex-row mt-5 justify-center">
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text className="text-[#1b1534]"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
