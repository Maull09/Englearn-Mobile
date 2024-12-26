import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function LandingPage() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Section 1 */}
      <View style={styles.section}>
        <Image source={require('../../assets/images/undraw_Educator_re_ju47.png')} style={styles.image} />
        <Text style={styles.title}>Cara menyenangkan, sederhana, dan efektif untuk menguasai Bahasa Inggris!</Text>
        <Text style={styles.description}>
          Belajar dengan cara yang dirancang untuk meningkatkan kemampuanmu secara signifikan!
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>DAFTAR SEKARANG</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>SAYA SUDAH PUNYA AKUN</Text>
        </TouchableOpacity>
      </View>

      {/* Section 2 */}
      <View style={styles.section}>
        <Image source={require('../../assets/images/undraw_Mobile_interface_re_1vv9.png')} style={styles.image} />
        <Text style={styles.title}>menyenangkan. sederhana. efektif.</Text>
        <Text style={styles.description}>
          Belajar dengan EngLearn itu interaktif dan seru, dirancang untuk membantu kamu mencapai kemajuan berbahasa!
        </Text>
      </View>

      {/* Section 3 */}
      <View style={styles.section}>
        <Image source={require('../../assets/images/undraw_Social_interaction_re_dyjh.png')} style={styles.image} />
        <Text style={styles.title}>Didukung oleh Ilmu Pengetahuan</Text>
        <Text style={styles.description}>
          Kami menggabungkan metode pengajaran yang terbukti efektif dengan konten menarik untuk meningkatkan kemampuan
          membaca, menulis, mendengarkan, dan berbicara dalam Bahasa Inggris!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  section: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    maxWidth: 360, // Membatasi lebar tiap section agar tetap responsif
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain', // Menjaga proporsi gambar
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
  },
});
