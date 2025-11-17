import { Stack } from "expo-router";

export default function LearnLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide default header since you have custom one
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Modules",
        }}
      />
      <Stack.Screen
        name="[moduleId]"
        options={{
          title: "Lessons",
          headerShown: false,
          headerBackTitle: "Modules",
        }}
      />
    </Stack>
  );
}
