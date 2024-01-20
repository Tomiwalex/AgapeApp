import { ScrollView } from "react-native";
import React from "react";
import CommunityPost from "../ui/post/CommunityPost";

const TeensCommunity = () => {
  return (
    <ScrollView
      className="px-4 pt-4 mb-24"
      vertical
      showsVerticalScrollIndicator={false}
    >
      <CommunityPost
        title={"Hangout"}
        description={"Hangout for teens in the church "}
        bg={require("../../../assets/post-images//teens-community-image-1.png")}
      />
    </ScrollView>
  );
};

export default TeensCommunity;
