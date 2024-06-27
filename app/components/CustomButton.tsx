import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
}: {
  title: string;
  handlePress: any;
  containerStyles: string;
  textStyles: string;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-dodgerblue rounded-xl min-h-[62px] flex flex-row justify-center items-center text-center ${containerStyles}`}
    >
      <Text className={`text-gray-800 text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
