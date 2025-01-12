import React from "react";
import { View, Text } from "react-native";
import { Slot } from "expo-router";
import BottomBar from "@/components/BottomBar";

const MainLayout = () => (
  <View className="flex-1 justify-center items-center bg-white">
    {/* Container dengan ukuran terbatas */}
    <View className="w-full max-w-md bg-white flex-1 rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-blue-500">EngLearn</Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-5 py-3">
        <Slot />
      </View>

      {/* Footer (BottomBar) */}
      <BottomBar />
    </View>
  </View>
);

export default MainLayout;
