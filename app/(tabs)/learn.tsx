import { ArrowRight, Lock } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Option 1: Define a proper type with index signature
type StageConfig = {
  name: string;
  primaryColor: string;
  lightColor: string;
};

const STAGE_CONFIG: Record<number, StageConfig> = {
  1: {
    name: "Stage One",
    primaryColor: "#1C4A8A",
    lightColor: "#d4e1ff",
  },
  2: {
    name: "Stage Two",
    primaryColor: "#FF8630",
    lightColor: "#ffe4d1",
  },
  3: {
    name: "Stage Three",
    primaryColor: "#2ECC71",
    lightColor: "#d4f4e2",
  },
};

export default function Learn() {
  return (
    <View style={styles.container}>
      {/* Top Blue Header */}
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
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for a lesson..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {/* Filter Row */}
        <View style={styles.filterRow}>
          <Text style={styles.allLessons}>All Lessons (4)</Text>

          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Stage One */}
        <Text
          style={[styles.stageTitle, { color: STAGE_CONFIG[1].primaryColor }]}
        >
          {STAGE_CONFIG[1].name}
        </Text>

        <ModuleCard
          stageNumber={1}
          title="Module One"
          isLocked={false}
          prerequisites="None"
          lessons="4/4 lessons completed"
          description="Learn budgeting, basic investing terminology and the importance of having a safety net before you invest to build wealth safely and worry free."
        />

        <ModuleCard
          stageNumber={1}
          title="Module Two"
          prerequisites="None"
          isLocked={false}
          lessons="10/10 lessons completed"
          description="Learn budgeting, basic investing terminology and the importance of having a safety net before you invest to build wealth safely and worry free."
        />

        <ModuleCard
          stageNumber={1}
          title="Module Three"
          prerequisites="None"
          isLocked={false}
          lessons="2/8 lessons completed"
          description="Learn budgeting, basic investing terminology and the importance of having a safety net before you invest to build wealth safely and worry free."
        />

        <ModuleCard
          stageNumber={1}
          title="Module Four"
          isLocked={true}
          prerequisites="Modules 1-3"
          lessons="0/12 lessons completed"
          description="Learn budgeting, basic investing terminology and the importance of having a safety net before you invest to build wealth safely and worry free."
        />

        {/* Stage Two */}
        <Text
          style={[styles.stageTitle, { color: STAGE_CONFIG[2].primaryColor }]}
        >
          {STAGE_CONFIG[2].name}
        </Text>

        <ModuleCard
          stageNumber={2}
          title="Module Five"
          isLocked={true}
          prerequisites="Modules 1-4"
          lessons="0/4 lessons completed"
          description="Learn budgeting, basic investing terminology and the importance of having a safety net before you invest to build wealth safely and worry free."
        />

        {/* Stage Three */}
        <Text
          style={[styles.stageTitle, { color: STAGE_CONFIG[3].primaryColor }]}
        >
          {STAGE_CONFIG[3].name}
        </Text>

        <ModuleCard
          stageNumber={3}
          title="Module Six"
          isLocked={true}
          prerequisites="Modules 1-5"
          lessons="0/8 lessons completed"
          description="Master advanced investing concepts and learn about risk management."
        />
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
}: {
  stageNumber: number;
  title: string;
  isLocked: boolean;
  lessons: string;
  description: string;
  prerequisites: string;
}) {
  const stageConfig = STAGE_CONFIG[stageNumber];

  return (
    <View style={styles.card}>
      <Text style={[styles.cardStage, { color: stageConfig.primaryColor }]}>
        {stageConfig.name}
      </Text>

      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardLessons}>{lessons}</Text>
      </View>

      <Text style={styles.cardDescription}>{description}</Text>
      <Text style={styles.cardPrerequisites}>
        Prerequisites: {prerequisites}
      </Text>

      <TouchableOpacity
        disabled={isLocked}
        style={[
          styles.cardButton,
          { backgroundColor: stageConfig.primaryColor },
          isLocked && styles.cardButtonLocked,
        ]}
      >
        {isLocked ? (
          <View style={styles.cardButtonContent}>
            <Text style={styles.cardButtonText}>Locked</Text>
            <Lock color="white" size={15} />
          </View>
        ) : (
          <View style={styles.cardButtonContent}>
            <Text style={styles.cardButtonText}>See Lessons</Text>
            <ArrowRight color="white" size={15} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 40,
  },

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
  headerTitle: {
    color: "white",
    fontSize: 34,
    fontFamily: "DMSans_700Bold",
  },
  headerProgress: {
    color: "#d4e1ffff",
    marginTop: 6,
    opacity: 0.8,
    fontFamily: "DMSans_500Medium",
  },

  /* SEARCH */
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
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
    marginTop: 10,
    alignItems: "center",
  },
  allLessons: {
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
    color: "#333",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#EFEFEF",
    borderRadius: 9,
  },
  filterText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: "#333",
  },

  /* STAGE TITLE */
  stageTitle: {
    fontSize: 28,
    fontFamily: "DMSans_500Medium",
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 20,
  },

  /* CARD */
  card: {
    backgroundColor: "#F6F6F6",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  cardStage: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    marginBottom: 6,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
  },
  cardLessons: {
    color: "#464646ff",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
  },
  cardDescription: {
    marginTop: 10,
    color: "#6c6c6cff",
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    lineHeight: 22,
  },

  cardPrerequisites: {
    marginTop: 10,
    color: "#afafafff",
    fontSize: 14,
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

  cardButtonLocked: {
    opacity: 0.3,
  },

  cardButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cardButtonText: {
    fontFamily: "DMSans_500Medium",
    color: "white",
    fontSize: 14,
  },
});
