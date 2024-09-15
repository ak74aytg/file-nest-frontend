import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import Icons from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
import { useDispatch } from "react-redux";
import { docUpdated } from "../../redux/features/DocsSlice";
import Alert from "./Alert";
import Loader from "./Loader";
import { ActivityIndicator } from "react-native-paper";

const Document = ({ data, isActive, onToggle }) => {
  const uploadedAt = data?.metaData?.uploaded_at || "";
  const dispatch = useDispatch();
  const [deleteCompleted, setDeleteCompleted] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("success");
  const [deleting, setDeleting] = useState(false);
  const [ocrGenerating, setOcrGenerating] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);
  const [ocrFailed, setOcrFailed] = useState(true);
  const file_id = data?.file_id || "";

  useEffect(() => {
    const handleBackPress = () => {
      if (isActive) {
        onToggle();
        return true;
      }
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [isActive]);

  const handleUpdate = () => {
    dispatch(docUpdated());
  };

  const handleAlertClose = () => {
    handleUpdate();
    setDeleteCompleted(false);
  };

  const deleteFile = async () => {
    setDeleting(true);

    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.delete(`${baseUrl}/documents`, {
        params: {
          file_id: file_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteStatus("success");
      setDeleting(false);
      setDeleteCompleted(true);

      return response.data;
    } catch (e) {
      console.log(e);
      setDeleteStatus("failed");
      setDeleting(false);
      setDeleteCompleted(true);
      throw new Error("Failed to delete your document");
    }
  };

  useEffect(() => {
    const getOcrStatus = async () => {
      try {
        // setOcrGenerating(true);
        setOcrFailed(false);
        setOcrSuccess(false);
        const token = await AsyncStorage.getItem("userToken");
        const response = await axios.get(`${baseUrl}/documents/ocr`, {
          params: {
            file_id: file_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOcrFailed(false);
        setOcrSuccess(true);
      } catch (e) {
        setOcrFailed(true);
        setOcrSuccess(false);
      }
      // setOcrGenerating(false);
    };
    getOcrStatus();
  }, []);

  const generateOCR = async () => {
    try {
      setOcrGenerating(true);
      setOcrSuccess(false);
      setOcrFailed(false);
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.put(
        `${baseUrl}/documents/ocr`,
        {
          // Data to send in the PUT request body
        },
        {
          // Params should go here
          params: { file_id: file_id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOcrSuccess(true);
      setOcrFailed(false);
    } catch (e) {
      console.log(e);
      setOcrFailed(true);
      setOcrSuccess(false);
    }
    setOcrGenerating(false);
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + "...";
    }
    return title;
  };

  const truncatedTitle = truncateTitle(data.title, 25);


  const fileType = data?.metaData?.file_type;
  let iconName = "";
  if (fileType === "octet-stream") {
    iconName = "file";
  } else if (fileType === "pdf") {
    iconName = "file-pdf";
  } else if (fileType === "jpeg") {
    iconName = "image";
  } else if (fileType.includes("document")) {
    iconName = "file-word";
  } else if (fileType.includes("powerpoint")) {
    iconName = "file-powerpoint";
  } else {
    iconName = "file";
  }


    return (
      <View
        className={`bg-[#fff] mx-3 mb-5 shadow shadow-black rounded-xl ${
          deleteCompleted ? "h-32" : ""
        }`}
      >
        <View className="flex flex-row justify-between px-4 items-center">
          {deleting && <Loader />}
          {deleteCompleted && (
            <Alert
              className=""
              status={deleteStatus}
              onClose={handleAlertClose}
              error={"found"}
              success={"deleted"}
            />
          )}
          <TouchableOpacity
            //   onPress={() => onToggle(false)}
            className="h-16 w-[80%] flex flex-row items-center"
          >
            <View className="bg-[#B3E5FC] h-8 w-8 items-center justify-center rounded-md mr-4">
                <Icons name={iconName} size={20} color={"blue"} />
            </View>
            <View>
              <Text className="text-lg">{truncatedTitle}</Text>
              <Text style={{ fontSize: 12 }} className="font-extralight">
                {uploadedAt
                  ? moment(uploadedAt).format("DD/MM/YYYY h:mma")
                  : "No Date"}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => {
                if (ocrFailed) {
                  generateOCR();
                }
              }}
            >
              {ocrGenerating && <ActivityIndicator />}
              {ocrSuccess && (
                <Icons name="check-circle" size={20} color={"green"} />
              )}
              {ocrFailed && (
                <Icons name="exclamation-triangle" size={20} color={"orange"} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="h-full flex flex-row items-center"
            onPress={onToggle}
          >
            <Icons name="ellipsis-h" size={20} color={"#808080"} />
          </TouchableOpacity>
        </View>

        {/* Options view */}
        {isActive && (
          <View
            style={{ position: "absolute", bottom: 50, right: 8 }}
            className="bg-slate-100 w-32 p-4 rounded-md shadow"
          >
            <TouchableOpacity
              className="mb-4"
              onPress={() => {
                /* Handle Open */ onToggle();
              }}
            >
              <Text className="text-lg">Open</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-4"
              onPress={() => {
                /* Handle Edit */ onToggle();
              }}
            >
              <Text className="text-lg">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteFile();
                /* Handle Delete */ onToggle();
              }}
            >
              <Text className="text-lg text-red-500">Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
};

export default Document;
