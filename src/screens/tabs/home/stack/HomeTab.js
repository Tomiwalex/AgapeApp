import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import not from "../../../../../assets/icons/notification-icon.png";
import ham from "../../../../../assets/icons/ham-menu-icon.png";
import logo from "../../../../../assets/icon.png";
import ScrollSection from "../../../../components/ui/ScrollSection";
import PostFlatlist from "../../../../components/ui/PostFlatlist";
import {
  AgapePostCustomData,
  AmplifiedPostCustomData,
  KidsPostCustomData,
  TeensPostCustomData,
} from "../../../../data/customPost";
import Menu from "../../../../components/ui/Menu";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../../context/AppContext";

const HomeTab = () => {
  const [isMenuShown, setShowMenu] = React.useState(false);
  const { setTabBarVisible } = useAppContext();

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#0a0a0c]">
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="p-5 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => {
              setShowMenu(!isMenuShown);
              setTabBarVisible(false);
            }}
          >
            <Image source={ham} className="w-[24] h-[18px]" />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <Image source={logo} className="w-[38px] h-9 mr-2" />
            <Image source={not} className="w-6 h-7" />
          </View>
        </View>

        {/* The scroll section */}
        <ScrollSection />

        <View className="pb-[70px]">
          {/* flatlist section for the agape christian ministry */}
          <PostFlatlist data={AgapePostCustomData} />

          {/* flatlist section for the amplified church */}
          <PostFlatlist data={AmplifiedPostCustomData} />

          {/* flatlist section for the Teens church */}
          <PostFlatlist data={TeensPostCustomData} />

          {/* flatlist section for the kids church */}
          <PostFlatlist data={KidsPostCustomData} />
        </View>
      </ScrollView>

      {/* the app menu */}
      {isMenuShown && <Menu setShowMenu={setShowMenu} />}
    </View>
  );
};

export default HomeTab;
