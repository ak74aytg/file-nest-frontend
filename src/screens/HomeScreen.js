import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { BackHandler, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove the token from AsyncStorage
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (e) {
      console.error("Failed to remove the token.");
    }
  };
  

  useEffect(() => {
    const backAction = () => {
      // Show toast or warning when back button is pressed
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

      // Handle double press to exit
      let backPressCount = 0;
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (backPressCount < 1) {
          backPressCount += 1;
          setTimeout(() => { backPressCount = 0 }, 2000);
          return true;
        } else {
          BackHandler.exitApp(); // Exit the app
          return false;
        }
      });

      return () => backHandler.remove();
    };

    // Add back handler listener
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Cleanup
  }, []);

  return (
    <View>
      {/* Your home screen content */}
      <Text>hii there i using whatsapp!!</Text>
      <TouchableOpacity onPress={logout}><Text classname="btn btn-blue">Logout</Text></TouchableOpacity>
    </View>
  );
}
