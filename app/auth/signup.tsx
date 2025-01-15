import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Universal alert function
const showAlert = (title: string, message: string): void => {
  if (Platform.OS === "web") {
    window.alert(`${title}: ${message}`);
  } else {
    Alert.alert(title, message);
  }
};

// Cek login dari cookie
const getCookie = (name: string): string | null => {
  if (Platform.OS !== "web") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

// Validasi email
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  // Cek status login
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = (await AsyncStorage.getItem("userData")) || getCookie("userData");      

        if (Platform.OS === "web") {
          if (userData) {
            setIsLoggedIn(true);
          }
        } else {
          const storageData = await AsyncStorage.getItem("userData");
            if (storageData) {
              const userDataParse = JSON.parse(storageData);
            }        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      showAlert("Error", "Anda sudah login. Tidak dapat membuat akun baru.");
      router.push("/course"); // Redirect ke halaman utama atau course
    }
  }, [isLoggedIn]);

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
      // Kirim permintaan pendaftaran ke backend
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert("Error", data.message || "Terjadi kesalahan saat membuat akun.");
        return;
      }

      showAlert("Berhasil", "Akun berhasil dibuat. Silakan login.");
      router.push("/auth/signin"); // Redirect ke halaman login
    } catch (error) {
      console.error("Sign up error:", error);
      showAlert("Error", "Terjadi kesalahan saat membuat akun.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <View className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <View className="bg-blue-500 px-6 py-8">
          <Text className="text-white text-xl font-bold">Selamat Datang di EngLearn!</Text>
          <Text className="text-white mt-2">
            Daftar untuk mulai belajar bahasa Inggris dengan mudah dan efektif.
          </Text>
        </View>

        <View className="p-6 space-y-4">
          <View className="mb-4">
            <Text className="text-gray-700 font-medium">Nama Lengkap</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Masukkan nama lengkap Anda"
              className="border border-gray-300 rounded-full px-4 py-3 mt-2 text-gray-700"
              style={{ backgroundColor: "transparent" }}
            />
          </View>

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
            onPress={handleSignUp}
            className="bg-blue-500 py-3 rounded-full shadow-sm"
          >
            <Text className="text-white text-center font-bold text-lg">Daftar</Text>
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

export default SignUpScreen;
