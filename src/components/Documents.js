import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Document from "./Document";
import { baseUrl } from "../../api/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Documents = () => {
  const [data, setData] = useState([
    {
      file_id: "",
      title: "",
      metadata: { tags: [], uploaded_at: "", file_type: "" },
    },
  ]);
  const [activeDocument, setActiveDocument] = useState(null); // Track active document ID

  const fetchDocuments = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${baseUrl}/documents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const toggleDocumentOptions = (fileId) => {
    setActiveDocument(activeDocument === fileId ? null : fileId);
  };

  return (
    <View>
      {data.map((file) => (
        <Document
          key={file.file_id}
          data={file}
          isActive={activeDocument === file.file_id}
          onToggle={() => toggleDocumentOptions(file.file_id)}
        />
      ))}
    </View>
  );
};

export default Documents;
