import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowRight, ArrowUpRight } from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Resources() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>Resources</Text>
        <Text style={styles.headerTitle}>Tools & Terms</Text>
        <Text style={styles.headerProgress}>
          Find simulators, news, and more.
        </Text>
      </View>

      <ScrollView style={styles.toolsContainer}>
        <Text style={styles.sectionHeaderTitle}>Tools</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, marginBottom: 10 }}
          contentContainerStyle={{ gap: 14 }}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                router.push("/resources/investmentCalculationSimulator");
              }}
              style={styles.containerTool}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#0A5F5F", "#5FA896"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradient}
              >
                <Text style={styles.title}>
                  Investment{"\n"}Calculation{"\n"}Simulator
                </Text>

                <Text style={styles.subtitle}>
                  See how much you can have in the future.
                </Text>

                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Take me there</Text>
                  <ArrowRight color="white" size={20} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                router.push("/resources/investorTermDictionary");
              }}
              style={styles.containerTool}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#001c44ff", "#4f72b6ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradient}
              >
                <Text style={styles.title}>
                  Investor{"\n"}Term{"\n"}Dictionary
                </Text>

                <Text style={styles.subtitle}>
                  View and learn terminology for investing/saving.
                </Text>

                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Take me there</Text>
                  <ArrowRight color="white" size={20} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Text style={styles.sectionHeaderTitle}>Recent News</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, marginBottom: 10 }}
          contentContainerStyle={{ gap: 20 }}
        >
          <TouchableOpacity style={styles.containerNews} activeOpacity={0.8}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../assets/images/SEC.png")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.titleNews}>
              SEC delays verdict on BlackRock’s ETF application; Will Bitcoin
              ETFs see light of day?
            </Text>

            <Text style={styles.subtitleNews}>
              After Grayscale’s legal win, the SEC decided to postpone its
              decision on spot Bitcoin ETF applications. Will these proposals be
              greenlit? And when?
            </Text>

            <View style={styles.buttonContainerNews}>
              <Text style={styles.buttonTextNews}>Read More</Text>
              <ArrowUpRight color="#c6c6c6ff" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerNews} activeOpacity={0.8}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../assets/images/QQQ.webp")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.titleNews}>
              QQQ ETF News: Daily Recap, 11/11/2025
            </Text>

            <Text style={styles.subtitleNews}>
              The Invesco QQQ ETF jumped 2.21% on Monday, as tech stocks like
              Nvidia NVDA -2.96% ▼ rallied on hopes for the end of the U.S.
            </Text>

            <View style={styles.buttonContainerNews}>
              <Text style={styles.buttonTextNews}>Read More</Text>
              <ArrowUpRight color="#c6c6c6ff" size={16} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  toolsContainer: { flex: 1, backgroundColor: "#fff", padding: 20 },
  toolsContainerRow: {
    // flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
  },
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
  sectionHeaderTitle: {
    color: "black",
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
  },
  headerProgress: {
    color: "#d4e1ffff",
    marginTop: 6,
    opacity: 0.8,
    fontFamily: "DMSans_500Medium",
  },
  containerTool: {
    width: 280,
    borderRadius: 24,
    overflow: "hidden",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    minHeight: 200,
    maxHeight: 250,
    marginBottom: 16,
  },
  containerNews: {
    width: 300,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    paddingBottom: 20,
  },

  gradient: {
    paddingVertical: 32,
    paddingHorizontal: 28,
    minHeight: 280,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageContainer: {
    height: 180,
    marginBottom: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ff1e1eff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
    color: "white",
    lineHeight: 32,
    marginBottom: 12,
  },
  titleNews: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "black",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 22,
    marginBottom: 24,
  },
  subtitleNews: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#5b5b5bff",
    lineHeight: 20,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "white",
  },
  buttonContainerNews: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  buttonTextNews: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#c6c6c6ff",
  },
});
