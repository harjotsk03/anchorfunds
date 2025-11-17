import { ArrowRight } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

        {/* Stage Section Title */}
        <Text style={styles.stageTitle}>Stage One</Text>

        {/* Module Cards */}
        <ModuleCard
          stage="Stage One"
          title="Module One"
          lessons="4/4 lessons completed"
          description="Learn budgeting, basic investing terminology and the importance of having a safety net before you invest to build wealth safely and worry free."
        />

        <ModuleCard
          stage="Stage One"
          title="Module Two"
          lessons="10/10 lessons completed"
          description="Learn budgeting, basic investing terminology and the importance of having a safety net before you invest to build wealth safely and worry free."
        />

        <ModuleCard
          stage="Stage One"
          title="Module Two"
          lessons="10/10 lessons completed"
          description="Learn budgeting, basic investing terminology and the importance of having a safety net before you invest to build wealth safely and worry free."
        />

        <ModuleCard
          stage="Stage One"
          title="Module Two"
          lessons="10/10 lessons completed"
          description="Learn budgeting, basic investing terminology and the importance of having a safety net before you invest to build wealth safely and worry free."
        />
      </ScrollView>
    </View>
  );
}

function ModuleCard({
  stage,
  title,
  lessons,
  description,
}: {
  stage: string;
  title: string;
  lessons: string;
  description: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardStage}>{stage}</Text>

      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardLessons}>{lessons}</Text>
      </View>

      <Text style={styles.cardDescription}>{description}</Text>

      <TouchableOpacity style={styles.cardButton}>
        <View style={styles.cardButtonContent}>
          <Text style={styles.cardButtonText}>See Lessons</Text>
          <ArrowRight color="white" size={15} />
        </View>
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
    flex: 1, // Add this
  },

  scrollContent: {
    paddingBottom: 40, // Add padding at the bottom so last card isn't cut off
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
    paddingHorizontal: 20,
    color: "#1C4A8A",
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
    color: "#1C4A8A",
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

  cardButton: {
    backgroundColor: "#1C4A8A",
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 12,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  cardButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // small gap between text and arrow
  },
  cardButtonText: {
    fontFamily: "DMSans_500Medium",
    color: "white", // ensure text is white
    fontSize: 14,
  },
});
