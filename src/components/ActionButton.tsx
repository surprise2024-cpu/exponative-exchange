import { Pressable, StyleSheet, Text } from "react-native";

type ActionButtonProps = {
  title: string;
  onPress: () => void;
};

export default function ActionButton({ title, onPress }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed, hovered }) => [
        styles.button,
        hovered && styles.hovered,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  hovered: {
    backgroundColor: "#E6DBE8",
  },
  pressed: {
    backgroundColor: "#D5CBD8",
    opacity: 0.85,
  },
  text: {
    color: "#17141A",
    fontSize: 15,
    fontWeight: "500",
  },
});
