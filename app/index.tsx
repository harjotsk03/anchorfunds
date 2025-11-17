// app/index.tsx (CREATE THIS FILE)
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const fakeAuthCheck = async () => {
  return false; // Change to true to test logged-in state
};

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

  useEffect(() => {
    fakeAuthCheck().then(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? "/(tabs)" : "/(auth)/login"} />;
}
