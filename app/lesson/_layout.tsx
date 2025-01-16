import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";

const LessonLayout = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
        {/* Container dengan ukuran terbatas */}
        <View className="w-full max-w-md bg-white flex-1 rounded-lg overflow-hidden shadow-lg">

        {/* Main Content */}
        <View className="flex-1 px-5 py-3">
            <Slot />
        </View>

        </View>
  </View>
  );
};

export default LessonLayout;
