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
    definition:
      "Money that you've earned from an investment but haven't received yet. Think of it like hours you've worked but haven't been paid for—you've earned them, they're just waiting to be handed over.",
    example:
      "You buy a bond that pays you interest every 6 months. Between payments, you earn $50 in interest that's sitting there waiting. That $50 is your accrued interest.",
  },
  {
    letter: "A",
    term: "Asset Allocation",
    definition:
      "Dividing your money among different types of investments so you're not putting all your eggs in one basket. It's a way to balance risk and growth by spreading investments across stocks, bonds, cash, and other options.",
    example:
      "Instead of putting all $100,000 into stocks, you split it: $60,000 in stocks (higher risk, higher reward), $30,000 in bonds (safer), and $10,000 in cash savings (safest). If stocks drop, your other investments cushion the blow.",
  },
  {
    letter: "A",
    term: "Appreciation",
    definition:
      "When something you own becomes worth more money over time. It's the opposite of depreciation (losing value). Your investment grows without you doing anything.",
    example:
      "You buy a house for $300,000. Five years later, similar homes in your area sell for $350,000. Your house appreciated by $50,000 even though you didn't improve it.",
  },
  {
    letter: "A",
    term: "Arbitrage",
    definition:
      "Buying something at a low price in one place and immediately selling it at a higher price in another place to make a quick profit. There's no risk because you're selling before you even finish buying.",
    example:
      "You notice a stock trading at $50 on the New York Stock Exchange but $51 on the London Stock Exchange. You instantly buy it for $50 and sell it for $51, pocketing the $1 difference risk-free.",
  },
  {
    letter: "A",
    term: "Annual Percentage Rate (APR)",
    definition:
      "The total yearly cost of borrowing money, shown as a percentage. It includes the interest rate plus any fees spread across a full year. This helps you compare different loans fairly.",
    example:
      "A credit card charges 19.99% APR. If you borrow $1,000 and don't pay it back for a year, you'll owe about $200 in interest charges. A personal loan might charge 5% APR, so the same $1,000 would only cost $50 in interest.",
  },

  // B
  {
    letter: "B",
    term: "Bear Market",
    definition:
      "A period when the overall stock market is going down and investors are scared and selling. Prices keep falling because everyone is worried about losing money. It's called 'bear' because bears swipe their paws downward.",
    example:
      "In 2022, the stock market dropped by about 18%. Most stocks were falling, people were nervous about their investments, and news was all about the market decline. If it had dropped 20%+, it would be officially called a bear market.",
  },
  {
    letter: "B",
    term: "Blue Chip Stock",
    definition:
      "Stock from a huge, well-known company that's been around forever and is financially strong. These are the 'safest' company stocks because they're proven, profitable, and unlikely to go out of business. Think of them as the reliable big names you know.",
    example:
      "Apple, Microsoft, Coca-Cola, and Johnson & Johnson are blue chip stocks. Everyone knows these companies, they make tons of money, and they've survived recessions. They're considered safer investments than smaller, newer companies.",
  },
  {
    letter: "B",
    term: "Budget",
    definition:
      "A written plan that shows how much money you expect to earn and how you'll spend it. It helps you control your spending, avoid overspending, and save for goals. It's basically telling your money where to go instead of wondering where it went.",
    example:
      "You make $3,000 per month. Your budget says: $1,200 for rent, $400 for groceries, $150 for utilities, $300 for transportation, $500 for fun, and $450 for savings. This way you know exactly how much you can spend on each category.",
  },
  {
    letter: "B",
    term: "Bond",
    definition:
      "An IOU you buy from a company or government. When you buy a bond, you're lending them money. They promise to pay you back with interest. It's basically a guaranteed paycheck because they agree upfront to pay you a specific amount at specific times.",
    example:
      "You buy a government bond for $10,000. The government promises to pay you 3% interest every year (that's $300 per year) and return your $10,000 after 10 years. You know exactly how much money you'll make, making it safer than stocks.",
  },
  {
    letter: "B",
    term: "Bankruptcy",
    definition:
      "A legal process when someone or a company owes so much money that they can't pay it back. A court gets involved to figure out what happens next—either they reorganize to pay back some debt over time or they liquidate (sell everything) to pay creditors.",
    example:
      "A company owes $50 million but only has $10 million in assets. They file for bankruptcy. The court might let them reorganize and pay creditors back slowly from future profits, or sell off all their assets to raise money for creditors. Bankruptcy gives them a fresh start instead of being stuck forever.",
  },

  // C
  {
    letter: "C",
    term: "Capital Gains",
    definition:
      "The profit you make when you sell an investment for more than you paid for it. It's the 'gain' or money left over after you subtract what you originally paid. The IRS taxes these gains, so it matters whether you held the investment for over a year (better tax rate) or less than a year (worse tax rate).",
    example:
      "You buy a stock for $100. Two years later, you sell it for $150. Your capital gain is $50—that's the profit. But you might owe taxes on that $50. If you had sold it after just 2 months, you'd pay more in taxes on the same $50 profit.",
  },
  {
    letter: "C",
    term: "Compound Interest",
    definition:
      "Interest that earns interest. Your money grows faster because you're earning returns not just on your original investment, but also on all the interest that's already accumulated. Albert Einstein supposedly called it the 'eighth wonder of the world' because it's so powerful.",
    example:
      "You invest $1,000 at 5% interest. After year one, you earn $50, so you have $1,050. Year two, you earn 5% on $1,050 (not just the original $1,000), which is $52.50, giving you $1,102.50. Your money grows faster over time because interest is stacking on top of interest.",
  },
  {
    letter: "C",
    term: "Cost",
    definition:
      "The original price you paid for an investment. This is important because the IRS uses it to calculate your profit when you sell. The difference between what you paid (cost) and what you sold it for is your gain or loss.",
    example:
      "You buy Apple stock at $45 per share. That $45 is your cost basis. If you later sell it at $80, your gain per share is $35. If you sell it at $40, you have a $5 loss per share. Your cost basis is the starting point for calculating profit or loss.",
  },
  {
    letter: "C",
    term: "Cash Flow",
    definition:
      "The actual money moving in and out of your account or a business. Positive cash flow means more money is coming in than going out. Negative cash flow means more money is going out than coming in. It's different from profit because it focuses only on real cash, not promises or future earnings.",
    example:
      "A business makes $100,000 in sales (good!) but has to pay $120,000 in expenses this month. They have negative cash flow of -$20,000, even if they're technically profitable on paper. A freelancer who invoices clients for $5,000 work but hasn't been paid yet has $0 cash flow until the payment actually arrives.",
  },
  {
    letter: "C",
    term: "Cryptocurrency",
    definition:
      "Digital money that exists only online and isn't controlled by any bank or government. It uses special math (cryptography) to secure transactions and verify ownership. Think of it as money for the internet—you can send it to anyone without a bank in the middle.",
    example:
      "Bitcoin is the most famous cryptocurrency. Instead of storing it in a bank account, you store it in a digital wallet. You can send Bitcoin to someone across the world in minutes without a bank taking a cut. Ethereum is another popular cryptocurrency that lets you run programs on it, not just transfer money.",
  },

  // D
  {
    letter: "D",
    term: "Diversification",
    definition:
      "Spreading your money across different types of investments so that if one fails, you don't lose everything. It's like not eating at just one restaurant—if that restaurant closes, you have other places to eat. Different investments perform differently depending on market conditions, so owning many types protects you.",
    example:
      "Instead of putting all $100,000 into tech stocks, you spread it: $40,000 in stocks (various companies), $35,000 in bonds, $15,000 in real estate, $10,000 in commodities like gold. If tech stocks crash, your bonds and real estate might hold steady or even go up, cushioning your losses.",
  },
  {
    letter: "D",
    term: "Dividend",
    definition:
      "A cash payment that a company gives to people who own its stock. It's the company saying, 'Thanks for being our shareholder, here's a piece of our profits.' You get paid just for owning the stock, without having to sell it. Some companies pay dividends regularly; others reinvest profits instead.",
    example:
      "You own 100 shares of a company that pays a $2 annual dividend. You get $200 per year ($2 × 100 shares) usually split into four quarterly payments of $50. You didn't have to do anything—just own the stock and collect the payments.",
  },
  {
    letter: "D",
    term: "Debt-to-Equity Ratio",
    definition:
      "A number that shows how much a company relies on borrowed money versus money from owners. A low ratio means the company is mostly funded by owners' money (safer). A high ratio means the company is heavily in debt (riskier). It tells you how risky the company's finances are.",
    example:
      "Company A owes $1,000,000 in debt and shareholders own $2,000,000 worth (equity). The ratio is 0.5 ($1M ÷ $2M). Company B owes $5,000,000 with only $1,000,000 in equity—ratio of 5. Company B is riskier because it's loaded with debt. If sales drop, Company B might struggle to pay back all that debt.",
  },
  {
    letter: "D",
    term: "Default",
    definition:
      "When someone borrows money and then doesn't pay it back as promised. They break the agreement. This can happen with credit cards, mortgages, car loans, or bonds. Defaulting destroys your credit and can result in legal action, repossession, or foreclosure.",
    example:
      "You take out a mortgage and make payments on time for years. Then you stop paying for 3+ months. The bank marks it as a default. Your credit score drops significantly, the bank can foreclose and take your house, and you might get sued for the remaining balance.",
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
