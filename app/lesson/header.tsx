import React from "react";
import { View, Text } from "react-native";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <View className="sticky top-0 mb-5 flex-row items-center justify-center border-b-2 border-gray-200 bg-white pb-3">
      <Text className="text-lg font-bold text-gray-400">{title}</Text>
    </View>
  );
};
