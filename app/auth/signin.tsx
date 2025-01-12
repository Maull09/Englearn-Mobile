import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { userProfile } from "@/db/schema";

// Universal alert function
export interface AlertFunction {
    (title: string, message: string): void;
}

const showAlert: AlertFunction = (title, message) => {
    if (Platform.OS === "web") {
        // Use window.alert for web
        window.alert(`${title}: ${message}`);
    } else {
        // Use Alert for mobile
        Alert.alert(title, message);
    }
};

export interface ValidateEmailFunction {
    (email: string): boolean;
}

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const router = useRouter(); // Navigation

const validateEmail: ValidateEmailFunction = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert("Error", "Email dan password tidak boleh kosong.");
      return;
    }

    if (!validateEmail(email)) {
      showAlert("Error", "Format email tidak valid.");
      return;
    }

    try {
      // Query user by email
      const user = await db.query.userProfile.findFirst({
        where: eq(userProfile.email, email),
      });

      if (user) {
        // Validate password
        if (user.password === password) {
          // Store user data in AsyncStorage
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify({
              userId: user.userId,
              userName: user.userName,
              email: user.email,
            })
          );

          showAlert("Login Berhasil", `Selamat datang, ${user.userName}!`);
          router.push("../course"); // Navigate to the main page
        } else {
          showAlert("Login Gagal", "Password Anda salah. Silakan coba lagi.");
        }
      } else {
        showAlert("Login Gagal", "Pengguna tidak ditemukan.");
      }
    } catch (error) {
      showAlert("Error", "Terjadi kesalahan saat memproses login.");
      console.error(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      {/* Container */}
      <View className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <View className="bg-blue-500 px-6 py-8">
          <Text className="text-white text-xl font-bold">
            Ayo, login untuk melanjutkan perjalanan Anda bersama EngLearn.
          </Text>
        </View>

        {/* Form */}
        <View className="p-6 space-y-4">
          {/* Email Input */}
          <View className="mb-4 md:mb-0">
            <Text className="text-gray-700 font-medium">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan email Anda"
              className="border border-gray-300 rounded-full px-4 py-3 mt-2 text-gray-700"
              style={{
                backgroundColor: "transparent",
              }}
            />
          </View>

          {/* Password Input */}
          <View className="mb-8 md:mb-0">
            <Text className="text-gray-700 font-medium">Password</Text>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Masukkan password Anda"
                secureTextEntry={!isPasswordVisible}
                className="border border-gray-300 rounded-full px-4 py-3 mt-2 text-gray-700"
                style={{
                  backgroundColor: "transparent",
                }}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
                className="absolute right-4 top-4"
              >
                <Text className="text-blue-500 mt-1">
                  {isPasswordVisible ? "Sembunyikan" : "Tampilkan"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-blue-500 py-3 rounded-full shadow-sm"
          >
            <Text className="text-white text-center font-bold text-lg">Masuk</Text>
          </TouchableOpacity>

          {/* Back to Landing Page Button */}
          <TouchableOpacity
            onPress={() => router.push("/")} // Navigate to Landing Page
            className="mt-4 py-3 rounded-full border border-blue-500"
          >
            <Text className="text-blue-500 text-center font-bold text-lg">
              Kembali ke Halaman Utama
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
