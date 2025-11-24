import { useRouter } from "expo-router";
import { ArrowRight, Pen } from "lucide-react-native";
import { useState } from "react";
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
const { width } = Dimensions.get("window");

const CIRCLE_SIZE = width * 2;
export default function Profile() {
  const router = useRouter();
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

  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchAnim] = useState(new Animated.Value(0));
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabledFaceID, setIsEnabledFaceID] = useState(true);
  const [isEnabled2FA, setIsEnabled2FA] = useState(false);

  // NEW: UI-only state for linked accounts
  const [isWealthsimpleLinked, setIsWealthsimpleLinked] = useState(false);
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);

  const handleSearchFocus = () => {
    setSearchFocused(true);
    animateLabel(searchAnim, true, search.length > 0);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
    animateLabel(searchAnim, false, search.length > 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerCircle} />
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Account Details</Text>
      </View>

      <View style={styles.avatarWrapper}>
        <View style={styles.avatar} />

        <TouchableOpacity style={styles.cameraButton}>
          <Pen color={"#ffffff"} size={14} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Animated.Text
          style={[
            styles.floatingLabel,
            {
              top: searchAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [16, -8],
              }),
              fontSize: searchAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 12],
              }),
              color: searchFocused ? "#000" : "#999",
            },
          ]}
        >
          Type to search
        </Animated.Text>
        <TextInput
          style={[
            styles.input,
            (searchFocused || search) && styles.inputWithLabel,
          ]}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            animateLabel(searchAnim, searchFocused, text.length > 0);
          }}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          autoCapitalize="words"
        />
      </View>
      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerMain}>Account</Text>
            <Text style={styles.headerSub}>
              Update your account information
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            {/* FIRST NAME container */}
            <TouchableOpacity style={styles.contentButton}>
              <Text style={styles.contentButtonLeft}>Name</Text>
              <View style={styles.contentButtonRight}>
                <Text style={styles.contentButtonRightText}>Jane Doe</Text>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
            {/* EMAIL container */}
            <TouchableOpacity style={styles.contentButton}>
              <Text style={styles.contentButtonLeft}>Email</Text>
              <View style={styles.contentButtonRight}>
                <Text style={styles.contentButtonRightText}>
                  janedoe@email.com
                </Text>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
            {/* BIRTHDATE container */}
            <TouchableOpacity style={styles.contentButton}>
              <Text style={styles.contentButtonLeft}>Birthdate</Text>
              <View style={styles.contentButtonRight}>
                <Text style={styles.contentButtonRightText}>July 06 2000</Text>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
            {/* GENDER container */}
            <TouchableOpacity style={styles.contentButton}>
              <Text style={styles.contentButtonLeft}>Gender</Text>
              <View style={styles.contentButtonRight}>
                <Text style={styles.contentButtonRightText}>Male</Text>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButton}>
              <Text style={styles.contentButtonLeftLast}>Notifications</Text>
              <View style={styles.contentButtonRight}>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/(tabs)/profile/connectedApps");
              }}
              style={styles.contentButtonLast}
            >
              <Text style={styles.contentButtonLeftLast}>Connected Apps</Text>
              <View style={styles.contentButtonRight}>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerMain}>Data</Text>
            <Text style={styles.headerSub}>Update your data preferences</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.contentButtonLast}>
              <View style={styles.contentButtonLeftDualText}>
                <Text style={styles.contentButtonLeftLast}>Data Sharing</Text>
                <Text style={styles.contentButtonLeftSub}>
                  AnchorFunds only uses shared data to provide optional features
                  like personalized insights.
                </Text>
              </View>
              <View style={styles.contentButtonRight}>
                <Switch
                  value={isEnabled}
                  onValueChange={setIsEnabled}
                  trackColor={{ false: "#d0d0d0", true: "#1C4A8A" }}
                  thumbColor="white"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonLast}>
              <Text style={styles.contentButtonLeftLast}>
                Download Your Data
              </Text>
              <View style={styles.contentButtonRight}>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* NEW: Linked Accounts section (UI only) */}
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerMain}>Linked Accounts</Text>
            <Text style={styles.headerSub}>
              Connect accounts to import and sync your data
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.contentButton}
              onPress={() => setIsWealthsimpleLinked((prev) => !prev)}
            >
              <Text style={styles.contentButtonLeftLast}>Wealthsimple</Text>
              <View style={styles.contentButtonRight}>
                <Text
                  style={[
                    styles.linkStatusText,
                    isWealthsimpleLinked && styles.linkStatusTextActive,
                  ]}
                >
                  {isWealthsimpleLinked ? "Linked" : "Link"}
                </Text>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contentButtonLast}
              onPress={() => setIsGoogleLinked((prev) => !prev)}
            >
              <Text style={styles.contentButtonLeftLast}>Google</Text>
              <View style={styles.contentButtonRight}>
                <Text
                  style={[
                    styles.linkStatusText,
                    isGoogleLinked && styles.linkStatusTextActive,
                  ]}
                >
                  {isGoogleLinked ? "Linked" : "Link"}
                </Text>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerMain}>Privary and Security</Text>
            <Text style={styles.headerSub}>
              Update your privary preferences
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.contentButtonLast}>
              <Text style={styles.contentButtonLeftLast}>Change Password</Text>
              <View style={styles.contentButtonRight}>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonLast}>
              <View style={styles.contentButtonLeftDualText}>
                <Text style={styles.contentButtonLeftLast}>Face-ID Login</Text>
              </View>
              <View style={styles.contentButtonRight}>
                <Switch
                  value={isEnabledFaceID}
                  onValueChange={setIsEnabledFaceID}
                  trackColor={{ false: "#d0d0d0", true: "#1C4A8A" }}
                  thumbColor="white"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonLast}>
              <View style={styles.contentButtonLeftDualText}>
                <Text style={styles.contentButtonLeftLast}>
                  Two-Factor Authentication
                </Text>
              </View>
              <View style={styles.contentButtonRight}>
                <Switch
                  value={isEnabled2FA}
                  onValueChange={setIsEnabled2FA}
                  trackColor={{ false: "#d0d0d0", true: "#1C4A8A" }}
                  thumbColor="white"
                />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Deactivate Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerWrapper: {
    width: "100%",
    height: 240,
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  headerCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#1C4A8A",
    position: "absolute",
    top: -CIRCLE_SIZE * 0.7,
  },
  avatarWrapper: {
    position: "absolute",
    top: 140,
    alignSelf: "center",
    zIndex: 10,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#d9eaea",
    borderWidth: 6,
    borderColor: "white",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF8A34",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
    zIndex: 15,
  },

  titleWrapper: {
    position: "absolute",
    top: 90,
    alignSelf: "center",
    zIndex: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    color: "#ffffff",
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
    backgroundColor: "#FF8A34",
    paddingVertical: 16,
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
  },
  inputContainer: {
    marginTop: 56,
    position: "relative",
    marginHorizontal: 32,
    marginBottom: 16,
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

  sectionContainer: {
    marginHorizontal: 40,
    flex: 1,
    flexDirection: "column",
    rowGap: 10,
    paddingBottom: 16,
  },

  headerContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 4,
    marginTop: 16,
  },

  headerMain: { fontFamily: "DMSans_500Medium", fontSize: 20 },
  headerSub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    color: "#979797ff",
  },
  contentButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomColor: "#dfdfdfff",
    borderBottomWidth: 1,
  },
  contentButtonLast: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  contentButtonLeftDualText: {
    flex: 1,
    flexDirection: "column",
    rowGap: 4,
  },
  contentButtonRight: {
    flexDirection: "row",
    columnGap: 4,
    alignItems: "center",
  },
  contentButtonRightText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
  },
  contentButtonLeft: {
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
    color: "#767676ff",
  },
  contentButtonLeftLast: {
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
    color: "black",
  },
  contentButtonLeftSub: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    color: "#8f8f8fff",
  },
  buttonsContainer: {
    backgroundColor: "#f4f4f4ff",
    flex: 1,
    flexDirection: "column",
    rowGap: 4,
    borderRadius: 14,
  },

  linkStatusText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: "#767676ff",
  },
  linkStatusTextActive: {
    color: "#1C4A8A",
  },
});
