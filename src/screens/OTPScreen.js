// screens/OTPScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../../redux/features/AuthSlice";

export default function OTPScreen({ route, navigation }) {
  const { control, handleSubmit } = useForm();
  const { user } = route.params;
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const verifyData = { email: user, otp: data.otp };
    dispatch(verifyUser(verifyData)).then((action) => {
      if (verifyUser.fulfilled.match(action)) {
        navigation.reset({
          index: 0,
          routes: [{ name: "home" }],
        });
      } else {
        console.log(action);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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
      </View>
    </TouchableWithoutFeedback>
  );
}
