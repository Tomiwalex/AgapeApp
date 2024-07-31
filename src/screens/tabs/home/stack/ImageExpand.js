import {
  ImageBackground,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../../context/AppContext";
import { colors } from "../../../../components/metrics/colors";
import {
  deviceHeight,
  deviceWidth,
  styles,
} from "../../../../components/metrics/styles";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const ImageExpand = ({ route }) => {
  const navigation = useNavigation();
  const { setTabBarVisible } = useAppContext();
  const imageUrl = route.params.image;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(imageUrl);
        if (response.ok) {
          // Image loaded successfully
          setLoading(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [imageUrl]);

  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      className="flex-1"
      resizeMode="cover"
    >
      <BlurView tint="dark" intensity={80} className="flex-1  bg-[#00000099]">
        <TouchableOpacity
          style={{ paddingTop: StatusBar.currentHeight }}
          onPress={() => {
            navigation.goBack();
            setTabBarVisible(true);
            className = "ml-3 relative left-5 rounded-md bg-[#fff] block";
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="white"
            style={{ marginTop: 20, marginLeft: 20 }}
          />
        </TouchableOpacity>

        <View
          style={{ bottom: StatusBar.currentHeight }}
          className="flex-1 justify-center"
        >
          {loading && !error && (
            <View
              style={{ left: deviceWidth / 2 - 32 }}
              className="w-16 h-16 items-center justify-center absolute z-[5]  left-auto  rounded-md bg-[#0F3581]"
            >
              <ActivityIndicator size="small" color={"white"} />
            </View>
          )}

          {error ? (
            <Text
              style={styles.textmedium}
              className="text-center text-red-700 text-lg bg-red-200 p-4 rounded-2xl"
            >
              Error loading image
            </Text>
          ) : (
            <Image
              source={{ uri: imageUrl }}
              style={{ height: deviceHeight * 0.6 }}
              className="w-full "
              resizeMethod="auto"
              resizeMode="contain"
            />
          )}
        </View>
      </BlurView>
    </ImageBackground>
  );
};

export default ImageExpand;
