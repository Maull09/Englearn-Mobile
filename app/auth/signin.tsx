import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showAlert, getCookie, validateEmail } from "@/utils/util";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const checkIfLoggedIn = async () => {
    try {
      const userCookie = (await AsyncStorage.getItem("userData")) || getCookie("userData");      

      if (Platform.OS === "web") {
        // Check for cookies
        if (userCookie) {
          showAlert("Info", "Anda sudah login.");
          router.push("../course"); // Redirect to the course page
        }
      } else {
        // Check AsyncStorage for mobile
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          showAlert("Info", "Anda sudah login.");
          router.push("../course"); // Redirect to the course page
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

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
      // Send login request
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: Platform.OS === "web" ? "include" : "omit", // Use cookies for web
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert("Login Gagal", data.message || "Login failed");
        return;
      }

      // Handle session storage for mobile or cookies for web
      if (Platform.OS === "web") {
        // Cookies are handled automatically on the web
        showAlert("Login Berhasil", `Selamat datang, ${data.user?.userName || "User"}!`);
        router.push("../course");
      } else {
        // Store user data in AsyncStorage for mobile
        await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        showAlert("Login Berhasil", `Selamat datang, ${data.user?.userName || "User"}!`);
        router.push("../course");
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlert("Error", "Terjadi kesalahan saat memproses login.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <View className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <View className="bg-blue-500 px-6 py-8">
          <Text className="text-white text-xl font-bold">
            Ayo, login untuk melanjutkan perjalanan Anda bersama EngLearn.
          </Text>
        </View>

        <View className="p-6 space-y-4">
          <View className="mb-4">
            <Text className="text-gray-700 font-medium">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan email Anda"
              className="border border-gray-300 rounded-full px-4 py-3 mt-2 text-gray-700"
              style={{ backgroundColor: "transparent" }}
            />
          </View>

          <View className="mb-8">
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

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-blue-500 py-3 rounded-full shadow-sm"
          >
            <Text className="text-white text-center font-bold text-lg">Masuk</Text>
          </TouchableOpacity>

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

export default LoginScreen;
