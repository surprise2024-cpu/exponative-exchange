import { BottomSheet, RNHostView, SnapPoint } from "@expo/ui";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

type BottomSheetProps = {
  isPresented: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  snapPoints?: SnapPoint[];
  showDragIndicator?: boolean;
  title?: string;
  subTitle?: string;
};

export default function BottomSheetExample({
  isPresented,
  onDismiss,
  children,
  snapPoints,
  showDragIndicator = true,
  title,
  subTitle,
}: BottomSheetProps) {
  const { height } = useWindowDimensions();

  return (
    <BottomSheet
      isPresented={isPresented}
      onDismiss={onDismiss}
      snapPoints={snapPoints}
      showDragIndicator={showDragIndicator}
    >
      <RNHostView>
        <View style={[styles.container, { height: height * 0.4 }]}>
          <View style={styles.content}>
            {title && <Text style={styles.title}>{title}</Text>}

            {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}

            {children}
          </View>
        </View>
      </RNHostView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  centerVertically: {
    justifyContent: "center",
  },
  content: {
    width: "100%",
    alignSelf: "stretch",
    gap: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#ddd9d9",
    textAlign: "center",
  },
});
