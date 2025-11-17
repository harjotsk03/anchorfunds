import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function InvestmentCalculationSimulator() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="white" size={15} />
          <Text style={styles.backButtonText}>Back to Modules</Text>
        </TouchableOpacity>
        <Text style={styles.headerSub}>Resources</Text>
        <Text style={styles.headerTitle}>Tools & Terms</Text>
        <Text style={styles.headerProgress}>
          Find simulators, news, and more.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  /* HEADER */
  header: {
    backgroundColor: "#1C4A8A",
    paddingTop: 100,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerSub: {
    color: "white",
    fontSize: 16,
    marginBottom: 2,
    fontFamily: "DMSans_400Regular",
  },
  headerTitle: { color: "white", fontSize: 34, fontFamily: "DMSans_700Bold" },
  headerProgress: {
    color: "#d4e1ffff",
    marginTop: 6,
    opacity: 0.8,
    fontFamily: "DMSans_500Medium",
  },

  backButton: {
    flexDirection: "row", // row layout
    alignItems: "center", // vertical center
    gap: 4, // spacing between icon and text
    paddingVertical: 8, // vertical padding
    backgroundColor: "#1C4A8A", // optional: match your theme
    borderRadius: 8, // rounded corners
    marginBottom: 10,
  },
  backButtonText: {
    color: "white",
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
  },
});
