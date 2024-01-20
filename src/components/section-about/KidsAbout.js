import { ScrollView, Text } from "react-native";
import React from "react";
import AboutPost from "../ui/post/AboutPost";

const KidsAbout = () => {
  return (
    <ScrollView vertical showsVerticalScrollIndicator={false} className="p-4">
      <AboutPost
        bg={require("../../../assets/post-images/kids-about-image.png")}
        icon={require("../../../assets/icons/kids-icon.png")}
        title={"e-Kids"}
        description={`Agape Kids is the joyful and nurturing children's ministry associated with Agape Christian Ministries. Tailored for the youngest members of the community, Agape Kids focuses on creating a safe, engaging, and spiritually enriching environment. Through a variety of age-appropriate activities, lessons, and events, the ministry aims to instill foundational values, encourage a love for learning, and foster a sense of belonging within the broader Christian community.

With dedicated leaders and volunteers, Agape Kids is committed to providing not only educational and spiritual guidance but also fostering a sense of joy, creativity, and connection among the children. The ministry often includes interactive lessons, storytelling, music, and opportunities for young participants to actively engage in their faith journey.

Agape Kids within Agape Christian Ministries strives to create a positive and supportive space where children can grow in their understanding of Christian principles, build meaningful friendships, and discover the joy of being part of a caring and compassionate community.`}
      />
    </ScrollView>
  );
};

export default KidsAbout;
