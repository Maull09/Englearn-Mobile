import React from 'react';
import { View, Text } from 'react-native';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <View className="w-full max-w-md bg-white flex-1 rounded-lg overflow-hidden shadow-lg">
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 py-4 bg-gray-100 border-b border-gray-200">
          <Text className="text-2xl font-bold text-blue-500">EngLearn</Text>
          <Text className="text-base font-semibold text-gray-700">LOGIN</Text>
        </View>

        {/* Main Content */}
        <View className="flex-1 px-5 py-3">
          <Slot />
        </View>

        {/* Footer */}
        <View className="w-full items-center py-4 bg-gray-100 border-t border-gray-200">
          <Text className="text-sm text-gray-500">© 2024 EngLearn. All rights reserved.</Text>
        </View>
      </View>
    </View>
  );
}
