import React from "react";
import { View, Text, Image } from "react-native";

const Header = () => (
  <View className="h-16 bg-blue-500 flex-row items-center justify-between px-4">
    {/* Logo */}
    <View className="flex-row items-center">
      <Image
        source={require("@/assets/images/icon.png")} // Pastikan logo ada di folder assets
        className="w-8 h-8"
        resizeMode="contain"
      />
      <Text className="ml-2 text-white text-lg font-bold">EngLearn</Text>
    </View>
  </View>
);

export default Header;
