import React from "react";
import { View, Text } from "react-native";
import { QuestionBubble } from "./question-bubble"; // Import QuestionBubble component

type ChallengeProps = {
  options: { id: number; text: string }[]; // List of challenge options
  question: string; // Question text for the challenge
  onSelect: (id: number) => void; // Function to call when an option is selected
  status: "correct" | "wrong" | "none" | "completed"; // Current status of the selection
  selectedOption?: number; // Currently selected option ID
  disabled?: boolean; // If the challenge is disabled
};

export const Challenge = ({
  options,
  question,
  onSelect,
  status,
  selectedOption,
  disabled = false,
}: ChallengeProps) => {
  return (
    <View className="flex flex-col gap-4">
      {/* Question Bubble */}
      <QuestionBubble question={question} />

      {/* Challenge Options */}
      <View className="flex flex-row flex-wrap justify-between gap-4">
        {options.map((option) => (
          <View key={option.id} className="w-[48%]">
            {/* Option Text */}
            <Text
              className={`p-4 text-center rounded-lg ${
                selectedOption === option.id
                  ? status === "correct"
                    ? "bg-green-100 text-green-600"
                    : status === "wrong"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              } ${disabled ? "opacity-50" : "opacity-100"}`}
              onPress={() => !disabled && onSelect(option.id)}
            >
              {option.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
