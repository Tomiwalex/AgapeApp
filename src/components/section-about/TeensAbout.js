import { ScrollView, Text } from "react-native";
import React from "react";
import AboutPost from "../ui/post/AboutPost";

const TeensAbout = () => {
  return (
    <ScrollView vertical showsVerticalScrollIndicator={false} className="p-4">
      <AboutPost
        bg={require("../../../assets/post-images/teens-about-image.png")}
        icon={require("../../../assets/icons/teen-icon.png")}
        title={"e-Teens"}
        description={`Agape Teens represents the dynamic and spirited teenage community within Agape Christian Ministries. This youth-focused ministry is designed to cater to the unique needs and interests of adolescents, providing a space where they can grow spiritually, form lasting connections, and navigate the challenges and triumphs of their teenage years.

With a dedicated team of leaders and mentors, Agape Teens engages in a variety of activities and programs aimed at fostering personal growth, deepening faith, and encouraging a sense of community. The ministry often includes dynamic youth services, interactive Bible studies, community service projects, and social events that allow teenagers to explore and express their faith in a supportive environment.

Agape Teens is more than just a ministry; it's a vibrant community where teenagers can find encouragement, build meaningful friendships, and discover their identity in the context of their Christian faith. Through discussions, worship, and shared experiences, Agape Teens aims to empower young individuals, helping them navigate the challenges of adolescence while embracing the values and teachings of Agape Christian Ministries.`}
      />
    </ScrollView>
  );
};

export default TeensAbout;
