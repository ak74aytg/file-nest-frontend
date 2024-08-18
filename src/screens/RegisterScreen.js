import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styled } from "nativewind";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "../../redux/features/AuthSlice";

const StyledView = styled(View);

export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    dispatch(registerUser(data)).then((action) => {
      if (registerUser.fulfilled.match(action)) {
        navigation.navigate('otp', { user: action.payload.email });
      }
    });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="bg-[#4682B4] h-full">
            <View className="flex-1 justify-start pt-7 px-8 bg-white rounded-t-3xl">
              <Text className="text-3xl font-bold mb-7 text-center">Signup</Text>

              <Controller
                control={control}
                name="username"
                rules={{ required: "Username is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      placeholder="Username"
                      value={value}
                      onChangeText={onChange}
                      className="border border-gray-300 text-xl rounded-3xl bg-[#efefef] p-3 mt-3"
                    />
                    {errors.username && <Text className="text-red-500">{errors.username.message}</Text>}
                  </>
                )}
              />

              <Controller
                control={control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      placeholder="Email"
                      value={value}
                      onChangeText={onChange}
                      className="border border-gray-300 rounded-3xl text-xl bg-[#efefef] p-3 mt-7"
                    />
                    {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
                    {error && <Text className="text-red-500">{error}</Text>}
                  </>
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      placeholder="Password"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      className="border border-gray-300 rounded-3xl text-xl bg-[#efefef] p-3 mt-7"
                    />
                    {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
                  </>
                )}
              />

              <View>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className={`border rounded-3xl text-xl p-3 mt-6 mb-6 ${
                    loading ? "border-gray-300 bg-[#efefef]" : "bg-[#4682B4]"
                  }`}
                >
                  <Text className={`text-lg text-center font-extrabold ${
                      loading ? "text-[#aaa]" : "text-white"
                    }`}>
                    {loading ? "loading ..." : "Get OTP"}
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
      </View>
    </TouchableWithoutFeedback>
  );
}
