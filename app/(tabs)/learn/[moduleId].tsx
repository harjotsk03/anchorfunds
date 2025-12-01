import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightSquare,
  CheckCheck,
  Lock,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ModuleLessons() {
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

  const handleSearchFocus = () => {
    setSearchFocused(true);
    animateLabel(searchAnim, true, search.length > 0);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
    animateLabel(searchAnim, false, search.length > 0);
  };

  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const router = useRouter();

  // Mock data based on moduleId - you can expand this
  const moduleData: Record<string, any> = {
    "1": {
      title: "Budget Basics",
      stage: 1,
      lessons: [
        {
          id: 1,
          title: "Introduction to Budgeting",
          duration: "5 min",
          completed: true,
          inProgress: true,
          completionPercent: "100%",
          description:
            "Learn how to track your spending and create a simple monthly budget.",
          prerequisites: "None",
          goTo: `nothing`,
        },
        {
          id: 2,
          title: "Creating Your First Budget",
          duration: "8 min",
          completed: true,
          inProgress: true,
          completionPercent: "100%",
          description:
            "Learn how to create a simple monthly budget that you can use in order to keep on track to hit your safety net goal.",
          prerequisites: "None",
          goTo: `nothing`,
        },
        {
          id: 3,
          title: "Tracking Expenses",
          duration: "6 min",
          completed: false,
          inProgress: true,
          completionPercent: "75%",
          description:
            "Understand how to track your expenses, from subscriptions to weekends out.",
          prerequisites: "None",
          goTo: `nothing`,
        },
        {
          id: 4,
          title: "Why Money Feels Stressful",
          duration: "8 min",
          completed: false,
          inProgress: false,
          completionPercent: "0%",
          description:
            "Learn about why money, budgeting, and saving feels so stressful.",
          prerequisites: "None",
          goTo: `/learn/budgetLesson`,
        },
        {
          id: 5,
          title: "Budget Review",
          duration: "4 min",
          completed: false,
          inProgress: false,
          completionPercent: "0%",
          description:
            "Review all the budgeting concepts to become a pro and start saving.",
          prerequisites: "Lessions 1-3",
          goTo: `nothing`,
        },
      ],
    },
    "2": {
      title: "Emergency Fund Essentials",
      stage: 1,
      lessons: [
        {
          id: 1,
          title: "Why Emergency Funds Matter",
          duration: "6 min",
          completed: true,
        },
        {
          id: 2,
          title: "How Much to Save",
          duration: "7 min",
          completed: true,
        },
        {
          id: 3,
          title: "Where to Keep Your Fund",
          duration: "5 min",
          completed: false,
        },
      ],
    },
    // Add more modules as needed
  };

  const currentModule = moduleData[moduleId || "1"] || moduleData["1"];
  const completedLessons = currentModule.lessons.filter(
    (l: any) => l.completed
  ).length;

  // Stage colors
  const stageColors: Record<number, string> = {
    1: "#1C4A8A",
    2: "#FF8630",
    3: "#0eba56ff",
  };

  const filteredLessons = currentModule.lessons.filter((lesson: any) =>
    lesson.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleLessonClick = (lesson: any) => {
    // Only allow clicking on "Why Money Feels Stressful" lesson (id: 4)
    if (lesson.id !== 4) {
      Alert.alert(
        "Demo Limitation",
        "Please click on the 'Why Money Feels Stressful' lesson to continue.",
        [{ text: "OK" }]
      );
      return;
    }

    // Allow navigation for the demo lesson
    if (lesson.goTo !== "nothing") {
      router.push(lesson.goTo);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { backgroundColor: stageColors[currentModule.stage] },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="white" size={15} />
          <Text style={styles.backButtonText}>Back to Modules</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{currentModule.title}</Text>
        <Text style={styles.headerProgress}>
          {completedLessons}/{currentModule.lessons.length} completed
        </Text>
      </View>

      <ScrollView style={styles.content}>
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
            Search for a lesson...
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
        {filteredLessons.map((lesson: any) => (
          <View key={lesson.id} style={styles.lessonCard}>
            <View style={styles.lessonInfo}>
              <View style={styles.progressTitleContainer}>
                <View
                  style={[
                    styles.statusDot,
                    lesson.inProgress && styles.statusDotInProgress,
                    lesson.completed && styles.statusDotCompleted,
                  ]}
                />
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
              </View>
              <View style={styles.cardInfoContainer}>
                <Text style={styles.lessonDuration}>
                  {lesson.completionPercent} Completed
                </Text>
                <Text style={styles.lessonDuration}>-</Text>
                <Text style={styles.lessonDuration}>{lesson.duration}</Text>
              </View>
              <Text style={styles.lessonDescription}>{lesson.description}</Text>
              <Text style={styles.lessonDuration}>
                Prerequisites: {lesson.prerequisites}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleLessonClick(lesson)}
              style={styles.createButton}
            >
              <Text style={styles.createButtonText}>
                {lesson.prerequisites !== "None"
                  ? "Locked"
                  : lesson.completed
                  ? "Review"
                  : lesson.inProgress
                  ? "Continue"
                  : "Begin"}
              </Text>
              <Text style={styles.createButtonText}>
                {lesson.prerequisites !== "None" ? (
                  <Lock size={14} color={"white"} />
                ) : lesson.completed ? (
                  <CheckCheck size={14} color={"white"} />
                ) : lesson.inProgress ? (
                  <ArrowRight size={14} color={"white"} />
                ) : (
                  <ArrowRightSquare size={14} color={"white"} />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#1C4A8A",
    paddingTop: 80,
    paddingBottom: 24,
    paddingHorizontal: 24,
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

  headerTitle: {
    color: "white",
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
  },
  headerProgress: {
    color: "#d4e1ff",
    marginTop: 4,
    fontFamily: "DMSans_500Medium",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  lessonCard: {
    backgroundColor: "#F6F6F6",
    padding: 20,
    borderRadius: 6,
    marginBottom: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardInfoContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    marginTop: 2,
  },
  progressTitleContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 24,
    fontFamily: "DMSans_600SemiBold",
  },
  lessonDuration: {
    fontSize: 16,
    color: "#666",
    fontFamily: "DMSans_400Regular",
    marginTop: 8,
  },
  lessonDescription: {
    fontSize: 16,
    color: "black",
    marginTop: 8,
    fontFamily: "DMSans_500Medium",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginTop: 10,
    backgroundColor: "#ddd",
  },
  statusDotCompleted: {
    backgroundColor: "#2ECC71",
  },
  statusDotInProgress: {
    backgroundColor: "#ff9900ff",
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
  createButton: {
    backgroundColor: "#1C4A8A",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginLeft: "auto",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
  },
});
