import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  const [hourlyRateFocused, sethourlyRateFocused] = useState(false);
  const [hourlyRateAnim] = useState(new Animated.Value(0));

  const animateLabel = (
    animation: Animated.Value,
    isFocused: boolean,
    hasValue: boolean
  ) => {
    Animated.timing(animation, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlehourlyRateFocus = () => {
    sethourlyRateFocused(true);
    animateLabel(hourlyRateAnim, true, hourlyRate.length > 0);
  };

  const handlehourlyRateBlur = () => {
    sethourlyRateFocused(false);
    animateLabel(hourlyRateAnim, false, hourlyRate.length > 0);
  };

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

        <Text style={styles.title}>Tell us about your finances.</Text>
        <Text style={styles.subtitle}>
          Fill in the information regarding your income, don't worry you can
          estimate as best you can.
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
            <ScrollView>
              <View style={styles.inputContainer}>
                <Animated.Text
                  style={[
                    styles.floatingLabel,
                    {
                      top: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, -8],
                      }),
                      fontSize: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 12],
                      }),
                      color: hourlyRateFocused ? "#000" : "#999",
                    },
                  ]}
                >
                  Hourly Rate
                </Animated.Text>
                <TextInput
                  style={[
                    styles.input,
                    (hourlyRateFocused || hourlyRate) && styles.inputWithLabel,
                  ]}
                  value={hourlyRate}
                  onChangeText={(text) => {
                    setHourlyRate(text);
                    animateLabel(
                      hourlyRateAnim,
                      hourlyRateFocused,
                      text.length > 0
                    );
                  }}
                  onFocus={handlehourlyRateFocus}
                  onBlur={handlehourlyRateBlur}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <Animated.Text
                  style={[
                    styles.floatingLabel,
                    {
                      top: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, -8],
                      }),
                      fontSize: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 12],
                      }),
                      color: hourlyRateFocused ? "#000" : "#999",
                    },
                  ]}
                >
                  Estimated hours per month (4 weeks)
                </Animated.Text>
                <TextInput
                  style={[
                    styles.input,
                    (hourlyRateFocused || hourlyRate) && styles.inputWithLabel,
                  ]}
                  value={hourlyRate}
                  onChangeText={(text) => {
                    setHourlyRate(text);
                    animateLabel(
                      hourlyRateAnim,
                      hourlyRateFocused,
                      text.length > 0
                    );
                  }}
                  onFocus={handlehourlyRateFocus}
                  onBlur={handlehourlyRateBlur}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <Animated.Text
                  style={[
                    styles.floatingLabel,
                    {
                      top: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, -8],
                      }),
                      fontSize: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 12],
                      }),
                      color: hourlyRateFocused ? "#000" : "#999",
                    },
                  ]}
                >
                  How much do you currently have saved?
                </Animated.Text>
                <TextInput
                  style={[
                    styles.input,
                    (hourlyRateFocused || hourlyRate) && styles.inputWithLabel,
                  ]}
                  value={hourlyRate}
                  onChangeText={(text) => {
                    setHourlyRate(text);
                    animateLabel(
                      hourlyRateAnim,
                      hourlyRateFocused,
                      text.length > 0
                    );
                  }}
                  onFocus={handlehourlyRateFocus}
                  onBlur={handlehourlyRateBlur}
                  autoCapitalize="none"
                />
              </View>
            </ScrollView>
          ) : (
            <ScrollView>
              <View style={styles.inputContainer}>
                <Animated.Text
                  style={[
                    styles.floatingLabel,
                    {
                      top: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, -8],
                      }),
                      fontSize: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 12],
                      }),
                      color: hourlyRateFocused ? "#000" : "#999",
                    },
                  ]}
                >
                  Yearly Salary
                </Animated.Text>
                <TextInput
                  style={[
                    styles.input,
                    (hourlyRateFocused || hourlyRate) && styles.inputWithLabel,
                  ]}
                  value={hourlyRate}
                  onChangeText={(text) => {
                    setHourlyRate(text);
                    animateLabel(
                      hourlyRateAnim,
                      hourlyRateFocused,
                      text.length > 0
                    );
                  }}
                  onFocus={handlehourlyRateFocus}
                  onBlur={handlehourlyRateBlur}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <Animated.Text
                  style={[
                    styles.floatingLabel,
                    {
                      top: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, -8],
                      }),
                      fontSize: hourlyRateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 12],
                      }),
                      color: hourlyRateFocused ? "#000" : "#999",
                    },
                  ]}
                >
                  How much do you currently have saved?
                </Animated.Text>
                <TextInput
                  style={[
                    styles.input,
                    (hourlyRateFocused || hourlyRate) && styles.inputWithLabel,
                  ]}
                  value={hourlyRate}
                  onChangeText={(text) => {
                    setHourlyRate(text);
                    animateLabel(
                      hourlyRateAnim,
                      hourlyRateFocused,
                      text.length > 0
                    );
                  }}
                  onFocus={handlehourlyRateFocus}
                  onBlur={handlehourlyRateBlur}
                  autoCapitalize="none"
                />
              </View>
            </ScrollView>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => setCurrentStage(3)}
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
  formSection: {
    flex: 1,
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
});
