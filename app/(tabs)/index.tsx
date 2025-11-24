import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Plus,
  Shield,
  TrendingUp,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [currentExpenseAmount, setCurrentExpenseAmount] = useState(2000);
  const [safetyNetAmount, setSafetyNetAmount] = useState(1250);
  const [safetyNetGoal, setSafetyNetGoal] = useState(6000);
  const [breakdownModalVisible, setBreakdownModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [value, setValue] = useState(0);
  const options = [3, 4, 5, 6];
  const [messages, setMessages] = useState<
    Array<{ id: string; text: string; sender: "user" | "bot" }>
  >([
    {
      id: "1",
      text: "Hi! I'm your AI Turtle guide. How can I help you with your financial journey today?",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState(
    "Why do I have to save up money before I learn to invest?"
  );
  const slideAnim = new Animated.Value(0);

  const openBreakdown = () => {
    setBreakdownModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeBreakdown = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setBreakdownModalVisible(false));
  };

  const openChatbot = () => {
    setChatbotVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeChatbot = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setChatbotVisible(false));
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const newUserMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user" as const,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: "That's a great question! The reason we get you to save up 3-6 months of expenses BEFORE you invest is because we want to avoid having to pull out your money from your portfolio once it is in there to pay for emergencies in real life. This is where long term wealth is created and maintained!",
        sender: "bot" as const,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const stages = [
    {
      id: 1,
      title: "Build Your Safety Net",
      subtitle: "Before investing, protect yourself",
      description:
        "Create an emergency fund so you're never forced to sell investments when life happens.",
      icon: Shield,
      color: "#FF8C42",
      bgColor: "#FFF4E6",
      progress: (safetyNetAmount / safetyNetGoal) * 100,
      tips: [
        "Start with $1,000",
        "Build to 3-6 months of expenses",
        "Keep it in a savings account",
      ],
    },
    {
      id: 2,
      title: "Invest for the Long Term",
      subtitle: "Let time do the heavy lifting",
      description:
        "Learn why consistent, boring investing beats trying to time the market.",
      icon: TrendingUp,
      color: "#26B99F",
      bgColor: "#E6F9F5",
      progress: 0,
      tips: [
        "Time in market beats timing the market",
        "ETFs are your friend",
        "Warren Buffett's secret weapon",
      ],
    },
    {
      id: 3,
      title: "Build Your Strategy",
      subtitle: "Create a plan that works for you",
      description:
        "Figure out how much to invest, how often, and how aggressive to be.",
      icon: AlertCircle,
      color: "#1C4A8A",
      bgColor: "#E6F0FF",
      progress: 0,
      tips: [
        "Set your monthly amount",
        "Choose your risk level",
        "Automate everything",
      ],
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Tracking Expenses",
      category: "Module 1: Lesson 3",
      readTime: "6 min",
      icon: "📊",
      pathname: "/(tabs)/learn" as const,
      params: { lessonId: 1 },
    },
    {
      id: 2,
      title: "Why Money Feels Stressful",
      category: "Module 1: Lesson 4",
      readTime: "8 min",
      icon: "📚",
      sendTo: "",
      pathname: "/(tabs)/learn/budgetLesson" as const,
      params: { lessonId: 1 },
    },
  ];

  const handleAddToSafetyNet = () => {
    const amount = parseFloat(addAmount);
    if (!isNaN(amount) && amount > 0) {
      setSafetyNetAmount((prev) => prev + amount);
      setAddAmount("");
      setModalVisible(false);
    }
  };

  const progressPercentage = Math.min(
    (safetyNetAmount / safetyNetGoal) * 100,
    100
  );
  const remainingAmount = Math.max(safetyNetGoal - safetyNetAmount, 0);

  const StageCard = ({ stage, index, isCurrentStage }: any) => {
    const Icon = stage.icon;
    const isCompleted = completedStages.includes(stage.id);

    return (
      <TouchableOpacity
        key={stage.id}
        style={[styles.stageCard, { marginTop: index === 0 ? 0 : 16 }]}
        activeOpacity={0.7}
      >
        <View style={styles.stageContent}>
          <View
            style={[
              styles.stageIconContainer,
              { backgroundColor: stage.bgColor },
            ]}
          >
            <Icon color={stage.color} size={28} />
          </View>

          <View style={{ flex: 1 }}>
            {isCurrentStage && (
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>Current</Text>
              </View>
            )}
            <View style={styles.stageHeader}>
              <Text style={styles.stageNumber}>Stage {stage.id}</Text>
              {isCompleted && <CheckCircle2 color="#26B99F" size={20} />}
            </View>
            <Text style={styles.stageTitle}>{stage.title}</Text>
            <Text style={styles.stageSubtitle}>{stage.subtitle}</Text>

            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${Math.min(stage.progress, 100)}%`,
                    backgroundColor: stage.color,
                  },
                ]}
              />
            </View>
          </View>
          {/* 
          <View style={styles.rightContent}>
            <ChevronRight color="#999" size={24} />
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.AIButton}
        onPress={openChatbot}
        activeOpacity={0.8}
      >
        <Image
          source={require("../../assets/images/AnchorFundsMascot.png")}
          style={styles.AIButtonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>Welcome back,</Text>
        <Text style={styles.headerTitle}>Jane Doe</Text>
        <Text style={styles.headerProgress}>
          Currently: Stage 1 - Build Your Safety Net
        </Text>
      </View>

      <ScrollView style={styles.mainContainer}>
        {/* Safety Net Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Safety Net</Text>

          <View style={styles.safetyNetCard}>
            <View style={styles.safetyNetHeader}>
              <View>
                <Text style={styles.safetyNetLabel}>Total Saved</Text>
                <Text style={styles.safetyNetAmount}>
                  $
                  {safetyNetAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
              <View style={styles.safetyNetGoalInfo}>
                <Text style={styles.safetyNetGoalLabel}>Goal</Text>
                <Text style={styles.safetyNetGoal}>
                  $
                  {safetyNetGoal.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: "#FF8C42",
                  },
                ]}
              />
            </View>

            <View style={styles.safetyNetFooter}>
              <Text style={styles.safetyNetPercentage}>
                {Math.round(progressPercentage)}% complete
              </Text>
              {remainingAmount > 0 && (
                <Text style={styles.safetyNetRemaining}>
                  $
                  {remainingAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  to go
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Plus color="white" size={16} />
              <Text style={styles.addButtonText}>Add to Safety Net</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openBreakdown();
              }}
              style={styles.viewBreakdownButton}
            >
              <Text style={styles.viewBreakdownButtonText}>View Breakdown</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Stages Section */}
        <View style={styles.section}>
          <View style={styles.stagesSectionHeader}>
            <Text style={styles.sectionTitle}>Your Investment Journey</Text>
          </View>

          {stages.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={index}
              isCurrentStage={stage.id === 1}
            />
          ))}
        </View>
        {/* Why Start With Stage 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Start Here?</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <AlertCircle color="#1C4A8A" size={20} />
              <Text style={styles.infoTitle}>
                One emergency can wreck your plan
              </Text>
            </View>
            <Text style={styles.infoText}>
              Car breaks down. Medical bill hits. Job gets shaky. Without a
              safety net, you'll pull money from your investments and lock in
              losses. A simple $2,000 emergency fund changes everything.
            </Text>
          </View>
        </View>
        {/* Quick Wins Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Wins This Week</Text>

          <View style={styles.quickWinsList}>
            {[
              "Calculate your monthly expenses",
              "Open a savings account (if you don't have one)",
              "Set a tiny savings goal ($50/week)",
            ].map((item, index) => (
              <View key={index} style={styles.quickWinItem}>
                <View style={styles.quickWinDot} />
                <Text style={styles.quickWinText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* Recommended Reading */}
        <View style={styles.section}>
          <View style={styles.resourceHeader}>
            <Text style={styles.sectionTitle}>Keep Learning</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/learn")}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          {resources.slice(0, 2).map((resource) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: resource.pathname,
                  params: resource.params,
                })
              }
              key={resource.id}
              style={styles.resourceCard}
            >
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceIcon}>{resource.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resourceTitle}>{resource.title}</Text>
                  <View style={styles.resourceMeta}>
                    <Text style={styles.resourceCategory}>
                      {resource.category}
                    </Text>
                    <Text style={styles.resourceDot}>•</Text>
                    <Text style={styles.resourceReadTime}>
                      {resource.readTime}
                    </Text>
                  </View>
                </View>
              </View>
              <ChevronRight color="#999" size={20} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {breakdownModalVisible && (
        <View style={styles.chatbotOverlay}>
          <Animated.View
            style={[
              styles.chatbotContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [Dimensions.get("window").height, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.chatbotHeader}>
              <Text style={styles.chatbotTitle}>Safety Net Breakdown</Text>
              <TouchableOpacity onPress={closeBreakdown}>
                <X color="#333" size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.breakdownContainer}>
              <Text style={styles.label}>Your Current Safety Net Goal:</Text>
              <View style={styles.goalDisplay}>
                <Text style={styles.goalAmount}>
                  ${(currentExpenseAmount * options[value]).toFixed(2)}
                </Text>
              </View>

              <Text style={styles.inputLabel}>Your Monthly Expenses</Text>
              <TouchableOpacity
                onPress={() => Keyboard.dismiss()}
                activeOpacity={1}
              >
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#CCC"
                    keyboardType="decimal-pad"
                    value={currentExpenseAmount.toString()}
                    onChangeText={(e) => {
                      setCurrentExpenseAmount(parseFloat(e) || 0);
                    }}
                  />
                </View>
              </TouchableOpacity>

              <View>
                <Slider
                  minimumTrackTintColor="#769ed5ff"
                  maximumTrackTintColor="#E0E0E0"
                  thumbTintColor="#1C4A8A"
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={options.length - 1}
                  value={value}
                  onValueChange={(newValue) => setValue(Math.round(newValue))}
                  step={1}
                />
                <View style={styles.labelsContainer}>
                  {options.map((option, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.label,
                        index === value && styles.activeLabel,
                      ]}
                    >
                      {option}x
                    </Text>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  Keyboard.dismiss();
                  setSafetyNetGoal(currentExpenseAmount * options[value]);
                  closeBreakdown();
                }}
              >
                <Text style={styles.saveButtonText}>Save Goal</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}

      {chatbotVisible && (
        <View style={styles.chatbotOverlay}>
          <Animated.View
            style={[
              styles.chatbotContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [Dimensions.get("window").height, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.chatbotHeader}>
              <Text style={styles.chatbotTitle}>AI Turtle Guide</Text>
              <TouchableOpacity onPress={closeChatbot}>
                <X color="#333" size={24} />
              </TouchableOpacity>
            </View>

            {/* Messages */}
            <ScrollView style={styles.messagesContainer}>
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageBubble,
                    message.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.sender === "user"
                        ? styles.userMessageText
                        : styles.botMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* Input */}
            <View style={styles.chatbotInputContainer}>
              <TextInput
                style={styles.chatbotInput}
                placeholder="Ask me anything..."
                placeholderTextColor="#999"
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendMessage}
                disabled={inputText.trim() === ""}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}

      {/* Add to Safety Net Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add to Your Safety Net</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <X color="#333" size={24} />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSubtitle}>
                Every dollar gets you closer to peace of mind
              </Text>

              <View style={styles.modalBody}>
                <Text style={styles.inputLabel}>Amount to add</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    placeholderTextColor="#CCC"
                    keyboardType="decimal-pad"
                    value={addAmount}
                    onChangeText={setAddAmount}
                  />
                </View>

                <View style={styles.suggestionContainer}>
                  <Text style={styles.suggestionLabel}>Quick add</Text>
                  <View style={styles.suggestionButtons}>
                    {[50, 100, 250, 500].map((amount) => (
                      <TouchableOpacity
                        key={amount}
                        style={styles.suggestionButton}
                        onPress={() => setAddAmount(amount.toString())}
                      >
                        <Text style={styles.suggestionButtonText}>
                          ${amount}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.encouragementBox}>
                  <Text style={styles.encouragementTitle}>
                    You're doing great!
                  </Text>
                  <Text style={styles.encouragementText}>
                    You've saved $
                    {safetyNetAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    . That's {Math.round(progressPercentage)}% of your goal.
                    Keep it up!
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  !addAmount && styles.modalButtonDisabled,
                ]}
                onPress={handleAddToSafetyNet}
                disabled={!addAmount}
              >
                <Text style={styles.modalButtonText}>
                  Add ${addAmount || "0"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSecondaryButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  headerTitle: { color: "white", fontSize: 34, fontFamily: "DMSans_700Bold" },
  headerProgress: {
    color: "#f0f4ffff",
    marginTop: 6,
    opacity: 0.8,
    fontFamily: "DMSans_500Medium",
  },
  mainContainer: {
    padding: 0,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: "#FF8C42",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    marginBottom: 16,
  },
  stagesSectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  safetyNetCard: {
    backgroundColor: "#FFF4E6",
    borderRadius: 6,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FFD9B3",
  },
  safetyNetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  safetyNetLabel: {
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
    color: "#999",
    marginBottom: 4,
  },
  safetyNetAmount: {
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
    color: "#FF8C42",
  },
  safetyNetGoalInfo: {
    alignItems: "flex-end",
  },
  safetyNetGoalLabel: {
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
    color: "#999",
    marginBottom: 4,
  },
  safetyNetGoal: {
    fontSize: 16,
    fontFamily: "DMSans_600SemiBold",
    color: "#333",
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#FFE4CC",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  safetyNetFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  safetyNetPercentage: {
    fontSize: 12,
    fontFamily: "DMSans_600SemiBold",
    color: "#FF8C42",
  },
  safetyNetRemaining: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
    color: "#999",
  },
  addButton: {
    backgroundColor: "#FF8C42",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
    color: "white",
  },
  viewBreakdownButton: {
    backgroundColor: "#1C4A8A",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 10,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  viewBreakdownButtonText: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "white",
  },
  stageCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 6,
  },
  stageContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currentBadge: {
    backgroundColor: "#1C4A8A",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: "absolute",
    top: -38,
    right: 0,
  },
  currentBadgeText: {
    fontSize: 11,
    fontFamily: "DMSans_600SemiBold",
    color: "white",
  },
  stageIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  stageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  stageNumber: {
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
    color: "#999",
  },
  stageTitle: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    marginBottom: 2,
  },
  stageSubtitle: {
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
    color: "#666",
    marginBottom: 8,
  },
  infoCard: {
    backgroundColor: "#e5f0ffff",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1C4A8A",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: "DMSans_600SemiBold",
    color: "#1C4A8A",
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: "#45495bff",
    lineHeight: 24,
  },
  quickWinsList: {
    gap: 12,
  },
  quickWinItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quickWinDot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#FF8C42",
  },
  quickWinText: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#333",
    flex: 1,
  },
  resourceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: "DMSans_600SemiBold",
    color: "#1C4A8A",
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FAFAFA",
    padding: 14,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  resourceInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  resourceIcon: {
    fontSize: 24,
  },
  resourceTitle: {
    fontSize: 14,
    fontFamily: "DMSans_600SemiBold",
    color: "#000",
    marginBottom: 4,
  },
  resourceMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  resourceCategory: {
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
    color: "#1C4A8A",
  },
  resourceDot: {
    fontSize: 12,
    color: "#DDD",
  },
  resourceReadTime: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
    color: "#999",
  },
  ctaButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: "#1C4A8A",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ctaButtonText: {
    fontSize: 16,
    fontFamily: "DMSans_600SemiBold",
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: "#000",
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#666",
    marginBottom: 24,
  },
  modalBody: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: "DMSans_600SemiBold",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: "#FAFAFA",
  },
  currencySymbol: {
    fontSize: 18,
    fontFamily: "DMSans_600SemiBold",
    color: "#333",
    marginRight: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 18,
    fontFamily: "DMSans_600SemiBold",
    color: "#000",
  },
  suggestionContainer: {
    marginBottom: 20,
  },
  suggestionLabel: {
    fontSize: 12,
    fontFamily: "DMSans_600SemiBold",
    color: "#666",
    marginBottom: 8,
  },
  suggestionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  suggestionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "#E6F0FF",
    borderRadius: 8,
    alignItems: "center",
  },
  suggestionButtonText: {
    fontSize: 14,
    fontFamily: "DMSans_600SemiBold",
    color: "#1C4A8A",
  },
  encouragementBox: {
    backgroundColor: "#E6F9F5",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#26B99F",
  },
  encouragementTitle: {
    fontSize: 13,
    fontFamily: "DMSans_600SemiBold",
    color: "#26B99F",
    marginBottom: 4,
  },
  encouragementText: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
    color: "#333",
    lineHeight: 18,
  },
  modalButton: {
    backgroundColor: "#FF8C42",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  modalButtonDisabled: {
    backgroundColor: "#D9D9D9",
    opacity: 0.6,
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: "DMSans_600SemiBold",
    color: "white",
  },
  modalSecondaryButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  modalSecondaryButtonText: {
    fontSize: 16,
    fontFamily: "DMSans_600SemiBold",
    color: "#333",
  },
  AIButton: {
    position: "absolute",
    bottom: 14,
    right: 14,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  AIButtonImage: {
    width: 280 / 1.5,
    height: 100 / 1.5,
  },
  chatbotOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10000,
  },
  chatbotContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "85%",
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: "column",
    overflow: "hidden",
  },
  chatbotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },
  chatbotTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#000",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBubble: {
    marginVertical: 8,
    maxWidth: "85%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FF8C42",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5F0FF",
  },
  messageText: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  userMessageText: {
    color: "white",
  },
  botMessageText: {
    color: "#333",
  },
  chatbotInputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 8,
  },
  chatbotInput: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#FF8C42",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "DMSans_600SemiBold",
  },
  breakdownContainer: {
    flex: 1,
    padding: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
    color: "#666",
    fontFamily: "DMSans_500Medium",
  },
  activeLabel: {
    color: "#1C4A8A",
    fontFamily: "DMSans_700Bold",
  },
  goalDisplay: {
    backgroundColor: "#f0f4f8",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#1C4A8A",
  },
  goalAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C4A8A",
  },
  saveButton: {
    backgroundColor: "#1C4A8A",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
