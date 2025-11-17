import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Replace with real login logic
    console.log({ email, password });
    router.replace("/(tabs)"); // Navigate to main app after login
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
        }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: "#1C4A8A", padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
    //   onPress={() => router.push("/(auth)/register")}
      >
        <Text style={{ marginTop: 16, color: "#1C4A8A", textAlign: "center" }}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
