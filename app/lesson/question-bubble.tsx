import React from "react";
import { View, Text, Image, Platform } from "react-native";

type QuestionBubbleProps = {
  question: string;
};

export const QuestionBubble = ({ question }: QuestionBubbleProps) => {
  return (
    <View className="mb-6 flex-row items-center gap-x-4">
      {/* Mascot Image */}
      <Image
        source={require("@/assets/images/person-choosing-direction-illustration_24877-82864.jpg")} // Ganti path sesuai struktur proyek Anda
        style={{
          width: Platform.OS === "web" ? 150 : 40,
          height: Platform.OS === "web" ? 150 : 40,
        }}
        resizeMode="contain"
      />

      {/* Question Bubble */}
      <View className="relative rounded-xl border-2 border-gray-300 bg-white px-4 py-2">
        <Text className="text-sm lg:text-base">{question}</Text>

        {/* Bubble Tail */}
        <View
          className="absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 border-t-[8px] border-x-[8px] border-t-gray-300 border-x-transparent"
        />
      </View>
    </View>
  );
};
