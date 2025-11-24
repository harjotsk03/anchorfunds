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


interface SectionData {
  title: string;
  data: DictionaryTerm[];
}

// Sample dictionary data
interface DictionaryTerm {
  letter: string;
  term: string;
  definition: string;
  example: string;
}

const DICTIONARY_TERMS: DictionaryTerm[] = [
  // A
  {
    letter: "A",
    term: "Accrued Interest",
    definition: "Interest that has been earned but not yet paid.",
    example:
      "A bond investor earns $50 in accrued interest between coupon payments.",
  },
  {
    letter: "A",
    term: "Asset Allocation",
    definition:
      "The strategy of dividing investments among different asset categories.",
    example:
      "A portfolio with 60% stocks, 30% bonds, and 10% cash is a common asset allocation.",
  },
  {
    letter: "A",
    term: "Appreciation",
    definition: "Increase in the value of an asset over time.",
    example:
      "A house purchased for $300,000 appreciates to $350,000 over five years.",
  },
  {
    letter: "A",
    term: "Arbitrage",
    definition:
      "The simultaneous purchase and sale of an asset to profit from price differences.",
    example:
      "A trader buys a stock for $50 on one exchange and sells it for $51 on another.",
  },
  {
    letter: "A",
    term: "Annual Percentage Rate (APR)",
    definition:
      "The yearly interest rate charged on borrowed money or earned through an investment.",
    example:
      "A credit card with a 19.99% APR charges that rate annually on outstanding balances.",
  },

  // B
  {
    letter: "B",
    term: "Bear Market",
    definition:
      "A market condition where prices are falling or expected to fall.",
    example:
      "During a bear market, stock indices like the S&P 500 decline by 20% or more.",
  },
  {
    letter: "B",
    term: "Blue Chip Stock",
    definition: "Stock of a well-established and financially sound company.",
    example:
      "Apple, Microsoft, and Johnson & Johnson are considered blue chip stocks.",
  },
  {
    letter: "B",
    term: "Budget",
    definition:
      "A plan for managing income and expenses over a specific period.",
    example:
      "A monthly budget allocates $2,000 for rent, $400 for groceries, and $200 for entertainment.",
  },
  {
    letter: "B",
    term: "Bond",
    definition:
      "A fixed income instrument representing a loan made by an investor to a borrower.",
    example:
      "An investor buys a 10-year government bond with a 3% coupon rate.",
  },
  {
    letter: "B",
    term: "Bankruptcy",
    definition:
      "A legal process for individuals or businesses unable to repay debts.",
    example:
      "A company filing for Chapter 11 bankruptcy can restructure while continuing operations.",
  },

  // C
  {
    letter: "C",
    term: "Capital Gains",
    definition: "Profit from the sale of an asset or investment.",
    example:
      "Selling a stock purchased for $100 at $150 generates a $50 capital gain.",
  },
  {
    letter: "C",
    term: "Compound Interest",
    definition:
      "Interest calculated on initial principal and accumulated interest.",
    example:
      "A $1,000 investment at 5% compounded annually grows to $1,102.50 after two years.",
  },
  {
    letter: "C",
    term: "Cost",
    definition: "The amount paid to acquire an asset or investment.",
    example:
      "The cost basis of a stock is $45 per share if that's what you paid for it.",
  },
  {
    letter: "C",
    term: "Cash Flow",
    definition:
      "The net amount of cash being transferred in and out of a business or personal account.",
    example: "A business has positive cash flow when revenue exceeds expenses.",
  },
  {
    letter: "C",
    term: "Cryptocurrency",
    definition:
      "A digital or virtual currency that uses cryptography for security and operates independently of a central bank.",
    example:
      "Bitcoin and Ethereum are cryptocurrencies traded on digital exchanges.",
  },

  // D
  {
    letter: "D",
    term: "Diversification",
    definition: "Strategy of spreading investments to reduce risk.",
    example:
      "An investor diversifies by owning stocks, bonds, real estate, and commodities.",
  },
  {
    letter: "D",
    term: "Dividend",
    definition:
      "A portion of a company's earnings distributed to shareholders.",
    example:
      "A company paying a $2 annual dividend distributes that amount to each shareholder quarterly.",
  },
  {
    letter: "D",
    term: "Debt-to-Equity Ratio",
    definition:
      "A measure of a company's financial leverage calculated by dividing total liabilities by shareholders' equity.",
    example:
      "A company with $1M in debt and $2M in equity has a debt-to-equity ratio of 0.5.",
  },
  {
    letter: "D",
    term: "Default",
    definition: "Failure to repay a debt according to agreed terms.",
    example:
      "A borrower defaults when missing a mortgage payment for more than 90 days.",
  },

  // E
  {
    letter: "E",
    term: "ETF",
    definition:
      "An Exchange-Traded Fund (ETF) is a type of investment fund that you can buy and sell like a stock on the stock exchange. Instead of owning individual stocks, an ETF lets you own a collection of many different investments all in one purchase. For example, an ETF might hold 500 different company stocks, or it might focus on a specific theme like technology or renewable energy. ETFs are popular because they give you instant diversification without having to pick individual stocks.",
    example:
      "Imagine you want to invest in the stock market but don't know which individual companies to pick. Instead of buying 500 different stocks one by one (which would be expensive and complicated), you can buy one ETF called SPY that automatically contains 500 of the biggest U.S. companies. When you buy SPY for $400, you instantly own a tiny piece of all 500 companies. If any of those companies do well, your SPY investment grows. It trades just like a regular stock—you can buy it, sell it, and check its price throughout the trading day.",
  },
  {
    letter: "E",
    term: "Equity",
    definition:
      "Ownership interest in a company, typically in the form of stocks.",
    example:
      "Owning 100 shares of a company gives you equity ownership in that business.",
  },
  {
    letter: "E",
    term: "Expense Ratio",
    definition:
      "Annual fee expressed as a percentage of assets, charged by investment funds to cover operating expenses.",
    example:
      "A mutual fund with a 0.5% expense ratio charges $50 annually on a $10,000 investment.",
  },
  {
    letter: "E",
    term: "Emerging Market",
    definition:
      "A developing country's economy that is progressing toward becoming more advanced, often offering higher returns and higher risks.",
    example:
      "India and Brazil are considered emerging markets with growing investment opportunities.",
  },

  // F
  {
    letter: "F",
    term: "Fiduciary",
    definition:
      "Person legally required to act in your best financial interest.",
    example:
      "A fiduciary financial advisor must recommend investments suitable for your goals.",
  },
  {
    letter: "F",
    term: "Financial Independence",
    definition:
      "The state of having enough income and assets to live without relying on employment.",
    example:
      "Someone with $1M invested and $40K annual expenses has achieved financial independence.",
  },
  {
    letter: "F",
    term: "Fundamental Analysis",
    definition:
      "A method of evaluating a company's intrinsic value by analyzing financial statements, management, and industry conditions.",
    example:
      "An analyst uses fundamental analysis to determine if a stock is undervalued based on earnings.",
  },
  {
    letter: "F",
    term: "Forex",
    definition:
      "The global market for trading currencies, known as the foreign exchange market.",
    example:
      "A trader exchanges USD for EUR in the forex market to profit from currency fluctuations.",
  },
  {
    letter: "F",
    term: "Futures Contract",
    definition:
      "An agreement to buy or sell an asset at a predetermined price at a specific time in the future.",
    example:
      "A farmer sells wheat futures at $6 per bushel to lock in a guaranteed price.",
  },

  // G
  {
    letter: "G",
    term: "Growth Stock",
    definition:
      "A stock expected to grow at an above-average rate compared to other companies.",
    example:
      "A tech startup with 30% annual growth is considered a growth stock.",
  },
  {
    letter: "G",
    term: "Gross Domestic Product (GDP)",
    definition:
      "The total monetary value of all goods and services produced in a country over a period.",
    example:
      "The U.S. GDP exceeds $25 trillion annually, indicating a large and productive economy.",
  },
  {
    letter: "G",
    term: "Gross Margin",
    definition:
      "Revenue minus the cost of goods sold, divided by revenue, expressed as a percentage.",
    example:
      "A company with $1M revenue and $400K cost of goods sold has a 60% gross margin.",
  },

  // H
  {
    letter: "H",
    term: "Hedge Fund",
    definition:
      "A pooled investment fund that uses advanced strategies to earn active returns for its investors.",
    example:
      "A hedge fund uses leverage and short selling to generate returns regardless of market conditions.",
  },
  {
    letter: "H",
    term: "Hedging",
    definition:
      "A strategy used to reduce the risk of adverse price movements in an asset.",
    example:
      "An investor hedges stock losses by buying put options to protect their portfolio.",
  },
  {
    letter: "H",
    term: "High-Yield Bond",
    definition:
      "A bond with a higher interest rate due to higher risk of default.",
    example:
      "A high-yield bond offers 8% interest, reflecting the issuer's lower credit quality.",
  },

  // I
  {
    letter: "I",
    term: "Index Fund",
    definition:
      "A type of mutual fund or ETF that tracks a specific market index.",
    example:
      "An S&P 500 index fund holds stocks matching the 500 companies in that index.",
  },
  {
    letter: "I",
    term: "Inflation",
    definition:
      "The rate at which the general level of prices for goods and services is rising.",
    example:
      "If inflation is 3% annually, goods costing $100 today will cost $103 next year.",
  },
  {
    letter: "I",
    term: "Initial Public Offering (IPO)",
    definition: "The first sale of stock by a private company to the public.",
    example:
      "When a startup files for IPO, its shares become available for public trading.",
  },
  {
    letter: "I",
    term: "Interest Rate",
    definition:
      "The amount charged by a lender to a borrower for the use of money.",
    example: "A bank charges a 5% interest rate on a mortgage loan.",
  },

  // J
  {
    letter: "J",
    term: "Junk Bond",
    definition:
      "A bond with low credit quality and high risk of default, offering higher yields.",
    example:
      "A junk bond rated BB or lower may offer 10% yield due to default risk.",
  },
  {
    letter: "J",
    term: "Joint Account",
    definition: "A bank or investment account shared by two or more people.",
    example:
      "A married couple opens a joint savings account where both can deposit and withdraw funds.",
  },

  // K
  {
    letter: "K",
    term: "K-1 (Schedule K-1)",
    definition:
      "A tax document reporting income, deductions, and credits from partnerships or S-corporations.",
    example:
      "A partner receives a K-1 form reporting their share of business profits for tax filing.",
  },
  {
    letter: "K",
    term: "Keogh Plan",
    definition:
      "A tax-deferred retirement plan for self-employed individuals or unincorporated businesses.",
    example:
      "A freelancer contributes to a Keogh Plan to save for retirement with tax deductions.",
  },

  // L
  {
    letter: "L",
    term: "Liquidity",
    definition:
      "How easily an asset can be converted to cash without affecting its price.",
    example:
      "Stocks have high liquidity as they can be sold quickly; real estate has low liquidity.",
  },
  {
    letter: "L",
    term: "Large-Cap Stock",
    definition:
      "Stock of a company with a large market capitalization, typically over $10 billion.",
    example: "Apple with a market cap over $3 trillion is a large-cap stock.",
  },
  {
    letter: "L",
    term: "Leverage",
    definition:
      "Using borrowed money to increase potential returns on an investment.",
    example:
      "An investor borrows $50,000 to add to $50,000 of their own to invest $100,000 total.",
  },

  // M
  {
    letter: "M",
    term: "Mutual Fund",
    definition:
      "A pool of funds collected from investors to invest in stocks, bonds, or other assets.",
    example:
      "A mutual fund collects money from 100,000 investors to build a diversified portfolio.",
  },
  {
    letter: "M",
    term: "Market Capitalization",
    definition:
      "The total market value of a company's outstanding shares of stock.",
    example:
      "A company with 1B shares trading at $50 has a market cap of $50 billion.",
  },
  {
    letter: "M",
    term: "Margin Account",
    definition:
      "A brokerage account that allows investors to borrow money to purchase securities.",
    example:
      "An investor with $10,000 can borrow $10,000 on margin to buy $20,000 of stocks.",
  },

  // N
  {
    letter: "N",
    term: "Net Worth",
    definition: "The total value of assets minus liabilities.",
    example:
      "Someone with $500,000 in assets and $200,000 in debts has a net worth of $300,000.",
  },
  {
    letter: "N",
    term: "NASDAQ",
    definition:
      "An American stock exchange that specializes in technology and growth-oriented companies.",
    example:
      "Tech giants like Google, Amazon, and Meta are listed on the NASDAQ.",
  },
  {
    letter: "N",
    term: "Net Income",
    definition:
      "A company's total earnings after subtracting expenses and taxes.",
    example:
      "A company with $10M revenue and $6M in expenses has $4M in net income.",
  },

  // O
  {
    letter: "O",
    term: "Option",
    definition:
      "A financial derivative giving the right, but not the obligation, to buy or sell an asset at a set price.",
    example:
      "A call option gives the right to buy a stock at $50 within 3 months.",
  },
  {
    letter: "O",
    term: "Over-the-Counter (OTC)",
    definition:
      "Trading securities directly between parties, not on an exchange.",
    example:
      "Penny stocks are often traded over-the-counter rather than on major exchanges.",
  },

  // P
  {
    letter: "P",
    term: "Portfolio",
    definition:
      "A collection of investments owned by an individual or institution.",
    example:
      "An investor's portfolio includes 20 stocks, 5 bonds, and 2 mutual funds.",
  },
  {
    letter: "P",
    term: "Price-to-Earnings Ratio (P/E)",
    definition:
      "A valuation ratio calculated by dividing stock price by earnings per share.",
    example:
      "A stock at $100 with $5 earnings per share has a P/E ratio of 20.",
  },
  {
    letter: "P",
    term: "Passive Income",
    definition:
      "Income earned with minimal effort, such as dividends or rental income.",
    example:
      "Rental income from property or dividend payments are forms of passive income.",
  },

  // Q
  {
    letter: "Q",
    term: "Qualified Dividend",
    definition:
      "A dividend taxed at the lower long-term capital gains tax rate.",
    example:
      "A qualified dividend held for over 60 days is taxed at 15% instead of ordinary rates.",
  },
  {
    letter: "Q",
    term: "Quantitative Easing",
    definition:
      "A monetary policy where central banks buy securities to increase money supply.",
    example:
      "The Federal Reserve used quantitative easing to inject liquidity during the 2008 crisis.",
  },

  // R
  {
    letter: "R",
    term: "Risk Tolerance",
    definition:
      "An investor's ability and willingness to endure losses in their investments.",
    example:
      "A young investor with high risk tolerance may invest 90% in stocks.",
  },
  {
    letter: "R",
    term: "Return on Investment (ROI)",
    definition: "A measure of the profitability of an investment.",
    example: "An investment of $1,000 returning $1,200 has a 20% ROI.",
  },
  {
    letter: "R",
    term: "Rebalancing",
    definition:
      "Adjusting a portfolio's allocation to maintain desired risk and return.",
    example:
      "An investor rebalances quarterly to maintain their 60/40 stock-to-bond split.",
  },

  // S
  {
    letter: "S",
    term: "Stock",
    definition: "A type of security representing ownership in a company.",
    example:
      "Owning one share of Apple stock makes you a part-owner of the company.",
  },
  {
    letter: "S",
    term: "Savings Account",
    definition: "A bank account that earns interest on deposits.",
    example:
      "A high-yield savings account earns 4% annual interest on deposits.",
  },
  {
    letter: "S",
    term: "Short Selling",
    definition:
      "Selling borrowed securities with the expectation that their price will decline.",
    example:
      "An investor short sells a stock at $80, expecting to buy it back at $60.",
  },
  {
    letter: "S",
    term: "Small-Cap Stock",
    definition:
      "Stock of a company with a small market capitalization, typically under $2 billion.",
    example:
      "A startup with a $500 million market cap is considered a small-cap stock.",
  },

  // T
  {
    letter: "T",
    term: "Trading Volume",
    definition:
      "The number of shares or contracts traded in a security or market.",
    example:
      "A stock with 10 million shares traded daily has high trading volume.",
  },
  {
    letter: "T",
    term: "Treasury Bond",
    definition:
      "A long-term government debt security with fixed interest payments.",
    example:
      "A 10-year Treasury bond pays fixed interest every 6 months until maturity.",
  },
  {
    letter: "T",
    term: "Tax-Deferred",
    definition:
      "Income that is not taxed until a later date, often used for retirement accounts.",
    example:
      "Contributions to a 401(k) are tax-deferred and taxed upon withdrawal in retirement.",
  },

  // U
  {
    letter: "U",
    term: "Unsecured Loan",
    definition:
      "A loan not backed by collateral, often with higher interest rates.",
    example:
      "A credit card is an unsecured loan with higher interest rates than mortgages.",
  },
  {
    letter: "U",
    term: "Upside Potential",
    definition: "The possible increase in value of an investment.",
    example:
      "A stock with significant upside potential might double in value over 5 years.",
  },

  // V
  {
    letter: "V",
    term: "Volatility",
    definition: "A measure of the price fluctuations of an asset over time.",
    example:
      "A volatile stock might fluctuate 5% daily, while stable stocks move 0.5%.",
  },
  {
    letter: "V",
    term: "Value Stock",
    definition: "A stock considered undervalued compared to its fundamentals.",
    example:
      "A stock trading at 8x earnings when peers trade at 15x is a value stock.",
  },

  // W
  {
    letter: "W",
    term: "Wealth Management",
    definition:
      "Professional financial services to manage and grow an individual's assets.",
    example:
      "A wealth manager helps clients with $1M+ manage investments and tax strategy.",
  },
  {
    letter: "W",
    term: "Withdrawal",
    definition:
      "Taking money out of a bank account, investment, or retirement plan.",
    example:
      "A withdrawal of $500 from a savings account reduces the balance by that amount.",
  },

  // X
  {
    letter: "X",
    term: "Ex-Dividend Date",
    definition:
      "The cutoff date to be eligible to receive the next dividend payment.",
    example:
      "To receive a quarterly dividend, you must own the stock before the ex-dividend date.",
  },

  // Y
  {
    letter: "Y",
    term: "Yield",
    definition:
      "The income return on an investment, such as interest or dividends.",
    example: "A bond yielding 4% annually returns $40 on a $1,000 investment.",
  },
  {
    letter: "Y",
    term: "YTD (Year-to-Date)",
    definition:
      "The period beginning the first day of the current year up to the current date.",
    example:
      "A fund with +12% YTD performance has gained 12% since January 1st.",
  },

  // Z
  {
    letter: "Z",
    term: "Zero-Coupon Bond",
    definition:
      "A bond sold at a discount that pays no interest but is redeemed at face value at maturity.",
    example: "A zero-coupon bond bought for $800 matures to $1,000 in 5 years.",
  },
  {
    letter: "Z",
    term: "Zombie Company",
    definition:
      "A company that earns just enough to continue operating but cannot pay off debt.",
    example:
      "A zombie company generates $2M revenue yearly but pays $2M in debt service.",
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
            example: item.example,
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
