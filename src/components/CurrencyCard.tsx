import { ChevronDown } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CurrencyCardProps = {
  currency: string;
  symbol: ReactNode;
  amount: string;
  balance: string;
  onPress: () => void;
};

export default function CurrencyCard({
  currency,
  symbol,
  amount,
  balance,
  onPress,
}: CurrencyCardProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`Select ${currency} currency`}
        style={({ pressed, hovered }) => [
          styles.currencyRow,
          { opacity: pressed ? 0.5 : hovered ? 0.75 : 1 },
        ]}
      >
        <View style={styles.icon}>{symbol}</View>

        <Text style={styles.currency}>{currency}</Text>

        <ChevronDown size={18} color="#B48BAF" />
      </Pressable>

      <Text style={styles.amount}>{amount}</Text>

      <View style={styles.balanceRow}>
        <Text style={styles.balance}>Balance</Text>
        <Text style={styles.balance}>{balance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  currencyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#17171C",
    justifyContent: "center",
    alignItems: "center",
  },
  currency: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  amount: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "300",
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balance: {
    color: "#9991A7",
    fontSize: 13,
  },
});
