import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SectionHeader from "../../../../../components/ui/SectionHeader";
import { colors } from "../../../../../components/metrics/colors";
import { styles } from "../../../../../components/metrics/styles";
import { devotionalText } from "../../../../../data/devotional/devotional";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoPost from "../../../../../components/ui/post/NoPost";
import { usePreventScreenCapture } from "expo-screen-capture";
const Devotional = ({ route }) => {
  usePreventScreenCapture();
  const [pday, setPday] = useState(route.params.day);
  const [pmonth, setPmonth] = useState(route.params.month);
  const [dateStr, setDateStr] = useState(`${pmonth}/${pday}/2024`);
  const [month, day, year] = dateStr.split("/").map(Number);

  const date = new Date(year, month - 1, day);
  const localeDateString = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "long",
  });

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const previousMonth = month - 1;
  const previousDate = new Date(
    year,
    pday - 1 < 1 ? month - 2 : month - 1,
    pday - 1 < 1 ? getDaysInMonth(previousMonth, 2024) : pday - 1
  );

  const nextDate = new Date(
    year,
    pday + 1 > route.params.noOfDays ? month : month - 1,
    pday + 1 > route.params.noOfDays ? 1 : pday + 1
  );

  const nextDateString = nextDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const previousDateString = previousDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const currdevotional = devotionalText[Number(pmonth)].devotion[Number(pday)];

  const handleNextDay = () => {
    if (pday + 1 > route.params.noOfDays) {
      setPmonth(pmonth + 1);
      setPday(1);
      setDateStr(`${pmonth + 1}/${1}/2024`);
    } else {
      setPday(pday + 1);
      setDateStr(() => `${pmonth}/${pday + 1}/2024`);
    }
  };

  const handlePreviousDay = () => {
    if (pday - 1 < 1) {
      const newMonth = pmonth - 1;
      setPmonth(newMonth);
      const newDaysInMonth = getDaysInMonth(newMonth, 2024);
      setPday(newDaysInMonth);
      setDateStr(`${pmonth - 1}/${newDaysInMonth}/2024`);
    } else {
      setPday(pday - 1);
      setDateStr(() => `${pmonth}/${pday - 1}/2024`);
    }
  };

  return (
    <View className="bg-[#0e0e0e] flex-1 pt-3">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SectionHeader
          type={2}
          name={"Devotional"}
          image={require("../../../../../../assets/icons/agape-icon.png")}
          image2={require("../../../../../../assets/icons/book-icon.png")}
        />

        {!currdevotional && (
          <View className="mb-10">
            <NoPost title={"Content"} />
          </View>
        )}
        {currdevotional && (
          <View
            style={{ borderTopColor: colors.gold }}
            className="p-4  border-t-[1px] mt-1"
          >
            <View className="items-center flex-row flex-wrap gap-y-1">
              <Text
                style={styles.textsemibold}
                className="text-white text-xl mr-1"
              >
                {currdevotional?.topic}
              </Text>
              <Text
                style={styles.textmedium}
                className="text-[#F0DA6B] text-sm underline "
              >
                {currdevotional?.bibleReference &&
                  `(${currdevotional?.bibleReference})`}
              </Text>
            </View>

            {/* date */}
            <Text
              style={styles.textsemibold}
              className="text-white text-sm my-2"
            >
              {localeDateString}
            </Text>

            {/* the devotional text */}
            <Text
              style={styles.textmedium}
              className="text-[#f6f6f6] text-sm my-2 leading-6"
            >
              {currdevotional.text}
            </Text>

            {currdevotional.prayer && (
              <Text
                style={styles.textsemibold}
                className="text-[#F0DA6B] text-sm my-3 "
              >
                Prayer: {currdevotional.prayer}
              </Text>
            )}

            {/* meditation */}
            {currdevotional.meditation && (
              <Text
                style={styles.textmedium}
                className="text-[#F0DA6B] text-sm my-3 "
              >
                Meditation: {currdevotional.meditation}
              </Text>
            )}
          </View>
        )}
      </ScrollView>
      <View className="flex-row items-center justify-between py-6 border-black border-[1px] px-5 mt-auto">
        <TouchableOpacity
          onPress={handlePreviousDay}
          className="flex-row items-center"
        >
          <EvilIcons name="arrow-left" size={24} color={colors.gold} />
          <Text style={styles.textmedium} className="text-white text-sm">
            {previousDateString}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextDay}
          className="flex-row items-center"
        >
          <Text style={styles.textmedium} className="text-white text-sm">
            {nextDateString}
          </Text>
          <EvilIcons name="arrow-right" size={24} color={colors.gold} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Devotional;
