import LoginStageFour from "@/components/login/LoginStageFour";
import LoginStageOne from "@/components/login/LoginStageOne";
import LoginStageThree from "@/components/login/LoginStageThree";
import LoginStageTwo from "@/components/login/LoginStageTwo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function Login() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(1);

  const translateY = useSharedValue(0);

  useEffect(() => {
    // Animate when stage changes
    translateY.value = 30;

    translateY.value = withSpring(0, { damping: 20000 });
  }, [currentStage]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const renderStage = () => {
    switch (currentStage) {
      case 1:
        return <LoginStageOne setCurrentStage={setCurrentStage} />;
      case 2:
        return <LoginStageTwo setCurrentStage={setCurrentStage} />;
      case 3:
        return <LoginStageThree setCurrentStage={setCurrentStage} />;
      case 4:
        return <LoginStageFour setCurrentStage={setCurrentStage} />;
      default:
        return <LoginStageOne setCurrentStage={setCurrentStage} />;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Anchor<Text style={styles.headerTitle2}>Funds</Text>
          </Text>
        </View>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          {renderStage()}
        </Animated.View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 72,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  closeButton: {
    position: "absolute",
    left: 20,
    top: 60,
  },
  closeText: {
    fontSize: 24,
    color: "#000",
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "DMSans_500Medium",
    color: "#1C4A8A",
  },
  headerTitle2: {
    fontSize: 17,
    fontFamily: "DMSans_500Medium",
    color: "#5b9fffff",
  },
});
