"use client";

import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  DollarSign,
  Info,
  TrendingUp,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ETF data with historical 10-year average annual returns
const ETF_DATA = [
  {
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    avgReturn: 12.5,
    category: "US Large Cap",
  },
  {
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    avgReturn: 11.8,
    category: "US Total Market",
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    avgReturn: 17.2,
    category: "US Tech/Growth",
  },
  {
    symbol: "VGT",
    name: "Vanguard Information Technology ETF",
    avgReturn: 18.5,
    category: "US Tech Sector",
  },
  {
    symbol: "SCHD",
    name: "Schwab US Dividend Equity ETF",
    avgReturn: 11.2,
    category: "US Dividend",
  },
  {
    symbol: "VYM",
    name: "Vanguard High Dividend Yield ETF",
    avgReturn: 9.8,
    category: "US Dividend",
  },
  {
    symbol: "VWO",
    name: "Vanguard Emerging Markets ETF",
    avgReturn: 4.2,
    category: "Emerging Markets",
  },
  {
    symbol: "VXUS",
    name: "Vanguard Total International Stock ETF",
    avgReturn: 5.1,
    category: "International",
  },
  {
    symbol: "BND",
    name: "Vanguard Total Bond Market ETF",
    avgReturn: 2.8,
    category: "US Bonds",
  },
  {
    symbol: "ARKK",
    name: "ARK Innovation ETF",
    avgReturn: 8.5,
    category: "Innovation/Growth",
  },
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    avgReturn: 12.4,
    category: "US Large Cap",
  },
  {
    symbol: "IWM",
    name: "iShares Russell 2000 ETF",
    avgReturn: 8.9,
    category: "US Small Cap",
  },
];

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function InvestmentCalculationSimulator() {
  const router = useRouter();

  const [selectedETF, setSelectedETF] = useState(ETF_DATA[0]);
  const [initialAmount, setInitialAmount] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [years, setYears] = useState("10");
  const [showETFModal, setShowETFModal] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Calculate investment projection
  const projection = useMemo(() => {
    const initial = Number.parseFloat(initialAmount) || 0;
    const monthly = Number.parseFloat(monthlyContribution) || 0;
    const numYears = Number.parseInt(years) || 1;
    const annualReturn = selectedETF.avgReturn / 100;
    const monthlyReturn = annualReturn / 12;

    const yearlyData: {
      year: number;
      value: number;
      contributions: number;
      earnings: number;
    }[] = [];
    let currentValue = initial;
    let totalContributions = initial;

    for (let year = 1; year <= numYears; year++) {
      for (let month = 1; month <= 12; month++) {
        currentValue = currentValue * (1 + monthlyReturn) + monthly;
        totalContributions += monthly;
      }
      yearlyData.push({
        year,
        value: Math.round(currentValue),
        contributions: Math.round(totalContributions),
        earnings: Math.round(currentValue - totalContributions),
      });
    }

    const finalValue = Math.round(currentValue);
    const totalEarnings = Math.round(currentValue - totalContributions);

    return {
      finalValue,
      totalContributions: Math.round(totalContributions),
      totalEarnings,
      yearlyData,
      returnPercentage: (
        ((currentValue - totalContributions) / totalContributions) *
        100
      ).toFixed(1),
    };
  }, [initialAmount, monthlyContribution, years, selectedETF]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const maxValue = Math.max(...projection.yearlyData.map((d) => d.value));

  const renderETFItem = ({ item }: { item: (typeof ETF_DATA)[0] }) => (
    <TouchableOpacity
      style={[
        styles.etfItem,
        selectedETF.symbol === item.symbol && styles.etfItemSelected,
      ]}
      onPress={() => {
        setSelectedETF(item);
        setShowETFModal(false);
      }}
    >
      <View style={styles.etfItemLeft}>
        <Text style={styles.etfSymbol}>{item.symbol}</Text>
        <Text style={styles.etfName}>{item.name}</Text>
        <Text style={styles.etfCategory}>{item.category}</Text>
      </View>
      <View style={styles.etfItemRight}>
        <Text
          style={[
            styles.etfReturn,
            { color: item.avgReturn >= 0 ? "#10B981" : "#EF4444" },
          ]}
        >
          {item.avgReturn >= 0 ? "+" : ""}
          {item.avgReturn}%
        </Text>
        <Text style={styles.etfReturnLabel}>10yr avg</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color="black" size={15} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Investment Calculator</Text>
          <Text style={styles.headerSubtitle}>
            Calculate potential returns based on historical ETF performance.
          </Text>
        </View>

        <ScrollView>
          {/* ETF Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select ETF</Text>
            <TouchableOpacity
              style={styles.etfSelector}
              onPress={() => setShowETFModal(true)}
            >
              <View style={styles.etfSelectorLeft}>
                <Text style={styles.etfSelectorSymbol}>
                  {selectedETF.symbol}
                </Text>
                <Text style={styles.etfSelectorName}>{selectedETF.name}</Text>
              </View>
              <View style={styles.etfSelectorRight}>
                <Text style={styles.etfSelectorReturn}>
                  +{selectedETF.avgReturn}% avg
                </Text>
                <ChevronDown color="#6B7280" size={20} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Investment Details</Text>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <DollarSign color="#6B7280" size={18} />
                <Text style={styles.inputLabelText}>Initial Investment</Text>
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputPrefix}>$</Text>
                <TextInput
                  style={styles.input}
                  value={initialAmount}
                  onChangeText={setInitialAmount}
                  keyboardType="numeric"
                  placeholder="10000"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <TrendingUp color="#6B7280" size={18} />
                <Text style={styles.inputLabelText}>Monthly Contribution</Text>
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputPrefix}>$</Text>
                <TextInput
                  style={styles.input}
                  value={monthlyContribution}
                  onChangeText={setMonthlyContribution}
                  keyboardType="numeric"
                  placeholder="500"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Calendar color="#6B7280" size={18} />
                <Text style={styles.inputLabelText}>
                  Investment Period (Years)
                </Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={years}
                  onChangeText={setYears}
                  keyboardType="numeric"
                  placeholder="10"
                  placeholderTextColor="#9CA3AF"
                />
                <Text style={styles.inputSuffix}>years</Text>
              </View>
            </View>
          </View>

          {/* Calculate Button */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.calculateButton}
              onPress={() => setShowResults(true)}
            >
              <Text style={styles.calculateButtonText}>Calculate Returns</Text>
            </TouchableOpacity>
          </View>

          {/* Results Section */}
          {showResults && (
            <View style={styles.resultsSection}>
              <Text style={styles.sectionTitle}>Projected Results</Text>

              {/* Summary Cards */}
              <View style={styles.summaryGrid}>
                <View style={[styles.summaryCard, styles.summaryCardPrimary]}>
                  <Text style={styles.summaryCardLabel}>Final Value</Text>
                  <Text style={styles.summaryCardValuePrimary}>
                    {formatCurrency(projection.finalValue)}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <View style={[styles.summaryCard, styles.summaryCardHalf]}>
                    <Text style={styles.summaryCardLabel}>
                      Total Contributed
                    </Text>
                    <Text style={styles.summaryCardValue}>
                      {formatCurrency(projection.totalContributions)}
                    </Text>
                  </View>
                  <View style={[styles.summaryCard, styles.summaryCardHalf]}>
                    <Text style={styles.summaryCardLabel}>Total Earnings</Text>
                    <Text
                      style={[styles.summaryCardValue, { color: "#10B981" }]}
                    >
                      {formatCurrency(projection.totalEarnings)}
                    </Text>
                  </View>
                </View>

                <View style={styles.summaryCard}>
                  <Text style={styles.summaryCardLabel}>
                    Return on Investment
                  </Text>
                  <Text style={[styles.summaryCardValue, { color: "#10B981" }]}>
                    +{projection.returnPercentage}%
                  </Text>
                </View>
              </View>

              {/* Growth Chart */}
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Growth Over Time</Text>
                <View style={styles.chart}>
                  {projection.yearlyData.map((data, index) => (
                    <View key={data.year} style={styles.chartBarContainer}>
                      <View style={styles.chartBarWrapper}>
                        <View
                          style={[
                            styles.chartBarContributions,
                            {
                              height: `${
                                (data.contributions / maxValue) * 100
                              }%`,
                            },
                          ]}
                        />
                        <View
                          style={[
                            styles.chartBarEarnings,
                            {
                              height: `${(data.earnings / maxValue) * 100}%`,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.chartLabel}>Y{data.year}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View
                      style={[styles.legendDot, { backgroundColor: "#3B82F6" }]}
                    />
                    <Text style={styles.legendText}>Contributions</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View
                      style={[styles.legendDot, { backgroundColor: "#10B981" }]}
                    />
                    <Text style={styles.legendText}>Earnings</Text>
                  </View>
                </View>
              </View>

              {/* Year by Year Breakdown */}
              <View style={styles.breakdownContainer}>
                <Text style={styles.chartTitle}>Year-by-Year Breakdown</Text>
                {projection.yearlyData.map((data) => (
                  <View key={data.year} style={styles.breakdownRow}>
                    <Text style={styles.breakdownYear}>Year {data.year}</Text>
                    <View style={styles.breakdownValues}>
                      <Text style={styles.breakdownValue}>
                        {formatCurrency(data.value)}
                      </Text>
                      <Text style={styles.breakdownEarnings}>
                        +{formatCurrency(data.earnings)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Disclaimer */}
              <View style={styles.disclaimer}>
                <Info color="#6B7280" size={16} />
                <Text style={styles.disclaimerText}>
                  These projections are based on historical 10-year average
                  returns and are not guaranteed. Past performance does not
                  guarantee future results. Actual returns may vary
                  significantly.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* ETF Selection Modal */}
      <Modal visible={showETFModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select an ETF</Text>
              <TouchableOpacity onPress={() => setShowETFModal(false)}>
                <Text style={styles.modalClose}>Done</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={ETF_DATA}
              renderItem={renderETFItem}
              keyExtractor={(item) => item.symbol}
              contentContainerStyle={styles.etfList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  scrollContainer: { flex: 1 },
  scrollContent: { paddingBottom: 60 },

  /* HEADER */
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

  /* SECTIONS */
  section: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#111827",
    marginBottom: 16,
  },

  /* ETF SELECTOR */
  etfSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  etfSelectorLeft: {
    flex: 1,
  },
  etfSelectorSymbol: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#111827",
  },
  etfSelectorName: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    fontFamily: "DMSans_500Medium",
  },
  etfSelectorRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  etfSelectorReturn: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#10B981",
  },

  /* INPUT FIELDS */
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  inputLabelText: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#374151",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
  },
  inputPrefix: {
    fontSize: 18,
    fontFamily: "DMSans_500Medium",
    color: "#6B7280",
    marginRight: 4,
  },
  inputSuffix: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "DMSans_500Medium",
    marginLeft: 4,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: "DMSans_500Medium",
    color: "#111827",
    paddingVertical: 14,
  },

  /* CALCULATE BUTTON */
  calculateButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 54,
    backgroundColor: "#1C4A8A",
    flex: 2,
  },
  calculateButtonText: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "white",
  },

  /* RESULTS */
  resultsSection: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  summaryGrid: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },
  summaryCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 6,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  summaryCardPrimary: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  summaryCardHalf: {
    flex: 1,
  },
  summaryCardLabel: {
    fontSize: 13,
    fontFamily: "DMSans_500Medium",
    color: "#6B7280",
    marginBottom: 4,
  },
  summaryCardValue: {
    fontSize: 22,
    fontFamily: "DMSans_700Bold",
    color: "#111827",
  },
  summaryCardValuePrimary: {
    fontSize: 28,
    color: "#ffffff",
    fontFamily: "DMSans_700Bold",
  },

  /* CHART */
  chartContainer: {
    marginTop: 24,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#111827",
    marginBottom: 16,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 160,
    gap: 4,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: "center",
  },
  chartBarWrapper: {
    width: "80%",
    height: "100%",
    justifyContent: "flex-end",
  },
  chartBarContributions: {
    backgroundColor: "#3B82F6",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: "100%",
  },
  chartBarEarnings: {
    backgroundColor: "#10B981",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: "100%",
  },
  chartLabel: {
    fontSize: 10,
    fontFamily: "DMSans_500Medium",
    color: "#6B7280",
    marginTop: 6,
  },
  chartLegend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: "DMSans_500Medium",
  },

  /* BREAKDOWN */
  breakdownContainer: {
    marginTop: 24,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  breakdownYear: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#374151",
  },
  breakdownValues: {
    alignItems: "flex-end",
  },
  breakdownValue: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#111827",
  },
  breakdownEarnings: {
    fontSize: 12,
    color: "#10B981",
    fontFamily: "DMSans_700Bold",
    marginTop: 2,
  },

  /* DISCLAIMER */
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 24,
    padding: 16,
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
    color: "#92400E",
    lineHeight: 18,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#111827",
  },
  modalClose: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#FF8C42",
  },
  etfList: {
    padding: 12,
  },
  etfItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  etfItemSelected: {
    borderColor: "#1C4A8A",
    backgroundColor: "#edf4ffff",
  },
  etfItemLeft: {
    flex: 1,
  },
  etfSymbol: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#111827",
  },
  etfName: {
    fontSize: 13,
    fontFamily: "DMSans_500Medium",
    color: "#6B7280",
    marginTop: 2,
  },
  etfCategory: {
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
    color: "#9CA3AF",
    marginTop: 4,
  },
  etfItemRight: {
    alignItems: "flex-end",
  },
  etfReturn: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
  },
  etfReturnLabel: {
    fontSize: 11,
    fontFamily: "DMSans_500Medium",
    color: "#9CA3AF",
    marginTop: 2,
  },
});
