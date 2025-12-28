import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import "../global.css";

import { initDatabase } from "@/lib/database";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  useEffect(() => {
    async function setup() {
      try {
        await initDatabase();
      } catch (error) {
        console.error("Failed to initialize database:", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    setup();
  }, []);

  return (
    <ThemeProvider value={DarkTheme}>
      <View className="flex-1 bg-background">
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#09090b" },
            headerTintColor: "#fafafa",
            headerTitleStyle: { fontWeight: "600" },
            contentStyle: { backgroundColor: "#09090b" },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-transaction"
            options={{
              presentation: "modal",
              title: "Add Transaction",
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </View>
    </ThemeProvider>
  );
}
