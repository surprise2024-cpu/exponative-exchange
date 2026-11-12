import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ActionButton from "@/components/ActionButton";
import BottomSheet from "@/components/BottomSheet";
import CurrencyCard from "@/components/CurrencyCard";
import DetailRow from "@/components/DetailRow";

import {
  ArrowDownUp,
  BellDot,
  Bitcoin,
  Check,
  ChevronLeft,
  CircleDollarSign,
  Coins,
  Diamond,
  DollarSign,
  LogOut,
  Rocket,
} from "lucide-react-native";

type SheetType = "buy" | "notifications" | "back" | "currency" | null;
type CurrencyCode = "ETH" | "USD" | "BTC" | "SOL";
type CurrencyPosition = "top" | "bottom";

const currencies = {
  ETH: {
    currency: "ETH",
    name: "Ethereum",
    symbol: <Diamond size={20} color="#FFFFFF" />,
    amount: "12,695",
    balance: "293.0187",
  },
  USD: {
    currency: "USD",
    name: "US Dollar",
    symbol: <DollarSign size={20} color="#FFFFFF" />,
    amount: "43,937.4",
    balance: "12,987.21",
  },
  BTC: {
    currency: "BTC",
    name: "Bitcoin",
    symbol: <Bitcoin size={20} color="#FFFFFF" />,
    amount: "0",
    balance: "0",
  },
  SOL: {
    currency: "SOL",
    name: "Solana",
    symbol: <CircleDollarSign size={20} color="#FFFFFF" />,
    amount: "0",
    balance: "0",
  },
};

const currencyCodes: CurrencyCode[] = ["ETH", "USD", "BTC", "SOL"];

export default function HomeScreen() {
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);

  const [topCurrency, setTopCurrency] = useState<CurrencyCode>("ETH");
  const [bottomCurrency, setBottomCurrency] = useState<CurrencyCode>("USD");

  const [selecting, setSelecting] = useState<CurrencyPosition>("top");

  // Open currency selection
  const openCurrencySelector = (position: CurrencyPosition) => {
    setSelecting(position);
    setActiveSheet("currency");
  };

  // Select a currency
  const selectCurrency = (currency: CurrencyCode) => {
    if (selecting === "top") {
      setTopCurrency(currency);
    } else {
      setBottomCurrency(currency);
    }

    setActiveSheet(null);
  };

  // Swap currencies
  const swapCurrencies = () => {
    setTopCurrency(bottomCurrency);
    setBottomCurrency(topCurrency);
  };

  // Close BottomSheet
  const closeSheet = () => {
    setActiveSheet(null);
  };

  // BottomSheet titles
  const sheetTitle =
    activeSheet === "currency"
      ? "Select Currency"
      : activeSheet === "buy"
        ? "To the Moon?"
        : activeSheet === "notifications"
          ? "All Caught Up!"
          : "Leaving Already?";

  // BottomSheet subtitles
  const sheetSubtitle =
    activeSheet === "currency"
      ? "Choose a currency to exchange"
      : activeSheet === "buy"
        ? "Let's make sure that we can afford the fuel first."
        : activeSheet === "notifications"
          ? "No new notifications. Enjoy the peace!"
          : "The crypto market will miss you!";

  // BottomSheet icons
  const sheetIcon =
    activeSheet === "buy" ? (
      <Rocket size={32} color="#C69BC4" strokeWidth={1.8} />
    ) : activeSheet === "notifications" ? (
      <BellDot size={32} color="#C69BC4" strokeWidth={1.8} />
    ) : activeSheet === "back" ? (
      <LogOut size={32} color="#C69BC4" strokeWidth={1.8} />
    ) : activeSheet === "currency" ? (
      <Coins size={32} color="#C69BC4" strokeWidth={1.8} />
    ) : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Main Exchange Screen */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => setActiveSheet("back")}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={({ pressed, hovered }) => [
              styles.headerButton,
              hovered && styles.hovered,
              pressed && styles.pressed,
            ]}
          >
            <ChevronLeft size={20} color="#FFFFFF" strokeWidth={1.8} />
          </Pressable>

          <Text style={styles.headerTitle}>Exchange</Text>

          <Pressable
            onPress={() => setActiveSheet("notifications")}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={({ pressed, hovered }) => [
              styles.headerButton,
              hovered && styles.hovered,
              pressed && styles.pressed,
            ]}
          >
            <BellDot size={20} color="#B48BAF" strokeWidth={1.8} />
          </Pressable>
        </View>

        {/* Exchange Card */}
        <View style={styles.card}>
          {/* Top Currency */}
          <CurrencyCard
            {...currencies[topCurrency]}
            onPress={() => openCurrencySelector("top")}
          />

          <View style={styles.divider} />

          {/* Swap Button */}
          <Pressable
            onPress={swapCurrencies}
            accessibilityRole="button"
            accessibilityLabel="Swap currencies"
            style={({ pressed, hovered }) => [
              styles.switchButton,
              hovered && styles.switchHovered,
              pressed && styles.switchPressed,
            ]}
          >
            <ArrowDownUp size={20} color="#FFFFFF" strokeWidth={1.8} />
          </Pressable>

          {/* Bottom Currency */}
          <CurrencyCard
            {...currencies[bottomCurrency]}
            onPress={() => openCurrencySelector("bottom")}
          />
        </View>

        {/* Exchange Rate */}
        <Text style={styles.rate}>
          {topCurrency === "ETH" && bottomCurrency === "USD"
            ? "1 ETH = 3,461.02 USD"
            : "Demo selection • Live rates unavailable"}
        </Text>

        {/* Buy Button */}
        <ActionButton
          title={`Buy ${topCurrency}`}
          onPress={() => setActiveSheet("buy")}
        />

        {/* Transaction Details */}
        <View style={styles.details}>
          <DetailRow label="Estimate fee" value="4.28 USD" />
          <DetailRow label="You will receive" value="43,941.68 USD" />
          <DetailRow label="Spread" value="0.2%" />
          <DetailRow label="Gas fee" value="0.0045 ETH" />
        </View>
      </ScrollView>

      {/* Reusable BottomSheet */}
      <BottomSheet
        isPresented={activeSheet !== null}
        onDismiss={closeSheet}
        snapPoints={["half", "full"]}
        scrollable={activeSheet === "currency"}
        icon={sheetIcon}
        title={sheetTitle}
        subTitle={sheetSubtitle}
      >
        {activeSheet === "currency" ? (
          // Currency selection list
          <View style={styles.currencyList}>
            {currencyCodes.map((code) => {
              const selectedCurrency =
                selecting === "top" ? topCurrency : bottomCurrency;

              return (
                <Pressable
                  key={code}
                  onPress={() => selectCurrency(code)}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${currencies[code].name}`}
                  style={({ pressed, hovered }) => [
                    styles.currencyOption,
                    (pressed || hovered) && styles.currencyOptionActive,
                  ]}
                >
                  {/* Currency Icon */}
                  <View style={styles.currencyIcon}>
                    {currencies[code].symbol}
                  </View>

                  {/* Currency Information */}
                  <View style={styles.currencyInfo}>
                    <Text style={styles.currencyCode}>{code}</Text>

                    <Text style={styles.currencyName}>
                      {currencies[code].name}
                    </Text>
                  </View>

                  {/* Selected Indicator */}
                  {code === selectedCurrency && (
                    <Check size={20} color="#C69BC4" strokeWidth={2} />
                  )}
                </Pressable>
              );
            })}
          </View>
        ) : (
          // Standard BottomSheet button
          <ActionButton
            title={activeSheet === "notifications" ? "Got it" : "Close"}
            onPress={closeSheet}
          />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Main screen
  container: {
    flex: 1,
    backgroundColor: "#0D0C0F",
  },

  scrollView: {
    flex: 1,
  },

  content: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  headerButton: {
    padding: 8,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
  },

  hovered: {
    opacity: 0.75,
  },

  pressed: {
    opacity: 0.5,
  },

  // Exchange Card
  card: {
    backgroundColor: "#211C26",
    borderRadius: 20,
  },

  divider: {
    height: 3,
    backgroundColor: "#111014",
  },

  // Swap Button
  switchButton: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    marginTop: -19,
    zIndex: 1,
    backgroundColor: "#111014",
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  switchHovered: {
    backgroundColor: "#403046",
  },

  switchPressed: {
    backgroundColor: "#59405F",
  },

  // Exchange Rate
  rate: {
    color: "#E4E0E7",
    textAlign: "center",
    fontSize: 12,
    marginVertical: 16,
  },

  // Transaction Details
  details: {
    marginTop: 22,
    gap: 12,
  },

  // Currency Selector
  currencyList: {
    width: "100%",
    alignSelf: "stretch",
    gap: 10,
  },

  currencyOption: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#252027",
  },

  currencyOptionActive: {
    backgroundColor: "#302633",
  },

  currencyIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  currencyInfo: {
    flex: 1,
  },

  currencyCode: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },

  currencyName: {
    color: "#AAA1AF",
    fontSize: 12,
    marginTop: 4,
  },
});
