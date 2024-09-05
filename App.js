import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import OTPScreen from "./src/screens/OTPScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux/store/Store";
import HomeScreen from "./src/screens/HomeScreen";
import SplashScreen from "./src/screens/SplashScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShareScreen from "./src/screens/ShareScreen";
import UploadScreen from "./src/screens/UploadScreen";
import Icons from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName="homeScreen">
      <Tab.Group screenOptions={{ headerShown: false }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Icons
                  name={"home"}
                  size={20}
                  color={focused ? "blue" : "black"}
                />
              );
            },
          }}
          name="homeScreen"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Icons
                  name={"share"}
                  size={20}
                  color={focused ? "blue" : "black"}
                />
              );
            },
          }}
          name="share"
          component={ShareScreen}
        />
        <Tab.Screen
          options={{
            headerShown: true,
            headerTitle: () => (
              <View className="">
                <Text className="text-2xl text-white">Uplaod Document</Text>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#4682B4",
            },
            headerTitleAlign: "center",
            tabBarIcon: ({ focused }) => {
              return (
                <Icons
                  name={"upload"}
                  size={20}
                  color={focused ? "blue" : "black"}
                />
              );
            },
          }}
          name="upload"
          component={UploadScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Icons
                  name={"gear"}
                  size={20}
                  color={focused ? "blue" : "black"}
                />
              );
            },
          }}
          name="setting"
          component={UploadScreen}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
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
                backgroundColor: "#4682B4",
              },
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="otp" component={OTPScreen} />
          </Stack.Group>
          <Stack.Screen
            options={{ headerShown: false }}
            name="home"
            component={HomeTabs}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
