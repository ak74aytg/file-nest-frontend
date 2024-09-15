import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList, ScrollView, Text, ToastAndroid, View } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import DonutChart from '../components/DonutChart';
import SearchPanel from '../components/SearchPanel';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Documents from '../components/Documents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../api/baseUrl';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native-paper';




export default function HomeScreen({ navigation, route }) {
  const { user } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState(null);
  const documentUpdateStatus = useSelector(
    (state) => state.docs.documentUpdateStatus
  );

  const getAllTags = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${baseUrl}/documents/tags`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to fetch tags");
    }
  };

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
      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);

      let backPressCount = 0;
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (backPressCount < 1) {
            backPressCount += 1;
            setTimeout(() => {
              backPressCount = 0;
            }, 2000);
            return true;
          } else {
            BackHandler.exitApp();
            return false;
          }
        }
      );

      return () => backHandler.remove();
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const {
    data: tags,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTags,
  });

  useEffect(() => {
    if (documentUpdateStatus) {
      refetch();
    }
  }, [documentUpdateStatus, refetch]);


  const data =
    tags && tags.length > 0
      ? tags.map((tag, index) => ({
          name: tag.name,
          population: tag.file_with_tag,
          color: ["#f39c12", "#2980b9", "#2ecc71", "#d35400"][index % 4],
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        }))
      : [
          {
            name: "scan",
            population: 1,
            color: "#f39c12",
            legendFontColor: "#7f7f7f",
            legendFontSize: 15,
          },
          {
            name: "store",
            population: 1,
            color: "#2980b9",
            legendFontColor: "#7f7f7f",
            legendFontSize: 15,
          },
          {
            name: "access",
            population: 1,
            color: "#2ecc71",
            legendFontColor: "#7f7f7f",
            legendFontSize: 15,
          },
        ];

  return (
    <SafeAreaView>
      {/* Use FlatList and provide header and footer components */}
      <FlatList
        data={[]} // Empty data for FlatList, used for scrolling
        ListHeaderComponent={
          <View className="bg-white">
            <HomeHeader
              user={currentUser ? currentUser : user}
              navigation={navigation}
            />
            {!isLoading && tags && <DonutChart data={data} />}
            <SearchPanel />
            <Text className="mx-3 text-lg mb-9">Your Files</Text>
            <Documents navigation={navigation} />
          </View>
        }
        // ListFooterComponent={<Documents navigation={navigation} />}
        // ListEmptyComponent={
        //   isLoading ? <ActivityIndicator size="large" /> : null
        // }
      />
    </SafeAreaView>
  );
}
