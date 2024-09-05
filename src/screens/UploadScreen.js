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
import { ProgressBar, TextInput } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../components/Alert";
import Capsule from "../components/Capsule";
import { taglist } from "../constants/tags";

const UploadScreen = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("success"); // Default status
  const { height } = Dimensions.get("window");
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState(null);
  const [fileExtension, setFileExtension] = useState(""); // To store the original file extension

  const pickFiles = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.canceled === false) {
      // Extract the original file extension
      const originalFileName = result.assets[0].name;
      const extension = originalFileName.split(".").pop();

      setFileUri(result.assets[0].uri);
      setFileName(originalFileName.replace(`.${extension}`, "")); // Remove extension for user input
      setFileExtension(extension); // Store the original extension
      setFormData(null); // Clear previous form data
    } else {
      console.log("Document picking was canceled");
    }
  };

  const handleUpload = async () => {
    if (fileUri && fileName && fileExtension) {
      // Create FormData with the correct MIME type
      const data = new FormData();
      data.append("file", {
        uri: fileUri,
        type: "application/octet-stream", // Default MIME type; adjust if necessary
        name: `${fileName}.${fileExtension}`, // Reattach the original extension
      });
      setFormData(data);

      setUploading(true);
      const token = await AsyncStorage.getItem("userToken");

      try {
        const response = await axios.post(`${baseUrl}/documents`, data, {
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
          setUploadCompleted(true);
          setUploadStatus("success");
          console.log("Upload successful:", response.data);
        } else {
          setUploadCompleted(true);
          setUploadStatus("error");
          console.log("Upload failed:", response.data);
        }
      } catch (error) {
        setUploading(false);
        setUploadCompleted(true);
        setUploadStatus("error");
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("File URI, name, or extension is missing");
    }
    setUploading(false)
  };

  const handleAlertClose = () => {
    setUploadCompleted(false);
  };

  return (
    <ScrollView>
      <View
        style={{ height: height }}
        className={uploadCompleted ? "bg-slate-200" : "bg-white"}
      >
        {uploadCompleted && (
          <Alert status={uploadStatus} onClose={handleAlertClose} />
        )}
        <View className="mt-5" style={{ flex: 1, alignItems: "center" }}>
          <View className="mt-8 mb-24">
            <Text className="text-center text-lg">
              Your file has been saved to the cloud.
            </Text>
            <Text>You can access your file anytime from your account.</Text>
          </View>
          <View className="mb-10 w-80 h-40 p-8 border-dashed border">
            <TouchableOpacity
              className="w-full h-full items-center"
              onPress={pickFiles}
            >
              <Icons name="upload" size={100} color={"blue"} />
            </TouchableOpacity>
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
            <View className="w-full px-10"></View>
          )}

          <View className="w-full px-16 ">
            <TextInput
              className="h-10 bg-transparent"
              value={fileName}
              onChangeText={(text) => {
                setFileName(text);
              }}
              placeholder="title"
            />
          </View>
          <View className='w-full pt-5 px-10 mb-5 bg-white h-52'>
            <View className='bg-orange-50 w-full rounded-lg h-full flex flex-row flex-wrap p-2'>
              {
                taglist.map((tag) => {
                  return <Capsule tag={tag} key={tag.tag} />;
                })
              }
              </View>
          </View>
          <View className="w-48 mb-10">
            <TouchableOpacity
              className="bg-blue-300 py-4 rounded-3xl"
              onPress={handleUpload}
            >
              <Text className="text-xl text-center">Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadScreen;
