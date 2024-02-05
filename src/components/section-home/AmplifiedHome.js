import { View, Text, ScrollView } from "react-native";
import React from "react";
import SinglePost from "../ui/post/SinglePost";
import { AmplifiedPostCustomData } from "../../data/customPost";
import useHideTabBarOnScroll from "../../hooks/useHideTabBarOnScroll";

const AmplifiedHome = () => {
  const { handleScroll } = useHideTabBarOnScroll();
  return (
    <ScrollView
      onScroll={handleScroll}
      vertical
      showsVerticalScrollIndicator={false}
      className="pb-20"
    >
      <SinglePost details={AmplifiedPostCustomData[0]} />
      <SinglePost details={AmplifiedPostCustomData[0]} />
      <SinglePost details={AmplifiedPostCustomData[0]} />
      <SinglePost details={AmplifiedPostCustomData[0]} />
    </ScrollView>
  );
};

export default AmplifiedHome;
