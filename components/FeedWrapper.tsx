import React, { PropsWithChildren } from "react";
import { View } from "react-native";

export const FeedWrapper = ({ children }: PropsWithChildren) => {
  return <View className="relative flex-1 pb-10 z-0">{children}</View>;
};
