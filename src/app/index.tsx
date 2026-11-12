import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ActionButton from "@/components/ActionButton";
import CurrencyCard from "@/components/CurrencyCard";
import DetailRow from "@/components/DetailRow";

import {
  ArrowDownUp,
  BellDot,
  ChevronLeft,
  Diamond,
  DollarSign,
} from "lucide-react-native";

import BottomSheet from "../components/BottomSheet";

type SheetType = "buy" | "notifications" | "back" | null;

export default function HomeScreen() {
  const [swapped, setSwapped] = useState(false);
  const [isPresented, setIsPresented] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBackSheet, setShowBackSheet] = useState(false);
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);

  const eth = {
    currency: "ETH",
    symbol: <Diamond size={20} color="#ffffff" />,
    amount: "12,695",
    balance: "293.0187",
  };

  const usd = {
    currency: "USD",
    symbol: <DollarSign size={20} color="#ffffff" />,
    amount: "43,937.4",
    balance: "12,987.21",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.ScrollView}
        contentContainerStyle={styles.content}
      >
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
            <ChevronLeft size={20} color="#ffffff" strokeWidth={1.8} />
          </Pressable>
          <Text style={styles.headerTitle}>Exchange</Text>
          <Pressable
            onPress={() => setActiveSheet("notifications")}
            accessibilityLabel="Notifications"
            style={({ pressed, hovered }) => [
              styles.headerIcon,
              hovered && styles.hovered,
              pressed && styles.pressed,
            ]}
          >
            <BellDot size={20} color="#b48baf" strokeWidth={1.8} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <CurrencyCard {...(swapped ? usd : eth)} />

          <View style={styles.divider} />

          <Pressable
            onPress={() => setSwapped(!swapped)}
            style={({ pressed, hovered }) => [
              styles.switchButton,
              hovered && styles.switchHovered,
              pressed && styles.switchPressed,
            ]}
          >
            <Text style={styles.switchText}>
              <ArrowDownUp size={20} color="#b48baf" />
            </Text>
          </Pressable>

          <CurrencyCard {...(swapped ? eth : usd)} />
        </View>

        <Text style={styles.rate}>1 ETH = 3,461.02 USD</Text>

        <ActionButton
          title={swapped ? "Buy USD" : "Buy ETH"}
          onPress={() => setActiveSheet("buy")}
        />

        <View style={styles.details}>
          <DetailRow label="Estimate fee" value="4.28 usd" />
          <DetailRow label="You will receive" value="43,941.68 USD" />
          <DetailRow label="Spread" value="0.2%" />
          <DetailRow label="Gas fee" value="0.0045 ETH" />
        </View>

        <BottomSheet
          isPresented={activeSheet !== null}
          onDismiss={() => setActiveSheet(null)}
          snapPoints={["half"]}
          title={
            activeSheet === "buy"
              ? "To the Moon?"
              : activeSheet === "notifications"
                ? "All caught Up!"
                : "Leaving Already?"
          }
          subTitle={
            activeSheet === "buy"
              ? "Let's make sure that we can afford the fuel first."
              : activeSheet === "notifications"
                ? "No new notifications. Enjoy the peace!"
                : "The crypto market will miss you!"
          }
        >
          <ActionButton
            title={activeSheet === "notifications" ? "Got it" : "Close"}
            onPress={() => setActiveSheet(null)}
          />
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0C0F",
  },
  ScrollView: {
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  headerIcon: {
    color: "#FFFFFF",
    fontSize: 26,
    width: 28,
    padding: 8,
  },
  hovered: {
    opacity: 0.75,
  },
  pressed: {
    opacity: 0.5,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#211C26",
    borderRadius: 20,
  },
  divider: {
    height: 3,
    backgroundColor: "#111014",
  },
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
  switchText: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  rate: {
    color: "#E4E0E7",
    textAlign: "center",
    fontSize: 12,
    marginVertical: 16,
  },
  details: {
    marginTop: 22,
    gap: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontWeight: "600",
  },
});
