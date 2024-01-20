import { ScrollView, Text } from "react-native";
import React from "react";
import AboutPost from "../ui/post/AboutPost";

const AmplifiedAbout = () => {
  return (
    <ScrollView vertical showsVerticalScrollIndicator={false} className="p-4">
      <AboutPost
        bg={require("../../../assets/post-images/amplified-about-image.png")}
        icon={require("../../../assets/icons/amp-icon.png")}
        title={"The Amplified Church"}
        description={
          "Agape Amplified Youth is the vibrant and dynamic youth community affiliated with Agape Christian Ministries. Committed to fostering spiritual growth, meaningful connections, and positive impact, this youth group provides a welcoming space for young individuals to explore and deepen their faith. Through a range of activities, events, and programs, Agape Amplified Youth seeks to empower and inspire its members, nurturing a sense of community, service, and shared values. The youth of Agape Christian Ministries are dedicated to amplifying love, faith, and compassion, creating a supportive environment where young people can thrive spiritually and personally."
        }
      />
    </ScrollView>
  );
};

export default AmplifiedAbout;
