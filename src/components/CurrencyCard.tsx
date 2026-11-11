import { ChevronDown } from "lucide-react-native";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type CurrencyCardProps = {
  currency: string;
  symbol: ReactNode;
  amount: string;
  balance: string;
};

export default function CurrencyCard({
  currency,
  symbol,
  amount,
  balance,
}: CurrencyCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.currencyRow}>
        <View style={styles.icon}>{symbol}</View>
        <Text style={styles.currency}>
          {currency}
          <ChevronDown size={15} color="#b48baf" />
        </Text>
      </View>

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
