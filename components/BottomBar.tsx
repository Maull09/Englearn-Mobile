import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const BottomBar = () => (
  <View className="h-16 bg-gray-100 flex-row justify-around items-center border-t border-gray-300">
    <TouchableOpacity className="flex items-center">
      <Text className="text-blue-500 font-bold">Home</Text>
    </TouchableOpacity>
    <TouchableOpacity className="flex items-center">
      <Text className="text-gray-500 font-bold">Profile</Text>
    </TouchableOpacity>
  </View>
);

export default BottomBar;
