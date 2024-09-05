import React, { useEffect, useState } from 'react';
import { BackHandler, ScrollView, Text, ToastAndroid, View } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import DonutChart from '../components/DonutChart';
import SearchPanel from '../components/SearchPanel';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Documents from '../components/Documents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../api/baseUrl';




export default function HomeScreen({ navigation, route }) {
  const { user } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const check = await axios.get(`${baseUrl}/test/welcome`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setCurrentUser(check.data);
      } catch (e) {
        console.log(e);
      }
    };
    checkLoginState();
  }, []);

  

  useEffect(() => {
    const backAction = () => {
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





const data = [
  {
    name: "Videos",
    population: 9,
    color: "#f39c12",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Images",
    population: 4,
    color: "#2980b9",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "PDFs",
    population: 19,
    color: "#2ecc71",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Others",
    population: 0,
    color: "#d35400",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];





  return (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-white">
          <HomeHeader
            user={currentUser ? currentUser : user}
            navigation={navigation}
          />
          <DonutChart data={data} />
          <SearchPanel />
          <Text className="mx-3 text-lg mb-9">Your Files</Text>
          <Documents />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
