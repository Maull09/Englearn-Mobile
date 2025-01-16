import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";

type CardProps = {
  id: number;
  text: string;
  selected?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
};

export const Card = ({
  text,
  selected = false,
  onClick,
  status = "none",
  disabled = false,
}: CardProps) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  // Determine dynamic styles based on props
  const cardStyle = [
    "rounded-xl border-2 p-4 mb-2",
    selected ? "border-sky-300 bg-sky-100" : "border-gray-200 bg-white",
    selected && status === "correct" && "border-green-300 bg-green-100",
    selected && status === "wrong" && "border-rose-300 bg-rose-100",
    disabled && "opacity-50",
  ].join(" ");

  const textStyle = [
    "text-sm text-neutral-600",
    selected ? "text-sky-500" : "text-gray-700",
    selected && status === "correct" && "text-green-500",
    selected && status === "wrong" && "text-rose-500",
  ].join(" ");

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      onPress={handleClick}
      className={cardStyle}
      disabled={disabled}
    >
      <Text className={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
