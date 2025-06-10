import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { deviceWidth, styles } from "../../metrics/styles";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../metrics/colors";
import SinglePostItem from "./SinglePostItem";
import agapeIcon from "../../../../assets/icons/agape-icon.png";
import amplifiedIcon from "../../../../assets/icons/amp-icon.png";
import kidsIcon from "../../../../assets/icons/kids-icon.png";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const SinglePost = ({ details, ash }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showText, setShowText] = React.useState(false);
  const scrollViewRef = React.useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: activeIndex * deviceWidth,
        animated: false,
      });
    }
  }, [activeIndex]);

  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / deviceWidth);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex !== details?.mediaUrls.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex !== 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <View
      style={{ backgroundColor: ash && "#494B4D" }}
      className="py-8 my-[2px]"
    >
      {/* Post information || header */}
      <View className="flex-row items-center px-3">
        {details?.audience === "agape" ||
        details?.audience === "all" ||
        details?.audience === "amplified" ||
        details?.audience === "children" ? (
          <Image
            source={
              details?.audience === "amplified"
                ? amplifiedIcon
                : details?.audience === "children"
                ? kidsIcon
                : agapeIcon
            }
            alt="image"
            className="h-11 w-11"
            resizeMode="contain"
          />
        ) : (
          <View className="h-11 w-11 mr-1 bg-gray-900 items-center justify-center rounded-full">
            <Text
              style={styles.textsemibold}
              className="text-gray-500 text-3xl"
            >
              {details?.audience.trim().charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <Text
          style={styles.textbold}
          className="text-white max-w-[164px] text-sm ml-1"
        >
          {details?.author === "agape" || details?.audience === "agape"
            ? "The Agape Christian Ministries"
            : details?.audience === "amplified"
            ? "The Amplified Church"
            : details?.audience === "all"
            ? "The Agape Christian Ministries"
            : details?.audience === "children"
            ? "Agape Children"
            : details?.audience}
        </Text>
      </View>

      {/* Post text */}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setShowText(!showText)}
      >
        <Animated.Text
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.textmedium}
          numberOfLines={showText ? null : 3}
          className="text-white text-sm my-3 ml-[5px]  px-3 text-ellipsis overflow-hidden"
        >
          {details?.text || details?.description}
        </Animated.Text>
      </TouchableOpacity>

      <View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScroll}
        >
          {details.data
            ? details.data.map((item, index) => (
                <SinglePostItem key={index} item={item} />
              ))
            : details?.mediaUrls.map((item, index) => (
                <SinglePostItem key={index} item={item} />
              ))}
        </ScrollView>

        {/* The navigation icons to be shown when the data list is more than 1 details */}
        {details.mediaUrls.length > 1 && (
          <View className="flex-row absolute bottom-5 right-8">
            {/* The navigation buttons */}
            <TouchableOpacity
              onPress={handlePrev}
              disabled={activeIndex === 0}
              style={{ opacity: activeIndex === 0 ? 0.6 : 1 }}
            >
              <Entypo
                name="chevron-with-circle-left"
                size={24}
                color={colors.gold}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>

            {/* Right icon */}
            <TouchableOpacity
              onPress={handleNext}
              disabled={activeIndex === details?.mediaUrls.length - 1}
              style={{
                opacity:
                  activeIndex === details?.mediaUrls.length - 1 ? 0.6 : 1,
              }}
            >
              <Entypo
                name="chevron-with-circle-right"
                size={24}
                color={colors.gold}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default SinglePost;
