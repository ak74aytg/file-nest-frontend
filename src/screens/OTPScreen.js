import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OTPScreen({ route, navigation }) {
  const { control, handleSubmit } = useForm();
  const { user } = route.params;
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  // State for countdown timer
  const [timer, setTimer] = useState(300); // 1 minutes in seconds

  useEffect(() => {
    // Timer countdown effect
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes}:${secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}`;
  };

  const onSubmit = async (data) => {
    const verifyData = { email: user, otp: data.otp };
    console.log(verifyData)
    dispatch(verifyUser(verifyData)).then((action) => {
      if (verifyUser.fulfilled.match(action)) {
        AsyncStorage.setItem('userToken', action.payload.token);
        navigation.reset({
          index: 0,
          routes: [{ name: "home" }],
        });
      } else {
        console.log(action.payload);
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
          <View className="bg-[#4682B4] h-full">
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
                    className="border border-gray-300 text-center rounded-3xl text-2xl bg-[#efefef] p-3 mb-2"
                  />
                )}
              />
              {error && <Text className="px-3 text-red-500">{error}</Text>}

              {timer>0 && <Text className="text-center text-lg mb-8">
                { `Time remaining: ${formatTime(timer)}`}
              </Text>}
              <View className="flex flex-row mt-5 justify-center">
                <Text>did not recieved the otp? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("register")}>
                  <Text className="text-[#4682B4]"> Send OTP</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className={`border rounded-3xl text-xl p-3 mt-6 mb-8 ${
                    loading || timer<=0 ? "border-gray-300 bg-[#efefef]" : "bg-[#4682B4]"
                  }`}
                  disabled={loading && timer<0}
                >
                  <Text
                    className={`text-lg text-center font-extrabold ${
                      loading || timer<=0 ? "text-[#aaa]" : "text-white"
                    }`}
                  >
                    {loading ? "loading ..." : "Verify OTP"}
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
