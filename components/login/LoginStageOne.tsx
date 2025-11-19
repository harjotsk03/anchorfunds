import { Eye, EyeClosed } from "lucide-react-native";
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

export default function LoginStageOne({
  setCurrentStage,
}: {
  setCurrentStage: (stage: number) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [optIn, setOptIn] = useState(false);

  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [firstNameAnim] = useState(new Animated.Value(0));
  const [lastNameAnim] = useState(new Animated.Value(0));
  const [emailAnim] = useState(new Animated.Value(0));
  const [passwordAnim] = useState(new Animated.Value(0));

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

  const handleFirstNameFocus = () => {
    setFirstNameFocused(true);
    animateLabel(firstNameAnim, true, firstName.length > 0);
  };

  const handleFirstNameBlur = () => {
    setFirstNameFocused(false);
    animateLabel(firstNameAnim, false, firstName.length > 0);
  };

  const handleLastNameFocus = () => {
    setLastNameFocused(true);
    animateLabel(lastNameAnim, true, lastName.length > 0);
  };

  const handleLastNameBlur = () => {
    setLastNameFocused(false);
    animateLabel(lastNameAnim, false, lastName.length > 0);
  };

  const handleEmailFocus = () => {
    setEmailFocused(true);
    animateLabel(emailAnim, true, email.length > 0);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
    animateLabel(emailAnim, false, email.length > 0);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    animateLabel(passwordAnim, true, password.length > 0);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    animateLabel(passwordAnim, false, password.length > 0);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Register Now</Text>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <Animated.Text
              style={[
                styles.floatingLabel,
                {
                  top: firstNameAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, -8],
                  }),
                  fontSize: firstNameAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  color: firstNameFocused ? "#000" : "#999",
                },
              ]}
            >
              First Name
            </Animated.Text>
            <TextInput
              style={[
                styles.input,
                (firstNameFocused || firstName) && styles.inputWithLabel,
              ]}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                animateLabel(firstNameAnim, firstNameFocused, text.length > 0);
              }}
              onFocus={handleFirstNameFocus}
              onBlur={handleFirstNameBlur}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Animated.Text
              style={[
                styles.floatingLabel,
                {
                  top: lastNameAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, -8],
                  }),
                  fontSize: lastNameAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  color: lastNameFocused ? "#000" : "#999",
                },
              ]}
            >
              Last Name
            </Animated.Text>
            <TextInput
              style={[
                styles.input,
                (lastNameFocused || lastName) && styles.inputWithLabel,
              ]}
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                animateLabel(lastNameAnim, lastNameFocused, text.length > 0);
              }}
              onFocus={handleLastNameFocus}
              onBlur={handleLastNameBlur}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Animated.Text
              style={[
                styles.floatingLabel,
                {
                  top: emailAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, -8],
                  }),
                  fontSize: emailAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  color: emailFocused ? "#000" : "#999",
                },
              ]}
            >
              Email Address
            </Animated.Text>
            <TextInput
              style={[
                styles.input,
                (emailFocused || email) && styles.inputWithLabel,
              ]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                animateLabel(emailAnim, emailFocused, text.length > 0);
              }}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Animated.Text
              style={[
                styles.floatingLabel,
                {
                  top: passwordAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, -8],
                  }),
                  fontSize: passwordAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  color: passwordFocused ? "#000" : "#999",
                },
              ]}
            >
              Password
            </Animated.Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  animateLabel(passwordAnim, passwordFocused, text.length > 0);
                }}
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={[
                  styles.passwordInput,
                  (passwordFocused || password) && styles.inputWithLabel,
                ]}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Text style={styles.eyeText}>
                  {showPassword ? <EyeClosed /> : <Eye />}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.passwordRequirements}>
            <View style={styles.requirementRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.requirementText}>8 characters</Text>
            </View>
            <View style={styles.requirementRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.requirementText}>1 uppercase</Text>
            </View>
            <View style={styles.requirementRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.requirementText}>1 number</Text>
            </View>
            <View style={styles.requirementRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.requirementText}>1 lowercase</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setOptIn(!optIn)}
          >
            <View style={[styles.checkbox, optIn && styles.checkboxChecked]}>
              {optIn && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              Opt in to receive our weekly emails and member communications.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrentStage(2)}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By signing in or creating a member account, you agree to the{" "}
            <Text style={styles.termsLink}>Terms of Use</Text> and acknowledge
            the <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 26,
    color: "#000",
    marginBottom: 30,
  },
  formSection: {
    width: "100%",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: "#000",
  },
  eyeIcon: {
    paddingHorizontal: 16,
  },
  eyeText: {
    fontSize: 20,
  },
  passwordRequirements: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
    gap: 8,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
  },
  bullet: {
    fontSize: 12,
    color: "#666",
    marginRight: 8,
  },
  requirementText: {
    fontSize: 13,
    color: "#666",
    fontFamily: "DMSans_400Regular",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 3,
    marginRight: 12,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    fontFamily: "DMSans_400Regular",
    lineHeight: 20,
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
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e5e5",
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#999",
    fontFamily: "DMSans_400Regular",
  },
  signInButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "DMSans_400Regular",
    lineHeight: 18,
    textAlign: "center",
  },
  termsLink: {
    textDecorationLine: "underline",
  },
});
