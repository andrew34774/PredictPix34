import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { MarketCreationProvider } from '@/context/MarketCreationContext';
import { API_URL } from '@/constants/Config';

export default function RootLayout() {
  console.log("API_URL", API_URL);
  return (
    <AuthProvider>
      <MarketCreationProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#111827',
              },
              headerTintColor: '#FFFFFF',
              headerShadowVisible: false,
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="withdraw-pi"
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="profile-edit"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="referral/history"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </MarketCreationProvider>
    </AuthProvider>
  );
}
