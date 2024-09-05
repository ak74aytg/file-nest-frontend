import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Icons from "react-native-vector-icons/FontAwesome";
import { ProgressBar } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../components/Alert";

const UploadScreen = () => {
  const [progress, setProgress] = useState(0);
  const { height } = Dimensions.get("window");
  const [uploading, setUploading] = useState(false);


  const pickFiles = async () => {
    const token = await AsyncStorage.getItem("userToken");
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.canceled === false) {
      setUploading(true);
      const formData = new FormData();

      formData.append("file", {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].name,
      });

      try {
        const response = await axios.post(`${baseUrl}/documents`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
            setProgress(percentCompleted / 100);
          },
        });

        if (response.status === 201) {
          setUploading(false);
          console.log("Upload successful:", response.data);
        } else {
          setUploading(false);
          console.log("Upload failed:", response.data);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      setUploading(false);
      console.log("Document picking was canceled");
    }
  };

  return (
    <ScrollView>
      <View style={{ height: height }} className="bg-white">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View className="mb-10">
            <Icons name="file-text" size={150} color={"blue"} />
          </View>
          {uploading ? (
            <View className="w-full px-10">
              <Text className="text-3xl text-center">Upload</Text>
              <View className="pt-5 pb-5">
                <ProgressBar
                  className="h-4 rounded-md bg-slate-200"
                  progress={progress}
                  color="blue"
                />
              </View>
              <Text className="text-lg text-center">File Uploading ...</Text>
            </View>
          ) : (
            <View className="w-full px-10">
              <Alert />
            </View>
          )}
          <View className="mt-8 mb-24">
            <Text className="text-center text-md">
              Your file has been saved to the cloud.
            </Text>
            <Text>You can access your file anytime from your account.</Text>
          </View>
          <View className="w-56 mb-10">
            <Button title="Upload" onPress={pickFiles} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadScreen;
