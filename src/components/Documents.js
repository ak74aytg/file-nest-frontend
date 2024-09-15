import { View, Text, Button, FlatList } from "react-native";
import React, { useState, useCallback } from "react";
import Document from "./Document";
import { baseUrl } from "../../api/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { docNotUpdated } from "../../redux/features/DocsSlice";
import Loader from "./Loader";
import { ActivityIndicator } from "react-native-paper";

const fetchDocuments = async (size) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const response = await axios.get(`${baseUrl}/documents`, {
      params: {
        pageSize: size,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    throw new Error("Failed to fetch documents");
  }
};

const Documents = ({ navigation }) => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const queryClient = useQueryClient(); // For manual refetching
  const [documentCache, setDocumentCache] = useState([]);

  const handleUpdates = () => {
    dispatch(docNotUpdated());
  };
  const documentUpdateStatus = useSelector(
    (state) => state.docs.documentUpdateStatus
  );

  const [activeDocument, setActiveDocument] = useState(null);

  const {
    data: documents,
    isLoading,
    error,
    refetch,
    fetchNextPage, // Optional: If you want to trigger the fetching of the next page manually
  } = useQuery({
    queryKey: ["documents", pageSize],
    queryFn: () => fetchDocuments(pageSize),
  });

  if (documentUpdateStatus) {
    refetch();
    handleUpdates();
  }

  const loadMoreDocuments = async () => {
    if (JSON.stringify(documentCache) === JSON.stringify(documents)) {
      return;
    }
    setDocumentCache(documents);
    setIsFetchingMore(true); // Show loader during fetch
    setPageSize((prevSize) => prevSize + 5); // Increment the page size
    await queryClient.refetchQueries(["documents", pageSize]); // Refetch with updated page size
    setIsFetchingMore(false); // Hide loader after fetch
  };

  if (isLoading)
    return (
      <View className='mb-10'>
        {documentCache.map((file) => (
          <Document
            key={file.file_id}
            data={file}
            isActive={activeDocument === file.file_id}
            onToggle={() => toggleDocumentOptions(file.file_id)}
          />
        ))}
        <ActivityIndicator />
      </View>
    );
  if (error) return <Text>Error fetching documents: {error.message}</Text>;

  const toggleDocumentOptions = (fileId) => {
    setActiveDocument(activeDocument === fileId ? null : fileId);
  };

  return (
    <View>
      {documents && documents.length > 0 ? (
        // documents.map((file) => (
        //   <Document
        //     key={file.file_id}
        //     data={file}
        //     isActive={activeDocument === file.file_id}
        //     onToggle={() => toggleDocumentOptions(file.file_id)}
        //   />
        // ))
        <FlatList
          data={documents}
          keyExtractor={(item, index) => item.file_id}
          renderItem={({ item }) => (
            <Document
              data={item}
              isActive={activeDocument === item.file_id}
              onToggle={() => toggleDocumentOptions(item.file_id)}
            />
          )}
          onEndReached={loadMoreDocuments}
        />
      ) : (
        <View className="h-80 flex items-center">
          <Text className="text-lg mt-5 mb-5">No files available</Text>
          <Button
            onPress={() => navigation.navigate("upload")}
            title="upload"
          />
        </View>
      )}
    </View>
  );
};

export default Documents;
