import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginStageTwo({
  setCurrentStage,
}: {
  setCurrentStage: (stage: number) => void;
}) {
  const [incomeType, setIncomeType] = useState<"hourly" | "salary">("hourly");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerMonth, setHoursPerMonth] = useState("");
  const [yearlySalary, setYearlySalary] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setCurrentStage(1)}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 10,
            marginBottom: 20,
            width: 55,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowLeft color="#9b9b9bff" size={16} />
          <Text
            style={{
              color: "#9b9b9bff",
              fontFamily: "DMSans_500Medium",
              marginLeft: 8,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Tell us about your{"\n"}finances to start.
        </Text>
        <Text style={styles.subtitle}>
          Fill in the information regarding your{"\n"}income, estimate as best
          you can.
        </Text>

        <View style={styles.formSection}>
          <Text style={styles.label}>Income</Text>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                incomeType === "hourly" && styles.toggleButtonActive,
              ]}
              onPress={() => setIncomeType("hourly")}
            >
              <Text
                style={[
                  styles.toggleText,
                  incomeType === "hourly" && styles.toggleTextActive,
                ]}
              >
                Hourly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                incomeType === "salary" && styles.toggleButtonActive,
              ]}
              onPress={() => setIncomeType("salary")}
            >
              <Text
                style={[
                  styles.toggleText,
                  incomeType === "salary" && styles.toggleTextActive,
                ]}
              >
                Salary
              </Text>
            </TouchableOpacity>
          </View>

          {incomeType === "hourly" ? (
            <>
              <Text style={styles.inputLabel}>Hourly Rate ($)</Text>
              <TextInput
                style={styles.input}
                placeholder="$"
                placeholderTextColor="#9b9b9b"
                value={hourlyRate}
                onChangeText={setHourlyRate}
                keyboardType="numeric"
              />

              <Text style={styles.inputLabel}>
                Estimated hours per month (4 weeks)
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 120"
                placeholderTextColor="#9b9b9b"
                value={hoursPerMonth}
                onChangeText={setHoursPerMonth}
                keyboardType="numeric"
              />
            </>
          ) : (
            <>
              <Text style={styles.inputLabel}>Yearly Salary ($)</Text>
              <TextInput
                style={styles.input}
                placeholder="$"
                placeholderTextColor="#9b9b9b"
                value={yearlySalary}
                onChangeText={setYearlySalary}
                keyboardType="numeric"
              />
            </>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => setCurrentStage(3)}
          style={styles.continueButton}
        >
          <Text style={styles.continueText}>Continue</Text>
          <ArrowRight color="#fff" size={20} />
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
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    marginBottom: 12,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#9b9b9b",
    marginBottom: 40,
    lineHeight: 22,
  },
  formSection: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#4A90E2",
  },
  toggleText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#666",
  },
  toggleTextActive: {
    color: "#fff",
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#000",
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: "#000",
    marginBottom: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: "#1C4A8A",
    paddingVertical: 18,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 170,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
  },
});
