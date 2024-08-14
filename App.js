import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import OTPScreen from "./src/screens/OTPScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux/store/Store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Group
            screenOptions={{
              headerTitle: () => (
                <View className="pt-24 pb-24">
                  <Text className="text-white text-7xl">FileNest</Text>
                  <Text className="text-white text-center text-lg">
                    SCAN * STORE * ACCESS
                  </Text>
                </View>
              ),
              headerStyle: {
                backgroundColor: "#1b1534",
              },
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen name="login" component={LoginScreen} />

            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="otp" component={OTPScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
