import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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

export default function HomeScreen() {
  const [swapped, setSwapped] = useState(false);

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
            style={styles.headerIcon}
            onPress={() => Alert.alert("Warning!", "There's no going back now")}
          >
            <ChevronLeft size={20} color="#ffffff" />
          </Pressable>
          <Text style={styles.headerTitle}>Exchange</Text>
          <Pressable
            style={styles.headerIcon}
            onPress={() => Alert.alert("Notice!", "Ringa Ding Ding")}
          >
            <BellDot size={20} color="#b48baf" />
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
          onPress={() =>
            Alert.alert("Ncaaaww", "You really thought you had it like that")
          }
        />

        <View style={styles.details}>
          <DetailRow label="Estimate fee" value="4.28 usd" />
          <DetailRow label="You will receive" value="43,941.68 USD" />
          <DetailRow label="Spread" value="0.2%" />
          <DetailRow label="Gas fee" value="0.0045 ETH" />
        </View>
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
});
