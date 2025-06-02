import * as Clipboard from "expo-clipboard";
import Toast from "react-native-simple-toast";

export const copyToClipboard = async (text) => {
  await Clipboard.setStringAsync(text);
  Toast.show("Copied to clipboard");
};
