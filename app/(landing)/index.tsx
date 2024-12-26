import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';

export default function LandingPage() {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Section 1 */}
      <View className="items-center mt-6 mb-12 md:mb-36 w-full max-w-md">
        <Image
          source={require('../../assets/images/undraw_Educator_re_ju47.png')}
          className="w-3/5 md:w-4/5 max-h-40 md:max-h-48 mb-4"
          resizeMode="contain"
        />
        <Text className="text-base md:text-lg font-bold text-blue-500 text-center mb-2">
          Cara menyenangkan, sederhana, dan efektif untuk menguasai Bahasa Inggris!
        </Text>
        <Text className="text-sm md:text-base text-gray-600 text-center mb-4 px-4">
          Belajar dengan cara yang dirancang untuk meningkatkan kemampuanmu secara signifikan!
        </Text>
        <TouchableOpacity className="bg-blue-500 py-3 px-8 md:px-10 rounded-lg mb-2">
          <Text className="text-white font-bold text-sm md:text-base">DAFTAR SEKARANG</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-blue-500 font-semibold text-sm md:text-base">SAYA SUDAH PUNYA AKUN</Text>
        </TouchableOpacity>
      </View>

      {/* Section 2 */}
      <View className="items-center mb-12 md:mb-36 w-full max-w-md">
        <Image
          source={require('../../assets/images/undraw_Mobile_interface_re_1vv9.png')}
          className="w-3/5 md:w-4/5 max-h-40 md:max-h-48 mb-4"
          resizeMode="contain"
        />
        <Text className="text-base md:text-lg font-bold text-blue-500 text-center mb-2">
          menyenangkan. sederhana. efektif.
        </Text>
        <Text className="text-sm md:text-base text-gray-600 text-center px-4">
          Belajar dengan EngLearn itu interaktif dan seru, dirancang untuk membantu kamu mencapai kemajuan berbahasa!
        </Text>
      </View>

      {/* Section 3 */}
      <View className="items-center mb-12 md:mb-8 w-full max-w-md">
        <Image
          source={require('../../assets/images/undraw_Social_interaction_re_dyjh.png')}
          className="w-3/5 md:w-4/5 max-h-40 md:max-h-48 mb-4"
          resizeMode="contain"
        />
        <Text className="text-base md:text-lg font-bold text-blue-500 text-center mb-2">
          Didukung oleh Ilmu Pengetahuan
        </Text>
        <Text className="text-sm md:text-base text-gray-600 text-center px-4">
          Kami menggabungkan metode pengajaran yang terbukti efektif dengan konten menarik untuk meningkatkan kemampuan
          membaca, menulis, mendengarkan, dan berbicara dalam Bahasa Inggris!
        </Text>
      </View>
    </ScrollView>
  );
}
