import { ScrollView, Text } from "react-native";
import React from "react";
import CommunityPost from "../ui/post/CommunityPost";

const AgapeCommunity = () => {
  return (
    <ScrollView
      className="px-4 pt-4 mb-24"
      vertical
      showsVerticalScrollIndicator={false}
    >
      <CommunityPost
        title="Agape Convention"
        description={
          "35TH AGAPE INTERNATIONAL ANNUAL CONVENTION Theme : THE AMAZING GOD Father,We Say thank you! Thank you for all that you are to us."
        }
        bg={require("../../../assets/post-images/agape-community-image-1.png")}
      />
    </ScrollView>
  );
};

export default AgapeCommunity;
