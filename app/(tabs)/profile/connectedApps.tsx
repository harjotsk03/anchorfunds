import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function Profile() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="black" size={16} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connected Apps</Text>
        <Text style={styles.headerSubtitle}>
          Manage your financial profiles and your connected apps.
        </Text>
      </View>

      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.contentButton}>
              <View style={styles.contentButtonLeftDualText}>
                <Text style={styles.contentButtonLeftLast}>WealthSimple</Text>
                <Text style={styles.contentButtonLeftSub}>Connected</Text>
              </View>
              <View style={styles.contentButtonRight}>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButton}>
              <View style={styles.contentButtonLeftDualText}>
                <Text style={styles.contentButtonLeftLast}>CIBC</Text>
                <Text style={styles.contentButtonLeftSub}>Connected</Text>
              </View>
              <View style={styles.contentButtonRight}>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButton}>
              <View style={styles.contentButtonLeftDualText}>
                <Text style={styles.contentButtonLeftLast}>RBC</Text>
                <Text style={styles.contentButtonLeftSub}>Connected</Text>
              </View>
              <View style={styles.contentButtonRight}>
                <ArrowRight size={16} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contentButtonLast}>
              <Text style={styles.contentButtonLeftLast}>Add Account</Text>
              <View style={styles.contentButtonRight}>
                <Plus size={16} />
              </View>
            </TouchableOpacity>
          </View>
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
  header: {
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    marginBottom: 16,
  },
  backButtonText: {
    color: "#666",
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: "#666",
    lineHeight: 22,
  },
  sectionContainer: {
    marginHorizontal: 40,
    flex: 1,
    paddingTop: 20,
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
