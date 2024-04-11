import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SectionHeader from "../../../../../components/ui/SectionHeader";
import { styles } from "../../../../../components/metrics/styles";
import { colors } from "../../../../../components/metrics/colors";
import { EvilIcons } from "@expo/vector-icons";
import { useAppContext } from "../../../../../context/AppContext";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const DaysSelection = ({ route }) => {
  const month = route.params.month;
  const [activeMonth, setActiveMonth] = useState(month);
  const [daysArray, setDaysArray] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState();
  const { setTabBarVisible } = useAppContext();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // Function to generate an array of days from 1 to the specified number of days
  const generateDaysArray = (numDays) => {
    return Array.from({ length: numDays }, (_, index) => index + 1);
  };

  useEffect(() => {
    setTabBarVisible(false);
    const newDaysInMonth = getDaysInMonth(activeMonth, 2024);
    setDaysInMonth(newDaysInMonth);
    setDaysArray(() => generateDaysArray(newDaysInMonth));
  }, [activeMonth]);

  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-[#0e0e0e] flex-1 pt-3"
    >
      <SectionHeader
        type={2}
        name={"Devotional"}
        image={require("../../../../../../assets/icons/agape-icon.png")}
        image2={require("../../../../../../assets/icons/book-icon.png")}
      />

      <View
        style={{ borderTopColor: colors.gold }}
        className="p-4 border-t-[1px] mt-1 flex-1"
      >
        <Text
          style={styles.textsemibold}
          className="text-white text-xl ml-2 mb-5"
        >
          {route.params.months[activeMonth - 1]}
        </Text>

        <View className="flex-row flex-wrap flex-1">
          {daysArray.map((day, index) => {
            return (
              <Animated.View
                key={index}
                exiting={FadeOut}
                entering={FadeIn.delay(index * 6)}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DailyDevotion", {
                      day: day,
                      month: activeMonth,
                      noOfDays: daysInMonth,
                    })
                  }
                  activeOpacity={0.6}
                  style={{ borderColor: colors.gold }}
                  className="h-10 w-10 items-center justify-center border-[1px] rounded-lg m-3"
                  key={index}
                >
                  <Text
                    style={styles.textsemibold}
                    className="text-white text-base"
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>

      <View className="flex-row items-center justify-between py-6 border-black border-[1px] px-5 mt-auto">
        <TouchableOpacity
          disabled={activeMonth === 1 ? true : false}
          style={{ opacity: activeMonth === 1 ? 0 : 1 }}
          onPress={() => setActiveMonth((prev) => prev - 1)}
          className="flex-row items-center"
        >
          <EvilIcons name="arrow-left" size={24} color={colors.gold} />
          <Text style={styles.textmedium} className="text-white text-sm">
            {route.params.months[activeMonth - 2]}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={activeMonth === 12 ? true : false}
          style={{ opacity: activeMonth === 12 ? 0 : 1 }}
          onPress={() => setActiveMonth((prev) => prev + 1)}
          className="flex-row items-center"
        >
          <Text style={styles.textmedium} className="text-white text-sm">
            {route.params.months[activeMonth]}
          </Text>
          <EvilIcons name="arrow-right" size={24} color={colors.gold} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DaysSelection;
