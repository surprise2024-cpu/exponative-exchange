import type { SnapPoint } from "@expo/ui";
import { BottomSheet, RNHostView } from "@expo/ui";
import type { ReactNode } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

type BottomSheetProps = {
  isPresented: boolean;
  onDismiss: () => void;
  children: ReactNode;
  icon?: ReactNode;
  snapPoints?: SnapPoint[];
  showDragIndicator?: boolean;
  title?: string;
  subTitle?: string;
  scrollable?: boolean;
};

export default function BottomSheetExample({
  isPresented,
  onDismiss,
  children,
  icon,
  snapPoints = ["half", "full"],
  showDragIndicator = true,
  title,
  subTitle,
  scrollable = false,
}: BottomSheetProps) {
  const { width, height } = useWindowDimensions();

  const header = (
    <>
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      {title && <Text style={styles.title}>{title}</Text>}

      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </>
  );

  return (
    <BottomSheet
      isPresented={isPresented}
      onDismiss={onDismiss}
      snapPoints={snapPoints}
      showDragIndicator={showDragIndicator}
    >
      {scrollable ? (
        // Currency selector: flexible, scrollable content
        <RNHostView>
          <View style={styles.scrollContainer}>
            <View style={styles.header}>{header}</View>

            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
              nestedScrollEnabled
              showsVerticalScrollIndicator
            >
              {children}
            </ScrollView>
          </View>
        </RNHostView>
      ) : (
        // Other sheets: centered content
        <RNHostView matchContents>
          <View
            style={[
              styles.centeredContainer,
              {
                width: Math.min(width - 32, 420),
                height: Math.min(height * 0.42, 420),
              },
            ]}
          >
            {header}
            {children}
          </View>
        </RNHostView>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  // Normal BottomSheets
  centeredContainer: {
    justifyContent: "center",
    alignItems: "stretch",
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 18,
  },

  // Currency selector
  scrollContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },

  header: {
    width: "100%",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  scrollArea: {
    flex: 1,
    width: "100%",
    minHeight: 0,
  },

  scrollContent: {
    paddingBottom: 24,
    gap: 10,
  },

  // Shared elements
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#302633",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  subTitle: {
    fontSize: 16,
    color: "#DDD9D9",
    textAlign: "center",
  },
});
