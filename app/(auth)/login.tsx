import LoginStageOne from "@/components/login/LoginStageOne";
import LoginStageTwo from "@/components/login/LoginStageTwo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
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
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        {renderStage()}
      </Animated.View>
    </View>
  );
}
