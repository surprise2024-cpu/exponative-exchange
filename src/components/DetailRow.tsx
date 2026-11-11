import { StyleSheet, Text, View } from "react-native";

type DetailRowProps = {
  label: string;
  value: string;
};

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#9991A7",
    fontSize: 13,
  },
  value: {
    color: "#F1EDF3",
    fontSize: 13,
  },
});
