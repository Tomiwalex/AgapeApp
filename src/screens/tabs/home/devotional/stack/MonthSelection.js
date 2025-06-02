import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import React from "react";
import SectionHeader from "../../../../../components/ui/SectionHeader";
import { styles } from "../../../../../components/metrics/styles";
import { colors } from "../../../../../components/metrics/colors";
import useHideTabBarOnScroll from "../../../../../hooks/useHideTabBarOnScroll";
import { useNavigation } from "@react-navigation/native";

const MonthSelection = () => {
  const { handleScroll } = useHideTabBarOnScroll();
  const navigation = useNavigation();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <ScrollView
      onScroll={handleScroll}
      showsVerticalScrollIndicator={false}
      className="bg-[#0e0e0e] flex-1 pt-3 pb-24"
    >
      <SectionHeader
        type={2}
        name={"Devotional"}
        image={require("../../../../../../assets/icons/agape-icon.png")}
        image2={require("../../../../../../assets/icons/book-icon.png")}
      />

      <View
        style={{ borderTopColor: colors.gold }}
        className="p-4 border-t-[1px] mt-1"
      >
        <Text
          style={styles.textsemibold}
          className="text-white text-lg ml-2 mb-5"
        >
          Months
        </Text>

        {months.map((month, index) => {
          return (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("Days", {
                  month: index + 1,
                  monthAlp: month,
                  months: months,
                })
              }
              underlayColor={colors.gold}
              style={{ borderColor: colors.gold }}
              className=" p-4 px-6 rounded-2xl my-2  border-[1px]"
              key={index}
            >
              <Text
                style={styles.textsemibold}
                className="text-white text-base"
              >
                {month}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default MonthSelection;
