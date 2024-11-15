import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styled } from "nativewind";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../redux/features/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledView = styled(View);

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    dispatch(loginUser(data)).then((action) => {
      if (loginUser.fulfilled.match(action)) {
        AsyncStorage.setItem("userToken", action.payload.token);
        navigation.reset({
          index: 0,
          routes: [{ name: "home" }],
        });
      }
    });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);

      // Cleanup the timer if the component unmounts or if the error changes
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="bg-[#4682B4] h-full">
            <View className="flex-1 justify-start pt-10 px-8 bg-white rounded-t-3xl">
              <Text className="text-3xl font-bold mb-10 text-center">Login</Text>

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
                    className="border border-gray-300 rounded-3xl text-xl bg-[#efefef] p-3 mb-2"
                  />
                )}
              />
              {error && <Text className="px-3 text-red-500">{error}</Text>}

              <View>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className={`border rounded-3xl text-xl p-3 mt-6 mb-8 ${
                    loading ? "border-gray-300 bg-[#efefef]" : "bg-[#4682B4]"
                  }`}
                >
                  <Text
                    className={`text-lg text-center font-extrabold ${
                      loading ? "text-[#aaa]" : "text-white"
                    }`}
                  >
                    {loading ? "loading ..." : "Submit"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex flex-row w-full items-center justify-around">
                <StyledView className="h-0.5 bg-gray-300 flex-1 my-1" />
                <Text className="mx-2">or</Text>
                <StyledView className="h-0.5 bg-gray-300 flex-1 my-1" />
              </View>

              <View className="flex flex-row mt-5 justify-center">
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("register")}>
                  <Text className="text-[#1b1534]"> Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
