import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { NotebookText } from "lucide-react-native"; // Make sure you have this package installed

type UnitBannerProps = {
  title: string;
  description: string;
};

const UnitBanner: React.FC<UnitBannerProps> = ({ title, description }) => {
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center w-full bg-blue-500 p-5 rounded-xl">
      {/* Text Content */}
      <View className="flex-1 pr-4">
        <Text className="text-2xl font-bold text-white mb-2">{title}</Text>
        <Text className="text-lg text-white">{description}</Text>
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={() => router.push("/lesson")} // Adjust the route as necessary
        activeOpacity={0.8}
        className="flex-row items-center justify-center bg-white px-4 py-2 rounded-lg border-2 border-blue-700"
      >
        <NotebookText className="mr-2 text-blue-500" size={20} />
        <Text className="text-blue-500 font-bold text-lg">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UnitBanner;