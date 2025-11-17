import { Stack } from "expo-router";

export default function ResourcesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Resources",
        }}
      />
      <Stack.Screen
        name="investmentCalculationSimulator"
        options={{
          title: "Investment Calculation Simulator",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
