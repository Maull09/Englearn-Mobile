import React from "react";
import { View, Text, Image } from "react-native";

type HeaderProps = {
  title: string;
  userName: string;
  profileImageSrc: string;
};

export const Header = ({ title, userName, profileImageSrc }: HeaderProps) => {
  return (
    <View className="sticky top-0 mb-5 flex-row items-center justify-between border-b-2 border-gray-300 bg-white pb-3 px-6 text-gray-400 mt-3">
      {/* Logo */}
      <Image
        source={require("../../assets/images/united-kingdom.png")} // Sesuaikan path dengan gambar logo Anda
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-lg font-bold flex-1 text-center text-gray-300">{title}</Text>

      {/* User Info */}
      <View className="flex-row items-center">
        <Image
          source={
            profileImageSrc
              ? { uri: profileImageSrc }
              : require("../../assets/images/book_5221784.png") // Default profile image
          }
          style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1 }}
          resizeMode="cover"
        />
        <Text className="ml-2 font-semibold text-gray-300">{userName}</Text>
      </View>
    </View>
  );
};
