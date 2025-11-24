import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="connectedApps"
        options={{
          title: "Connected Apps",
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="investorTermDictionary"
        options={{
          title: "Investor Term Dictionary",
          headerShown: false,
        }}
      /> */}
    </Stack>
  );
}
