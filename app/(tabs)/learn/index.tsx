import { useRouter } from "expo-router";
import { ArrowRight, Lock } from "lucide-react-native";
import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Stage config
type StageConfig = {
  name: string;
  primaryColor: string;
  lightColor: string;
};

const STAGE_CONFIG: Record<number, StageConfig> = {
  1: { name: "Stage One", primaryColor: "#1C4A8A", lightColor: "#d4e1ff" },
  2: { name: "Stage Two", primaryColor: "#FF8630", lightColor: "#ffe4d1" },
  3: { name: "Stage Three", primaryColor: "#0eba56ff", lightColor: "#d4f4e2" },
};

// Fake module data
type Module = {
  stage: number;
  module: number;
  title: string;
  description: string;
  lessons: string;
  prerequisites: string;
  isLocked: boolean;
};

const MODULES: Module[] = [
  // Stage 1
  {
    stage: 1,
    module: 1,
    title: "Budget Basics",
    description:
      "Learn how to track your spending and create a simple monthly budget.",
    lessons: "4/4 lessons completed",
    prerequisites: "None",
    isLocked: false,
  },
  {
    stage: 1,
    module: 2,
    title: "Emergency Fund Essentials",
    description:
      "Understand why an emergency fund is critical and how to start one.",
    lessons: "2/3 lessons completed",
    prerequisites: "Module 1",
    isLocked: true,
  },
  {
    stage: 1,
    module: 3,
    title: "Smart Saving Habits",
    description:
      "Tips and tricks to save consistently and reach your financial goals faster.",
    lessons: "0/4 lessons completed",
    prerequisites: "Modules 1-2",
    isLocked: true,
  },

  // Stage 2
  {
    stage: 2,
    module: 4,
    title: "Introduction to ETFs",
    description:
      "Learn what ETFs are and how they differ from stocks and mutual funds.",
    lessons: "0/5 lessons completed",
    prerequisites: "Stage 1 completion",
    isLocked: true,
  },
  {
    stage: 2,
    module: 5,
    title: "Why Prices Move",
    description:
      "Understand market dynamics and why investment prices fluctuate.",
    lessons: "0/4 lessons completed",
    prerequisites: "Stage 1 completion",
    isLocked: true,
  },

  // Stage 3
  {
    stage: 3,
    module: 6,
    title: "Investment Strategy 101",
    description:
      "Learn basic investment strategies including diversification and risk management.",
    lessons: "0/6 lessons completed",
    prerequisites: "Stage 1 & 2 completion",
    isLocked: true,
  },
  {
    stage: 3,
    module: 7,
    title: "Advanced Portfolio Management",
    description:
      "Explore advanced concepts like asset allocation and portfolio optimization.",
    lessons: "0/5 lessons completed",
    prerequisites: "Stage 1 & 2 completion",
    isLocked: true,
  },
];

export default function Learn() {
  const router = useRouter();
  // Group modules by stage dynamically
  const modulesByStage: Record<number, Module[]> = {};
  MODULES.forEach((mod) => {
    if (!modulesByStage[mod.stage]) modulesByStage[mod.stage] = [];
    modulesByStage[mod.stage].push(mod);
  });

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

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>Learn</Text>
        <Text style={styles.headerTitle}>Modules</Text>
        <Text style={styles.headerProgress}>2/50 completed</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
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
            Search for a module...
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

        {/* Filter Row */}
        <View style={styles.filterRow}>
          <Text style={styles.allLessons}>All Lessons ({MODULES.length})</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Render stages dynamically */}
        {Object.entries(modulesByStage).map(([stageNumber, modules]) => {
          const stage = Number(stageNumber);
          return (
            <View key={stage}>
              <Text
                style={[
                  styles.stageTitle,
                  { color: STAGE_CONFIG[stage].primaryColor },
                ]}
              >
                {STAGE_CONFIG[stage].name}
              </Text>

              {modules.map((mod, idx) => (
                <ModuleCard
                  key={idx}
                  {...mod}
                  stageNumber={stage}
                  onPress={() => {
                    // Navigate to the module lessons screen with the module ID
                    router.push(`/learn/${mod.module}`);
                  }}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function ModuleCard({
  stageNumber,
  title,
  lessons,
  description,
  isLocked,
  prerequisites,
  module,
  onPress, // Add this
}: Module & { stageNumber: number; onPress?: () => void }) {
  const stageConfig = STAGE_CONFIG[stageNumber];

  return (
    <View style={styles.card}>
      <Text style={[styles.cardStage, { color: stageConfig.primaryColor }]}>
        {stageConfig.name} - Module {module}
      </Text>

      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>

      <Text style={styles.cardPrerequisites}>{lessons}</Text>

      <Text style={styles.cardDescription}>{description}</Text>
      <Text style={styles.cardPrerequisites}>
        Prerequisites: {prerequisites}
      </Text>

      <TouchableOpacity
        disabled={isLocked}
        onPress={onPress}
        style={styles.createButton}
      >
        <Text style={styles.createButtonText}>
          {isLocked ? "Locked" : "See Lessons"}
        </Text>
        <Text style={styles.createButtonText}>
          {isLocked ? (
            <Lock color="white" size={15} />
          ) : (
            <ArrowRight color="white" size={15} />
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  /* HEADER */
  header: {
    backgroundColor: "#1C4A8A",
    paddingTop: 100,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerSub: {
    color: "white",
    fontSize: 16,
    marginBottom: 2,
    fontFamily: "DMSans_400Regular",
  },
  headerTitle: { color: "white", fontSize: 34, fontFamily: "DMSans_700Bold" },
  headerProgress: {
    color: "#d4e1ffff",
    marginTop: 6,
    opacity: 0.8,
    fontFamily: "DMSans_500Medium",
  },

  /* SEARCH */
  searchContainer: { paddingHorizontal: 16, paddingTop: 16 },
  searchInput: {
    backgroundColor: "#F2F2F2",
    padding: 16,
    borderRadius: 14,
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
  },

  /* FILTER ROW */
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  allLessons: { fontSize: 13, fontFamily: "DMSans_400Regular", color: "#333" },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#EFEFEF",
    borderRadius: 9,
  },
  filterText: { fontFamily: "DMSans_500Medium", fontSize: 13, color: "#333" },

  /* STAGE TITLE */
  stageTitle: {
    fontSize: 28,
    fontFamily: "DMSans_500Medium",
    marginBottom: 6,
    marginTop: 8,
    paddingHorizontal: 20,
  },

  /* CARD */
  card: {
    backgroundColor: "#F6F6F6",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 6,
    marginBottom: 20,
  },
  cardStage: { fontSize: 16, fontFamily: "DMSans_500Medium", marginBottom: 6 },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: "DMSans_600SemiBold",
    flex: 1,
    flexWrap: "wrap",
  },
  cardLessons: {
    color: "#464646ff",
    fontFamily: "DMSans_400Regular",
    fontSize: 16,
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 16,
    color: "black",
    marginTop: 4,
    fontFamily: "DMSans_500Medium",
    lineHeight: 22,
  },
  cardPrerequisites: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
    fontFamily: "DMSans_400Regular",
    lineHeight: 22,
  },
  cardButton: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 12,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
  cardButtonLocked: { opacity: 0.3 },
  cardButtonContent: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardButtonText: {
    fontFamily: "DMSans_500Medium",
    color: "white",
    fontSize: 14,
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
  inputContainer: {
    marginBottom: 16,
    position: "relative",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
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
