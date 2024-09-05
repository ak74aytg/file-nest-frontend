import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Capsule = ({tag}) => {
  return (
    <View className="py-1 px-3 bg-gray-200 inline mx-1 my-1 rounded-xl">
      <TouchableOpacity className="w-full">
        <Text className="text-center">{tag.tag}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Capsule