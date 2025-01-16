import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle, XCircle } from "react-native-feather"; // Gunakan library seperti react-native-feather untuk ikon
import { useWindowDimensions } from "react-native";

type FooterProps = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  isVideoLesson?: boolean; // Indicates if the lesson is a video
};

export const Footer = ({
  onCheck,
  status,
  disabled = false,
  isVideoLesson = false,
}: FooterProps) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 1024; // Responsivitas untuk perangkat mobile

  const getStatusMessage = () => {
    if (status === "correct") return "Nicely done!";
    if (status === "wrong") return "Try again.";
    return null;
  };

  const getButtonLabel = () => {
    if (status === "none") return isVideoLesson ? "Complete" : "Check";
    if (status === "correct") return "Next";
    if (status === "wrong") return "Retry";
    if (status === "completed") return "Continue";
    return "";
  };

  return (
    <View
      className={`
        h-24 border-t-2 px-4 flex-row items-center justify-between
        ${status === "correct" ? "border-transparent bg-green-100" : ""}
        ${status === "wrong" ? "border-transparent bg-rose-100" : ""}
      `}
    >
      {/* Status Message */}
      {status !== "none" && (
        <View className="flex-row items-center">
          {status === "correct" && (
            <CheckCircle className="text-green-500 mr-4" width={24} height={24} />
          )}
          {status === "wrong" && (
            <XCircle className="text-rose-500 mr-4" width={24} height={24} />
          )}
          <Text
            className={`
              text-base font-bold
              ${status === "correct" ? "text-green-500" : ""}
              ${status === "wrong" ? "text-rose-500" : ""}
            `}
          >
            {getStatusMessage()}
          </Text>
        </View>
      )}

      {/* Action Button */}
      <TouchableOpacity
        disabled={disabled}
        onPress={onCheck}
        className={`
          ml-auto py-2 px-4 rounded-lg
          ${disabled ? "bg-gray-300" : status === "wrong" ? "bg-rose-500" : "bg-blue-500"}
        `}
      >
        <Text className={`text-white text-lg font-bold`}>
          {getButtonLabel()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
