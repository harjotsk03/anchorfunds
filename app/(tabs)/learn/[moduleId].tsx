import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ModuleLessons() {
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
        },
        {
          id: 2,
          title: "Creating Your First Budget",
          duration: "8 min",
          completed: true,
        },
        {
          id: 3,
          title: "Tracking Expenses",
          duration: "6 min",
          completed: false,
        },
        { id: 4, title: "Budget Review", duration: "4 min", completed: false },
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
        {currentModule.lessons.map((lesson: any) => (
          <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDuration}>{lesson.duration}</Text>
            </View>
            <View
              style={[
                styles.statusDot,
                lesson.completed && styles.statusDotCompleted,
              ]}
            />
          </TouchableOpacity>
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
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontFamily: "DMSans_600SemiBold",
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 14,
    color: "#666",
    fontFamily: "DMSans_400Regular",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  statusDotCompleted: {
    backgroundColor: "#2ECC71",
  },
});
