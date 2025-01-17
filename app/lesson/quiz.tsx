import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRouter } from "expo-router";
import { showAlert } from "@/utils/util";

type QuizProps = {
  userId: string;
  lesson: {
    id: number;
    title: string;
    challenges: {
      id: number;
      question: string;
      challengeOptions: { id: number; text: string }[];
      completed: boolean;
    }[];
  };
  isLessonCompleted: boolean;
};

export const Quiz = ({ lesson, userId, isLessonCompleted }: QuizProps) => {
  const router = useRouter();

  const initialIndex =
    lesson.challenges.findIndex((challenge) => !challenge.completed) === -1
      ? 0
      : lesson.challenges.findIndex((challenge) => !challenge.completed);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined);
  const [showConfetti, setShowConfetti] = useState(false);

  const challenge = lesson.challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const markLessonComplete = async () => {
    try {
      const response = await fetch(
        `https://englearnuniversal.vercel.app/api/progress/${userId}/lesson/${lesson.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark lesson as complete.");
      }

      showAlert("Lesson Completed", "Great job! You've completed the lesson.");
      setShowConfetti(true);
    } catch (error) {
      console.error("Error marking lesson as complete:", error);
      showAlert("Error", "Could not mark the lesson as complete.");
    }
  };

  const onCompleteLesson = async () => {
    await markLessonComplete();
    setTimeout(() => {
      router.push("/course"); // Redirect to course list
    }, 3000);
  };

  const onNextChallenge = () => {
    if (activeIndex < lesson.challenges.length - 1) {
      setActiveIndex((prev) => prev + 1);
      setSelectedOption(undefined);
    } else {
      onCompleteLesson();
    }
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
        <View className="w-4/5">
          <Text className="text-lg font-bold text-gray-800 mb-6">{challenge.question}</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedOption(option.id)}
              className={`mb-3 p-4 rounded-lg ${
                selectedOption === option.id ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text className="text-base text-white">{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="p-6">
        <TouchableOpacity
          onPress={onNextChallenge}
          disabled={selectedOption === undefined}
          className={`py-3 rounded-full ${
            selectedOption !== undefined ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <Text className="text-center text-white font-bold text-lg">
            {activeIndex < lesson.challenges.length - 1 ? "Next" : "Finish"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
