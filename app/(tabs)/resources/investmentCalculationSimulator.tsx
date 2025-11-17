import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
          <ArrowLeft color="black" size={15} />
          <Text style={styles.backButtonText}>Back to Resources</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Investment Calculation Simulator</Text>
        <Text style={styles.headerProgress}>
          Calculate how much you can make depending on your initial investment
          and monthly contributions.
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
    backgroundColor: "#ffffff",
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
  headerTitle: { color: "black", fontSize: 28, fontFamily: "DMSans_700Bold" },
  headerProgress: {
    color: "#black",
    fontSize: 16,
    marginTop: 6,
    opacity: 0.8,
    fontFamily: "DMSans_500Medium",
  },

  backButton: {
    flexDirection: "row", // row layout
    alignItems: "center", // vertical center
    gap: 4, // spacing between icon and text
    paddingVertical: 8, // vertical padding
    backgroundColor: "#ffffff",
    borderRadius: 8, // rounded corners
    marginBottom: 10,
  },
  backButtonText: {
    color: "black",
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
  },
});
