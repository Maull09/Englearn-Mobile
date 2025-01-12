import React from "react";
import { View } from "react-native";
import Header from "@/components/Header";
import BottomBar from "@/components/BottomBar";
import { Slot } from "expo-router";

const MainLayout = () => (
  <View className="flex-1 bg-gray-100">

    {/* Main Content */}
    <View className="flex-1">
      <Slot />
    </View>

    {/* Bottom Bar */}
    <BottomBar />
  </View>
);

export default MainLayout;
