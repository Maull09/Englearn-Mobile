import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

type HeaderProps = {
  title: string;
  userName: string;
  profileImageSrc: string;
};

export const Header = ({ title, userName, profileImageSrc }: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://englearnuniversal.vercel.app/api/auth/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are cleared
      });

      if (!response.ok) {
        throw new Error("Failed to logout.");
      }

      Alert.alert("Success", "You have been logged out.");
      router.push("/"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  return (
    <View className="sticky top-0 mb-5 flex-row items-center justify-between border-b-2 border-gray-300 bg-white pb-3 px-6 text-gray-400 mt-3 z-50">
      {/* Logo */}
      <Image
        source={require("../../assets/images/united-kingdom.png")} // Adjust logo path
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-lg font-bold flex-1 text-center text-gray-700">{title}</Text>

      {/* Profile Icon and Dropdown */}
      <View className="relative">
        <TouchableOpacity onPress={() => setShowDropdown((prev) => !prev)}>
          <Image
            source={
              profileImageSrc
                ? { uri: profileImageSrc }
                : require("../../assets/images/default_avatar.png") // Default profile image
            }
            style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1 }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {showDropdown && (
          <View className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg p-4 z-96">
            {/* User Name */}
            <Text className="text-center font-bold text-gray-700 mb-3">{userName}</Text>

            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="py-2 rounded bg-red-500"
            >
              <Text className="text-center text-white font-bold">Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
