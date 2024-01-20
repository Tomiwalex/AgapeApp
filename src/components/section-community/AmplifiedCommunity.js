import { ScrollView, View } from "react-native";
import React, { Component } from "react";
import CommunityPost from "../ui/post/CommunityPost";

export class AmplifiedCommunity extends Component {
  render() {
    return (
      <ScrollView
        className="px-4 pt-4 mb-24"
        vertical
        showsVerticalScrollIndicator={false}
      >
        <CommunityPost
          title={"e-group"}
          description={"The amplified church e-groups"}
          bg={require("../../../assets/post-images/amplified-community-image-1.png")}
        />
      </ScrollView>
    );
  }
}

export default AmplifiedCommunity;
