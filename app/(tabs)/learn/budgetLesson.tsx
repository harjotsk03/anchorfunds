"use client";

import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRight,
  ChevronRight
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

interface Question {
  id: string;
  title: string;
  quoteTitle: string;
  question: string;
  quote: string;
  source: string,
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    id: "q1",
    title: "Question One:",
    quoteTitle: "",
    quote: "",
    question: "When you think about money, what's your first reaction?",
    options: ["Stress", "Confusion", "Motivation", "Control"],
    correctAnswer: "Stress",
    source:
      "",
  },
  {
    id: "q2",
    title: "Question Two:",
    quoteTitle: "",
    quote: "",
    question: "Which of these best describes your current financial situation?",
    options: ["I'm confident", "I'm uncertain", "I'm worried", "I'm satisfied"],
    correctAnswer: "I'm uncertain",
    source: "",
  },
  {
    id: "q3",
    title: "Question Three:",
    quoteTitle: "Don’t worry you aren't alone",
    question: "",
    quote:
      "42% of Canadians say money is their leading cause of stress, more than health, work, or relationships.",
    options: ["Saving", "Spending", "Investing", "Planning"],
    correctAnswer: "Planning",
    source: "Source: FP Canada, 2025 Financial Stress Index (survey completed Jan 2025, 2,010 Canadian adults).",
  },
  {
    id: "q4",
    title: "Question Four:",
    quoteTitle: "",
    source: "",
    quote: "",
    question: "What's your biggest financial concern?",
    options: ["Saving", "Spending", "Investing", "Planning"],
    correctAnswer: "Planning",
  },
];

export default function ModuleLessons() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [progressAnim] = useState(new Animated.Value(0));

  // Replace this section in your code:

  const currentQuestion = questions[currentQuestionIndex];
  const isQuoteSlide =
    currentQuestion.quote && currentQuestion.quote.trim() !== "";
  const isAnswered = isQuoteSlide || !!selectedAnswers[currentQuestion.id];

  const progress = isCompleted
    ? 100
    : ((currentQuestionIndex + 1) / questions.length) * 100;

  const animateProgress = (newProgress: number) => {
    Animated.timing(progressAnim, {
      toValue: newProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (!isAnswered) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      animateProgress(((currentQuestionIndex + 2) / questions.length) * 100);
      scrollToTop();
    } else {
      setIsCompleted(true);
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      animateProgress((currentQuestionIndex / questions.length) * 100);
      scrollToTop();
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  const renderCongratulations = () => {
    const circleRadius = 60;
    const circumference = 2 * Math.PI * circleRadius;
    const progress = 0.2; // 1/5 lessons
    const strokeDashoffset = circumference - progress * circumference;

    return (
      <View style={styles.congratsContainer}>
        <Text style={styles.congratsTitle}>Congratulations!</Text>
        <Text style={styles.congratsSubtitle}>
          You have completed this lesson!
        </Text>

        <View style={styles.chartContainer}>
          <Svg height="400" width="400" viewBox="0 0 200 200">
            <Circle
              cx="100"
              cy="100"
              r={circleRadius}
              stroke="#E5E7EB"
              strokeWidth="15"
              fill="none"
            />
            <Circle
              cx="100"
              cy="100"
              r={circleRadius}
              stroke="#FF8C42"
              strokeWidth="15"
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="100, 100"
            />
          </Svg>
          <View style={styles.chartTextContainer}>
            <Text style={styles.chartLabel}>Module 1</Text>
            <Text style={styles.chartValue}>1/5</Text>
            <Text style={styles.chartLabel}>Lessons{"\n"}Completed</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backToModuleButton}
          onPress={() => router.back()}
        >
          <ArrowLeftCircle color="black" size={20} />
          <Text style={styles.backToModuleText}>Back to Module</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.back()}
        >
          <Text style={styles.continueButtonText}>Continue to Next Lesson</Text>
          <ArrowRight color="white" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color="white" size={15} />
            <Text style={styles.backButtonText}>Back to Lessons</Text>
          </TouchableOpacity>

          <Text style={styles.headerProgress}>Lesson 1</Text>
          <Text style={styles.headerTitle}>Why Money Feels Stressful</Text>
        </View>

        <ScrollView ref={scrollViewRef} style={styles.content}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: isCompleted
                    ? "100%"
                    : progressWidth.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                      }),
                },
              ]}
            />
            {isCompleted && (
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>100%</Text>
              </View>
            )}
          </View>

          {!isCompleted && (
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1} of {questions.length}
            </Text>
          )}

          {isCompleted ? (
            renderCongratulations()
          ) : (
            <>
              {/* Question Card */}
              <View style={styles.questionCard}>
                {currentQuestion.quote == "" ? (
                  <>
                    <Text style={styles.questionLabel}>
                      {currentQuestion.title}
                    </Text>
                    <Text style={styles.questionText}>
                      {currentQuestion.question}
                    </Text>

                    <Text style={styles.instructionText}>
                      Select the best answer
                    </Text>

                    {/* Answer Options */}
                    <View style={styles.optionsContainer}>
                      {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleSelectAnswer(option)}
                          style={[
                            styles.optionButton,
                            selectedAnswers[currentQuestion.id] === option &&
                              styles.optionButtonSelected,
                          ]}
                        >
                          <Text
                            style={[
                              styles.optionText,
                              selectedAnswers[currentQuestion.id] === option &&
                                styles.optionTextSelected,
                            ]}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                ) : (
                  <>
                    <Text style={styles.quoteLabel}>
                      {currentQuestion.quoteTitle}
                    </Text>
                    <Text style={styles.quoteText}>
                      {currentQuestion.quote}
                    </Text>

                    <Text style={styles.sourceText}>
                      {currentQuestion.source}
                    </Text>
                  </>
                )}
              </View>

              {/* Navigation Buttons */}
              <View style={styles.navigationContainer}>
                {currentQuestionIndex > 0 && (
                  <TouchableOpacity
                    onPress={handlePrevious}
                    style={[styles.navButton, styles.prevButton]}
                  >
                    <Text style={styles.navButtonText}>Previous</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={handleNext}
                  disabled={!isAnswered}
                  style={[
                    styles.navButton,
                    styles.nextButton,
                    !isAnswered && styles.nextButtonDisabled,
                  ]}
                >
                  <Text style={styles.nextButtonText}>
                    {currentQuestionIndex === questions.length - 1
                      ? "Complete"
                      : "Next"}
                  </Text>
                  <ChevronRight
                    color={isAnswered ? "white" : "#999"}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#1C4A8A",
    paddingTop: 45,
    paddingBottom: 32,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    marginBottom: 10,
  },
  backButtonText: {
    color: "white",
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
  },
  headerTitle: {
    color: "white",
    fontSize: 30,
    fontFamily: "DMSans_700Bold",
    marginTop: 8,
    lineHeight: 40,
  },
  headerProgress: {
    color: "#d4e1ff",
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
  },
  content: {
    padding: 24,
  },
  progressContainer: {
    height: 28,
    backgroundColor: "#f0f0f0",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#26B99F",
    borderRadius: 14,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "DMSans_500Medium",
    marginBottom: 24,
  },
  percentageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  percentageText: {
    color: "white",
    fontSize: 12,
    fontFamily: "DMSans_700Bold",
  },
  questionCard: {
    backgroundColor: "#FAFAFA",
    padding: 24,
    borderRadius: 10,
    marginBottom: 32,
  },
  questionLabel: {
    fontSize: 14,
    color: "#666",
    fontFamily: "DMSans_500Medium",
    marginBottom: 12,
  },
  quoteLabel: {
    fontSize: 18,
    textAlign: "center",
    color: "#ff7b00ff",
    fontFamily: "DMSans_500Medium",
    marginBottom: 12,
  },
  questionText: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    lineHeight: 32,
    marginBottom: 24,
  },
  quoteText: {
    fontSize: 32,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    lineHeight: 40,
    marginBottom: 24,
    paddingVertical: 20,
    textAlign:"center",
  },
  instructionText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "DMSans_500Medium",
    marginBottom: 16,
  },
  sourceText: {
    fontSize: 12,
    color: "#9d9d9dff",
    fontFamily: "DMSans_400Regular",
    marginBottom: 16,
    textAlign:"center"
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  optionButtonSelected: {
    backgroundColor: "#E8F0FE",
    borderColor: "#1C4A8A",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: "#333",
    textAlign: "center",
  },
  optionTextSelected: {
    color: "#1C4A8A",
    fontFamily: "DMSans_500Medium",
  },
  navigationContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  navButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    minHeight: 54,
  },
  prevButton: {
    backgroundColor: "#f0f0f0",
    flex: 1,
  },
  nextButton: {
    backgroundColor: "#1C4A8A",
    flex: 2,
  },
  nextButtonDisabled: {
    backgroundColor: "#D9D9D9",
    opacity: 0.6,
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: "DMSans_600SemiBold",
    color: "#333",
  },
  nextButtonText: {
    fontSize: 14,
    fontFamily: "DMSans_600SemiBold",
    color: "white",
  },
  congratsContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  congratsTitle: {
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  congratsSubtitle: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#000",
    marginBottom: 32,
    textAlign: "center",
  },
  chartContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    marginTop: 20,
  },
  chartTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  chartLabel: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#000",
    textAlign: "center",
  },
  chartValue: {
    fontSize: 36,
    fontFamily: "DMSans_700Bold",
    color: "#FF8C42",
    marginVertical: 4,
  },
  chartSubLabel: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#000",
    textAlign: "center",
  },
  backToModuleButton: {
    width: "100%",
    backgroundColor: "#E5E7EB",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backToModuleText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#000",
  },
  continueButton: {
    width: "100%",
    backgroundColor: "#1C4A8A",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "white",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#255084",
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerItem: {
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
    color: "#8FA3C4",
  },
  footerTextActive: {
    color: "white",
  },
});
