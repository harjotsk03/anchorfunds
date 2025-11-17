import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TermDetail() {
  const router = useRouter();
  const { term, definition, letter } = useLocalSearchParams<{
    term: string;
    definition: string;
    letter: string;
  }>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.category}>{letter}</Text>
        <Text style={styles.term}>{term}</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Definition</Text>
        <Text style={styles.definition}>{definition}</Text>

        <Text style={styles.sectionTitle}>Example</Text>
        <Text style={styles.exampleText}>
          Example usage of {term} would go here...
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#1C4A8A",
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  category: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    marginBottom: 8,
  },
  term: {
    color: "white",
    fontSize: 32,
    fontFamily: "DMSans_700Bold",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    marginBottom: 12,
    marginTop: 24,
  },
  definition: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    lineHeight: 24,
    color: "#333",
  },
  exampleText: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    lineHeight: 24,
    color: "#666",
    fontStyle: "italic",
  },
});
