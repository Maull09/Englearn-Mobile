import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRouter } from "expo-router";

type QuizProps = {
  lesson: {
    id: number;
    title: string;
    challenges: {
      id: number;
      question: string;
      challengeOptions: { id: number; text: string; correct: boolean }[];
      completed: boolean;
    }[];
  };
  userId: string; // Tambahkan userId untuk API
  isLessonCompleted: boolean;
};

export const Quiz = ({ lesson, userId, isLessonCompleted }: QuizProps) => {
  const router = useRouter();

  const [status, setStatus] = useState<"correct" | "wrong" | "none" | "completed">(
    isLessonCompleted ? "completed" : "none"
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const markLessonComplete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/progress/${userId}/lesson/${lesson.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark lesson as complete.");
      }

      Alert.alert("Lesson Completed", "Great job! You've completed the lesson.");
      setShowConfetti(true);
    } catch (error) {
      console.error("Error marking lesson as complete:", error);
      Alert.alert("Error", "Could not mark the lesson as complete.");
    }
  };

  const onCompleteLesson = async () => {
    await markLessonComplete();
    setTimeout(() => {
      router.push("/course"); // Redirect to course list
    }, 3000);
  };

  if (showConfetti) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fadeOut />
        <View className="items-center">
          <Image
            source={require("@/assets/images/finish.svg")}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
          <Text className="text-lg font-bold text-neutral-700 text-center mt-4">
            Great job! {"\n"} You've completed the lesson.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/course")}
          className="bg-blue-500 px-6 py-3 rounded-full mt-6"
        >
          <Text className="text-white font-bold text-lg">Back to Lessons</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-lg font-bold text-gray-700 text-center">{lesson.title}</Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <Text className="text-lg font-bold text-gray-800 mb-6">Complete all challenges to finish this lesson!</Text>
      </View>

      <View className="p-6">
        <TouchableOpacity
          onPress={onCompleteLesson}
          className={`py-3 rounded-full bg-blue-500`}
        >
          <Text className="text-center text-white font-bold text-lg">Mark Lesson as Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
