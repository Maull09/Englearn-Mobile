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
    </View>
  );
};

export default UnitBanner;