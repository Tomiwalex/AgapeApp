import { ScrollView, Text } from "react-native";
import React from "react";
import AboutPost from "../ui/post/AboutPost";
import bg from "../../../assets/post-images/agape-about-image.png";

const AgapeAbout = () => {
  return (
    <ScrollView vertical showsVerticalScrollIndicator={false} className="p-4">
      <AboutPost
        bg={bg}
        description={
          "Sometimes in July, 1987, a seemingly insignificant event occurred unnoticed in the city of Akure, capital of Ondo state, Nigeria. In one of the evenings, four people gathered together in the living room of Deacon Felix Aderemi Adejumo for a service. It was the first ever to be held and conducted under the auspices of what is now known as Agape Christian Ministries Inc. The team comprised the founding couple, their mechanic and someone else. Like a mustard seed, Agape was planted; it germinated, grew and became a mighty tree with branches for the birds of heaven to make their nests therein."
        }
        icon={require("../../../assets/icons/agape-icon.png")}
        title="Agape Christian Ministries"
      />
    </ScrollView>
  );
};

export default AgapeAbout;
