import { ArrowLeft } from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginStageThree({
  setCurrentStage,
}: {
  setCurrentStage: (stage: number) => void;
}) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setCurrentStage(2)}
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

        <Text style={styles.title}>What would you like to learn?</Text>
        <Text style={styles.subtitle}>
          Choose the terms and concepts you want to learn and understand.
        </Text>

        <View style={styles.formSection}></View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => setCurrentStage(4)}
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
