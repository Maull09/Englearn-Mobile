import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>EngLearn</Text>
          <Text style={styles.login}>LOGIN</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Slot />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 EngLearn. All rights reserved.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  container: {
    width: '100%',
    maxWidth: 400, // Membatasi lebar konten
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderRadius: 10, // Opsional, menambahkan efek rounded
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  login: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#F8F8F8',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});
