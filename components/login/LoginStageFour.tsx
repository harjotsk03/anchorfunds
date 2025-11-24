import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginStageFour({
  setCurrentStage,
}: {
  setCurrentStage: (stage: number) => void;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState(new Set());

  const topics = [
    "ETFs",
    "Compound Interest",
    "Supply & Demand",
    "GDP",
    "Inflation",
    "Budgeting",
    "Exchanges",
    "Shares",
    "Volatility",
    "Diversification",
    "Bonds",
    "Mutual Funds",
    "Crypto",
    "Wealthsimple",
    "Active vs. Passive Investing",
    "Interest rates",
    "RRSPs",
    "Capital Gains",
    "Candles",
  ];

  const handleToggle = (topic: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(topic)) {
      newSelected.delete(topic);
    } else {
      newSelected.add(topic);
    }
    setSelected(newSelected);
  };

  const selectedArray = Array.from(selected).sort();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setCurrentStage(3)}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 10,
            marginBottom: 14,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-start",
          }}
        >
          <ArrowLeft color="#9b9b9bff" size={16} />
          <Text
            style={{
              color: "#9b9b9bff",
              fontFamily: "DMSans_500Medium",
              fontSize: 12,
              marginLeft: 4,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>What do you already know?</Text>
        <Text style={styles.subtitle}>
          Choose the terms and concepts you are already familiar with.
        </Text>

        <ScrollView contentContainerStyle={styles.formSection}>
          {topics.map((topic) => {
            const isSelected = selected.has(topic);
            return (
              <View key={topic} style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleToggle(topic)}
                  style={[
                    styles.button,
                    isSelected
                      ? styles.buttonSelected
                      : styles.buttonUnselected,
                  ]}
                >
                  <View
                    style={[
                      styles.circle,
                      isSelected
                        ? styles.circleSelected
                        : styles.circleUnselected,
                    ]}
                  >
                    {isSelected && <View style={styles.innerCircle} />}
                  </View>
                  <Text
                    style={[
                      styles.buttonText,
                      isSelected
                        ? styles.buttonTextSelected
                        : styles.buttonTextUnselected,
                    ]}
                  >
                    {topic}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            router.push("/(tabs)");
          }}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 26,
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,

    fontFamily: "DMSans_400Regular",
    color: "#9b9b9b",
    marginBottom: 20,
    lineHeight: 22,
  },
  label: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  toggleButtonActive: {
    backgroundColor: "#1C4A8A",
  },
  toggleText: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#666",
  },
  toggleTextActive: {
    color: "#fff",
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  createButton: {
    backgroundColor: "#1C4A8A",
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
  },
  inputContainer: {
    marginBottom: 16,
    position: "relative",
  },
  floatingLabel: {
    position: "absolute",
    left: 16,
    backgroundColor: "white",
    paddingHorizontal: 4,
    fontFamily: "DMSans_400Regular",
    zIndex: 1,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: "#000",
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  inputWithLabel: {
    paddingTop: 20,
    paddingBottom: 12,
  },

  formSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 0,
    columnGap: 12,
    marginBottom: 24,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonUnselected: {
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
  },
  buttonSelected: {
    borderColor: "#1C4A8A",
    backgroundColor: "#1C4A8A",
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  circleUnselected: {
    borderColor: "#797979ff",
    backgroundColor: "#ffffff",
  },
  circleSelected: {
    borderColor: "#ffffffff",
    backgroundColor: "#1C4A8A",
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
  },
  buttonTextUnselected: {
    color: "#374151",
  },
  buttonTextSelected: {
    color: "#ffffff",
  },
  summarySection: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1C4A8A",
  },
  emptyText: {
    fontSize: 14,
    color: "#9ca3af",
  },
});
