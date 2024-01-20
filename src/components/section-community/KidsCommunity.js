import { ScrollView, View } from "react-native";
import React from "react";
import CommunityPost from "../ui/post/CommunityPost";

const KidsCommunity = () => {
  return (
    <ScrollView
      className="px-4 pt-4 mb-24"
      vertical
      showsVerticalScrollIndicator={false}
    >
      <CommunityPost
        title={"Child Baptism"}
        description={"Child baptism for kids in the church "}
        bg={require("../../../assets/post-images/kids-community-image-1.png")}
      />
    </ScrollView>
  );
};

export default KidsCommunity;
