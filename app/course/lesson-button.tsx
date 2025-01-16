import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Check, Crown, Star } from "lucide-react-native";
import { useRouter } from "expo-router";

interface LessonButtonProps {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  completed?: boolean;
}

const LessonButton: React.FC<LessonButtonProps> = ({
  id,
  index,
  totalCount,
  locked = false,
  current = false,
  completed = false,
}) => {
  const router = useRouter();

  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) indentationLevel = cycleIndex;
  else if (cycleIndex <= 4) indentationLevel = 4 - cycleIndex;
  else if (cycleIndex <= 6) indentationLevel = 4 - cycleIndex;
  else indentationLevel = cycleIndex - 8;

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = completed;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  const handlePress = () => {
    if (!locked) {
      router.push(`/lesson/${id}`); // Navigasi ke halaman pelajaran berdasarkan ID
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={locked}
      activeOpacity={locked ? 1 : 0.7}
      className="relative items-center"
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <View
        className="relative"
        style={{
          right: rightPosition,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <View className="relative h-[102px] w-[102px]">
            {/* Start Label */}
            <View className="absolute -top-6 left-2.5 z-10 animate-bounce rounded-xl border-2 border-gray-200 bg-white px-3 py-2.5 font-bold uppercase tracking-wide text-blue-500">
              <Text>Start</Text>
              <View
                className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-blue-500 border-x-transparent"
                aria-hidden
              />
            </View>

            {/* Current Lesson Icon */}
            <TouchableOpacity
              onPress={handlePress}
              className={`h-[70px] w-[70px] rounded-full border-b-8 border-blue-500 justify-center items-center ${
                locked ? "bg-neutral-400" : "bg-blue-500"
              }`}
            >
              <Icon
                size={40}
                color={locked ? "#A0A0A0" : "#FFFFFF"} // Warna ikon
                strokeWidth={isCompleted ? 4 : 2} // Tebal ikon
              />
            </TouchableOpacity>
          </View>
        ) : (
          // Default Lesson Icon
          <TouchableOpacity
            onPress={handlePress}
            className={`h-[70px] w-[70px] rounded-full border-b-8 border-blue-500 justify-center items-center ${
              locked ? "bg-neutral-400" : "bg-blue-500"
            }`}
          >
            <Icon
              size={40}
              color={locked ? "#A0A0A0" : "#FFFFFF"} // Warna ikon
              strokeWidth={isCompleted ? 4 : 2}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LessonButton;
