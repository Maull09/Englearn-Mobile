import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import db from "@/db/drizzle"; // Adjust path to your Drizzle setup
import { userProfile } from "@/db/schema"; // Adjust schema accordingly
import { AlertFunction, ValidateEmailFunction } from "./signin";
import { eq } from "drizzle-orm"; // Ensure eq is imported correctly

// Universal alert function
const showAlert: AlertFunction = (title, message) => {
    if (Platform.OS === "web") {
        // Use window.alert for web
        window.alert(`${title}: ${message}`);
    } else {
        // Use Alert for mobile
        Alert.alert(title, message);
    }
};

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const validateEmail: ValidateEmailFunction = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      showAlert("Error", "Semua kolom wajib diisi.");
      return;
    }

    if (!validateEmail(email)) {
      showAlert("Error", "Format email tidak valid.");
      return;
    }

    try {
      // Check if user already exists
      const existingUser = await db.query.userProfile.findFirst({
        where: eq(userProfile.email, email), // Fixed usage of eq
      });

      if (existingUser) {
        showAlert("Error", "Email sudah digunakan. Silakan gunakan email lain.");
        return;
      }

      // Insert new user
      await db.insert(userProfile).values({
        userId: crypto.randomUUID(), // Generate a unique ID for the user
        userName: name,
        email,
        password, // Note: Hash the password in a real app
      });

      showAlert("Berhasil", "Akun berhasil dibuat. Silakan login.");
      router.push("/auth/signin"); // Navigate to login page
    } catch (error) {
      showAlert("Error", "Terjadi kesalahan saat membuat akun.");
      console.error(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      {/* Container */}
      <View className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <View className="bg-blue-500 px-6 py-8">
          <Text className="text-white text-xl font-bold">Selamat Datang di EngLearn!</Text>
          <Text className="text-white mt-2">
            Daftar untuk mulai belajar bahasa Inggris dengan mudah dan efektif.
          </Text>
        </View>

        {/* Form */}
        <View className="p-6 space-y-4">
          {/* Name Input */}
          <View className="mb-4 md:mb-0">
            <Text className="text-gray-700 font-medium">Nama Lengkap</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Masukkan nama lengkap Anda"
              className="border border-gray-300 rounded-full px-4 py-3 mt-2 text-gray-700"
              style={{ backgroundColor: "transparent" }}
            />
          </View>

          {/* Email Input */}
          <View className="mb-4 md:mb-0">
            <Text className="text-gray-700 font-medium">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan email Anda"
              className="border border-gray-300 rounded-full px-4 py-3 mt-2 text-gray-700"
              style={{ backgroundColor: "transparent" }}
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
                style={{ backgroundColor: "transparent" }}
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

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-blue-500 py-3 rounded-full shadow-sm"
          >
            <Text className="text-white text-center font-bold text-lg">Daftar</Text>
          </TouchableOpacity>

          {/* Back to Landing Page Button */}
          <TouchableOpacity
            onPress={() => router.push("/")}
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

export default SignUpScreen;
