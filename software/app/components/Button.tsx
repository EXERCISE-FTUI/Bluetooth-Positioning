import { ReactNode } from "react";
import { Pressable, Text } from "react-native";

function Button({ text, onPress }: { text: string; onPress: any }): ReactNode {
  return (
    <Pressable
      style={{
        paddingHorizontal: 24,
        paddingVertical: 8,
        backgroundColor: "#2FB8FF",
        marginBottom: 8, // mb-2
        borderRadius: 16,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}

export default Button;
