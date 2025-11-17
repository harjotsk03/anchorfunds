import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  BookOpenText,
  CircleUserRound,
  GraduationCap,
  Home,
} from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,

        // 👇 Bottom tab bar styling
        tabBarStyle: {
          backgroundColor: "#1C4A8A", // your blue
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 14,
          paddingTop: 8,
        },

        // 👇 Icon/text colors
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#5f7db9ff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={17} color={color} />,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => <GraduationCap size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: "Resources",
          tabBarIcon: ({ color }) => <BookOpenText size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <CircleUserRound size={18} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
