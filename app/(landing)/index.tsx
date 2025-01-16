import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showAlert, getCookie } from "@/utils/util";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkLoginStatus = async () => {
    try {
      let userData = null;
      const userDataString = (await AsyncStorage.getItem("userData")) || getCookie("userData");      

      if (Platform.OS === "web") {
        // Periksa cookies untuk web
        console.log("cookieData", userDataString);
        if (userDataString) {
          userData = JSON.parse(userDataString);
          console.log("userData", userData);
          console.log("userId", userData.userId);
        }
      } else {
        // Periksa AsyncStorage untuk mobile
        const storageData = await AsyncStorage.getItem("userData");
        if (storageData) {
          userData = JSON.parse(storageData);
        }
      }

      // Set status login jika userData valid
      if (userData && userData.userId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleContinue = () => {
    if (isLoggedIn) {
      router.push("/course"); // Redirect ke halaman course jika sudah login
    } else {
      showAlert("Error", "Anda belum login.");
    }
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ alignItems: "center" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Section 1 */}
    <View className="items-center mt-4 md:mt-0 mb-12 w-full max-w-md px-4">
      <Image
        source={require("../../assets/images/undraw_Educator_re_ju47.png")}
        className="w-3/5 md:w-4/5 max-h-32 md:max-h-40 mb-4"
        resizeMode="contain"
      />
      <Text className="text-lg md:text-xl font-bold text-blue-500 text-center mb-2">
        Cara menyenangkan, sederhana, dan efektif untuk menguasai Bahasa Inggris!
      </Text>
      <Text className="text-sm md:text-base text-gray-600 text-center mb-6 px-4">
        Belajar dengan cara yang dirancang untuk meningkatkan kemampuanmu secara signifikan!
      </Text>
      {isLoggedIn ? (
        <TouchableOpacity
          onPress={handleContinue}
          className="bg-blue-500 py-3 px-10 rounded-lg shadow-md mb-4"
        >
          <Text className="text-white font-bold text-base">
            LANJUTKAN BELAJAR
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <Link
            href="/auth/signup"
            className="bg-blue-500 py-3 px-10 rounded-lg shadow-md mb-4"
          >
            <Text className="text-white font-bold text-base">
              DAFTAR SEKARANG
            </Text>
          </Link>
          <Link href="/auth/signin" className="mt-2">
            <Text className="text-blue-500 font-semibold text-base">
              SAYA SUDAH PUNYA AKUN
            </Text>
          </Link>
        </>
      )}
    </View>


      {/* Section 2 */}
      <View className="items-center -mt-36 md:mt-0 -mb-96 md:mb-48 w-full max-w-md">
        <Image
          source={require("../../assets/images/undraw_Mobile_interface_re_1vv9.png")}
          className="w-3/5 md:w-4/5 max-h-32 md:max-h-40 mb-2"
          resizeMode="contain"
        />
        <Text className="text-base md:text-lg font-bold text-blue-500 text-center mb-2">
          menyenangkan. sederhana. efektif.
        </Text>
        <Text className="text-sm md:text-base text-gray-600 text-center px-4">
          Belajar dengan EngLearn itu interaktif dan seru, dirancang untuk
          membantu kamu mencapai kemajuan berbahasa!
        </Text>
      </View>

      {/* Section 3 */}
      <View className="items-center -mt-36 md:mt-0 -mb-96 md:mb-8 w-full max-w-md">
        <Image
          source={require("../../assets/images/undraw_Social_interaction_re_dyjh.png")}
          className="w-3/5 md:w-4/5 max-h-32 md:max-h-40 mb-2"
          resizeMode="contain"
        />
        <Text className="text-base md:text-lg font-bold text-blue-500 text-center mb-2">
          Didukung oleh Ilmu Pengetahuan
        </Text>
        <Text className="text-sm md:text-base text-gray-600 text-center px-4">
          Kami menggabungkan metode pengajaran yang terbukti efektif dengan
          konten menarik untuk meningkatkan kemampuan membaca, menulis,
          mendengarkan, dan berbicara dalam Bahasa Inggris!
        </Text>
      </View>
    </ScrollView>
  );
}
