import { useRouter } from "expo-router";
import { ArrowLeft, ChevronRight, Search } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type SectionListData,
  type SectionListRenderItemInfo,
  type TextStyle,
  type ViewStyle,
} from "react-native";

// Types
interface DictionaryTerm {
  letter: string;
  term: string;
  definition: string;
}

interface SectionData {
  title: string;
  data: DictionaryTerm[];
}

// Sample dictionary data
const DICTIONARY_TERMS: DictionaryTerm[] = [
  // A
  {
    letter: "A",
    term: "Accrued Interest",
    definition: "Interest that has been earned but not yet paid.",
  },
  {
    letter: "A",
    term: "Asset Allocation",
    definition:
      "The strategy of dividing investments among different asset categories.",
  },
  {
    letter: "A",
    term: "Appreciation",
    definition: "Increase in the value of an asset over time.",
  },
  {
    letter: "A",
    term: "Arbitrage",
    definition:
      "The simultaneous purchase and sale of an asset to profit from price differences.",
  },
  {
    letter: "A",
    term: "Annual Percentage Rate (APR)",
    definition:
      "The yearly interest rate charged on borrowed money or earned through an investment.",
  },

  // B
  {
    letter: "B",
    term: "Bear Market",
    definition:
      "A market condition where prices are falling or expected to fall.",
  },
  {
    letter: "B",
    term: "Blue Chip Stock",
    definition: "Stock of a well-established and financially sound company.",
  },
  {
    letter: "B",
    term: "Budget",
    definition:
      "A plan for managing income and expenses over a specific period.",
  },
  {
    letter: "B",
    term: "Bond",
    definition:
      "A fixed income instrument representing a loan made by an investor to a borrower.",
  },
  {
    letter: "B",
    term: "Bankruptcy",
    definition:
      "A legal process for individuals or businesses unable to repay debts.",
  },

  // C
  {
    letter: "C",
    term: "Capital Gains",
    definition: "Profit from the sale of an asset or investment.",
  },
  {
    letter: "C",
    term: "Compound Interest",
    definition:
      "Interest calculated on initial principal and accumulated interest.",
  },
  {
    letter: "C",
    term: "Cost",
    definition: "The amount paid to acquire an asset or investment.",
  },
  {
    letter: "C",
    term: "Cash Flow",
    definition:
      "The net amount of cash being transferred in and out of a business or personal account.",
  },
  {
    letter: "C",
    term: "Cryptocurrency",
    definition:
      "A digital or virtual currency that uses cryptography for security and operates independently of a central bank.",
  },

  // D
  {
    letter: "D",
    term: "Diversification",
    definition: "Strategy of spreading investments to reduce risk.",
  },
  {
    letter: "D",
    term: "Dividend",
    definition:
      "A portion of a company's earnings distributed to shareholders.",
  },
  {
    letter: "D",
    term: "Debt-to-Equity Ratio",
    definition:
      "A measure of a company's financial leverage calculated by dividing total liabilities by shareholders' equity.",
  },
  {
    letter: "D",
    term: "Default",
    definition: "Failure to repay a debt according to agreed terms.",
  },

  // E
  {
    letter: "E",
    term: "ETF",
    definition:
      "Exchange-Traded Fund that tracks an index, commodity, or basket of assets.",
  },
  {
    letter: "E",
    term: "Equity",
    definition:
      "Ownership interest in a company, typically in the form of stocks.",
  },
  {
    letter: "E",
    term: "Expense Ratio",
    definition:
      "Annual fee expressed as a percentage of assets, charged by investment funds to cover operating expenses.",
  },
  {
    letter: "E",
    term: "Emerging Market",
    definition:
      "A developing country’s economy that is progressing toward becoming more advanced, often offering higher returns and higher risks.",
  },

  // F
  {
    letter: "F",
    term: "Fiduciary",
    definition:
      "Person legally required to act in your best financial interest.",
  },
  {
    letter: "F",
    term: "Financial Independence",
    definition:
      "The state of having enough income and assets to live without relying on employment.",
  },
  {
    letter: "F",
    term: "Fundamental Analysis",
    definition:
      "A method of evaluating a company's intrinsic value by analyzing financial statements, management, and industry conditions.",
  },
  {
    letter: "F",
    term: "Forex",
    definition:
      "The global market for trading currencies, known as the foreign exchange market.",
  },
  {
    letter: "F",
    term: "Futures Contract",
    definition:
      "An agreement to buy or sell an asset at a predetermined price at a specific time in the future.",
  },

  // G
  {
    letter: "G",
    term: "Growth Stock",
    definition:
      "A stock expected to grow at an above-average rate compared to other companies.",
  },
  {
    letter: "G",
    term: "Gross Domestic Product (GDP)",
    definition:
      "The total monetary value of all goods and services produced in a country over a period.",
  },
  {
    letter: "G",
    term: "Gross Margin",
    definition:
      "Revenue minus the cost of goods sold, divided by revenue, expressed as a percentage.",
  },

  // H
  {
    letter: "H",
    term: "Hedge Fund",
    definition:
      "A pooled investment fund that uses advanced strategies to earn active returns for its investors.",
  },
  {
    letter: "H",
    term: "Hedging",
    definition:
      "A strategy used to reduce the risk of adverse price movements in an asset.",
  },
  {
    letter: "H",
    term: "High-Yield Bond",
    definition:
      "A bond with a higher interest rate due to higher risk of default.",
  },

  // I
  {
    letter: "I",
    term: "Index Fund",
    definition:
      "A type of mutual fund or ETF that tracks a specific market index.",
  },
  {
    letter: "I",
    term: "Inflation",
    definition:
      "The rate at which the general level of prices for goods and services is rising.",
  },
  {
    letter: "I",
    term: "Initial Public Offering (IPO)",
    definition: "The first sale of stock by a private company to the public.",
  },
  {
    letter: "I",
    term: "Interest Rate",
    definition:
      "The amount charged by a lender to a borrower for the use of money.",
  },

  // J
  {
    letter: "J",
    term: "Junk Bond",
    definition:
      "A bond with low credit quality and high risk of default, offering higher yields.",
  },
  {
    letter: "J",
    term: "Joint Account",
    definition: "A bank or investment account shared by two or more people.",
  },

  // K
  {
    letter: "K",
    term: "K-1 (Schedule K-1)",
    definition:
      "A tax document reporting income, deductions, and credits from partnerships or S-corporations.",
  },
  {
    letter: "K",
    term: "Keogh Plan",
    definition:
      "A tax-deferred retirement plan for self-employed individuals or unincorporated businesses.",
  },

  // L
  {
    letter: "L",
    term: "Liquidity",
    definition:
      "How easily an asset can be converted to cash without affecting its price.",
  },
  {
    letter: "L",
    term: "Large-Cap Stock",
    definition:
      "Stock of a company with a large market capitalization, typically over $10 billion.",
  },
  {
    letter: "L",
    term: "Leverage",
    definition:
      "Using borrowed money to increase potential returns on an investment.",
  },

  // M
  {
    letter: "M",
    term: "Mutual Fund",
    definition:
      "A pool of funds collected from investors to invest in stocks, bonds, or other assets.",
  },
  {
    letter: "M",
    term: "Market Capitalization",
    definition:
      "The total market value of a company's outstanding shares of stock.",
  },
  {
    letter: "M",
    term: "Margin Account",
    definition:
      "A brokerage account that allows investors to borrow money to purchase securities.",
  },

  // N
  {
    letter: "N",
    term: "Net Worth",
    definition: "The total value of assets minus liabilities.",
  },
  {
    letter: "N",
    term: "NASDAQ",
    definition:
      "An American stock exchange that specializes in technology and growth-oriented companies.",
  },
  {
    letter: "N",
    term: "Net Income",
    definition:
      "A company's total earnings after subtracting expenses and taxes.",
  },

  // O
  {
    letter: "O",
    term: "Option",
    definition:
      "A financial derivative giving the right, but not the obligation, to buy or sell an asset at a set price.",
  },
  {
    letter: "O",
    term: "Over-the-Counter (OTC)",
    definition:
      "Trading securities directly between parties, not on an exchange.",
  },

  // P
  {
    letter: "P",
    term: "Portfolio",
    definition:
      "A collection of investments owned by an individual or institution.",
  },
  {
    letter: "P",
    term: "Price-to-Earnings Ratio (P/E)",
    definition:
      "A valuation ratio calculated by dividing stock price by earnings per share.",
  },
  {
    letter: "P",
    term: "Passive Income",
    definition:
      "Income earned with minimal effort, such as dividends or rental income.",
  },

  // Q
  {
    letter: "Q",
    term: "Qualified Dividend",
    definition:
      "A dividend taxed at the lower long-term capital gains tax rate.",
  },
  {
    letter: "Q",
    term: "Quantitative Easing",
    definition:
      "A monetary policy where central banks buy securities to increase money supply.",
  },

  // R
  {
    letter: "R",
    term: "Risk Tolerance",
    definition:
      "An investor's ability and willingness to endure losses in their investments.",
  },
  {
    letter: "R",
    term: "Return on Investment (ROI)",
    definition: "A measure of the profitability of an investment.",
  },
  {
    letter: "R",
    term: "Rebalancing",
    definition:
      "Adjusting a portfolio's allocation to maintain desired risk and return.",
  },

  // S
  {
    letter: "S",
    term: "Stock",
    definition: "A type of security representing ownership in a company.",
  },
  {
    letter: "S",
    term: "Savings Account",
    definition: "A bank account that earns interest on deposits.",
  },
  {
    letter: "S",
    term: "Short Selling",
    definition:
      "Selling borrowed securities with the expectation that their price will decline.",
  },
  {
    letter: "S",
    term: "Small-Cap Stock",
    definition:
      "Stock of a company with a small market capitalization, typically under $2 billion.",
  },

  // T
  {
    letter: "T",
    term: "Trading Volume",
    definition:
      "The number of shares or contracts traded in a security or market.",
  },
  {
    letter: "T",
    term: "Treasury Bond",
    definition:
      "A long-term government debt security with fixed interest payments.",
  },
  {
    letter: "T",
    term: "Tax-Deferred",
    definition:
      "Income that is not taxed until a later date, often used for retirement accounts.",
  },

  // U
  {
    letter: "U",
    term: "Unsecured Loan",
    definition:
      "A loan not backed by collateral, often with higher interest rates.",
  },
  {
    letter: "U",
    term: "Upside Potential",
    definition: "The possible increase in value of an investment.",
  },

  // V
  {
    letter: "V",
    term: "Volatility",
    definition: "A measure of the price fluctuations of an asset over time.",
  },
  {
    letter: "V",
    term: "Value Stock",
    definition: "A stock considered undervalued compared to its fundamentals.",
  },

  // W
  {
    letter: "W",
    term: "Wealth Management",
    definition:
      "Professional financial services to manage and grow an individual’s assets.",
  },
  {
    letter: "W",
    term: "Withdrawal",
    definition:
      "Taking money out of a bank account, investment, or retirement plan.",
  },

  // X
  {
    letter: "X",
    term: "Ex-Dividend Date",
    definition:
      "The cutoff date to be eligible to receive the next dividend payment.",
  },

  // Y
  {
    letter: "Y",
    term: "Yield",
    definition:
      "The income return on an investment, such as interest or dividends.",
  },
  {
    letter: "Y",
    term: "YTD (Year-to-Date)",
    definition:
      "The period beginning the first day of the current year up to the current date.",
  },

  // Z
  {
    letter: "Z",
    term: "Zero-Coupon Bond",
    definition:
      "A bond sold at a discount that pays no interest but is redeemed at face value at maturity.",
  },
  {
    letter: "Z",
    term: "Zombie Company",
    definition:
      "A company that earns just enough to continue operating but cannot pay off debt.",
  },
];


const InvestorTermDictionary: React.FC = () => {
  const router = useRouter();
  const sectionListRef = useRef<SectionList<DictionaryTerm, SectionData>>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Group terms by letter
  const termsByLetter = DICTIONARY_TERMS.reduce<
    Record<string, DictionaryTerm[]>
  >((acc, term) => {
    if (!acc[term.letter]) {
      acc[term.letter] = [];
    }
    acc[term.letter].push(term);
    return acc;
  }, {});

  // Convert to SectionList format
  const sections: SectionData[] = Object.keys(termsByLetter)
    .sort()
    .map(
      (letter): SectionData => ({
        title: letter,
        data: termsByLetter[letter],
      })
    );

  // All letters for alphabet scroll
  const allLetters: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const availableLetters: string[] = Object.keys(termsByLetter);

  // Filter terms based on search
  const filteredSections: SectionData[] = sections
    .map(
      (section): SectionData => ({
        ...section,
        data: section.data.filter((term) =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })
    )
    .filter((section) => section.data.length > 0);

  // Scroll to letter section
  const scrollToLetter = (letter: string): void => {
    const sectionIndex = filteredSections.findIndex((s) => s.title === letter);
    if (sectionIndex !== -1 && sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  // Render item function
const renderItem = ({
  item,
}: SectionListRenderItemInfo<DictionaryTerm, SectionData>) => (
  <TouchableOpacity
    style={styles.termCard}
    onPress={() => {
      router.push({
        pathname: "/(tabs)/resources/[term]",
        params: {
          term: item.term,
          definition: item.definition,
          letter: item.letter,
        },
      });
    }}
  >
    <Text style={styles.termName}>{item.term}</Text>
    <ChevronRight size={20} color="#999" />
  </TouchableOpacity>
);

  // Render section header function
  const renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<DictionaryTerm, SectionData>;
  }) => <Text style={styles.letterHeader}>{section.title}</Text>;

  // Key extractor function
  const keyExtractor = (item: DictionaryTerm, index: number): string => {
    return `${item.term}-${index}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="black" size={16} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Investor Term Dictionary</Text>
        <Text style={styles.headerSubtitle}>
          Search, learn and find terms so you can understand investing, saving,
          and finances.
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <View style={styles.searchIconContainer}>
            <Search size={20} color="#999" />
          </View>
          <TextInput
            placeholder="Search for a term..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Content with Alphabet Scroll */}
      <View style={styles.contentWrapper}>
        {/* Terms List */}
        <SectionList<DictionaryTerm, SectionData>
          ref={sectionListRef}
          sections={filteredSections}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
        />
      </View>
    </View>
  );
};

export default InvestorTermDictionary;

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  backButton: ViewStyle;
  backButtonText: TextStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
  searchContainer: ViewStyle;
  searchInputWrapper: ViewStyle;
  searchIconContainer: ViewStyle;
  searchInput: TextStyle;
  contentWrapper: ViewStyle;
  listContent: ViewStyle;
  letterHeader: TextStyle;
  termCard: ViewStyle;
  termName: TextStyle;
  letterButton: ViewStyle;
  letterText: TextStyle;
  letterTextActive: TextStyle;
  letterTextInactive: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  searchContainer: {
    padding: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchInputWrapper: {
    position: "relative",
  },
  searchIconContainer: {
    position: "absolute",
    left: 16,
    top: 16,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
  },
  contentWrapper: {
    flex: 1,
    position: "relative",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  letterHeader: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    paddingVertical:16,
    backgroundColor: "#fff",
  },
  termCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  termName: {
    fontSize: 17,
    fontFamily: "DMSans_400Regular",
    color: "#000",
  },
  letterButton: {
    width: 24,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  letterText: {
    fontSize: 11,
    fontFamily: "DMSans_600SemiBold",
  },
  letterTextActive: {
    color: "#2563eb",
  },
  letterTextInactive: {
    color: "#ccc",
  },
});
