import {
  ImageBackground,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../../context/AppContext";
import { colors } from "../../../../components/metrics/colors";
import { deviceHeight, styles } from "../../../../components/metrics/styles";

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
      <Pressable
        className="flex-1"
        onPress={() => {
          navigation.goBack();
          setTabBarVisible(true);
        }}
      >
        <BlurView
          tint="dark"
          intensity={90}
          className="flex-1 justify-center bg-[#00000060]"
        >
          {loading && (
            <ActivityIndicator size="large" color={colors.deepBlue} />
          )}

          {error ? (
            <Text style={styles.textmedium} className="text-center text-white">
              Error loading image
            </Text>
          ) : (
            <Image
              source={{ uri: imageUrl }}
              style={{ height: deviceHeight * 0.6 }}
              className="w-full bg-[#00000030]"
              resizeMethod="auto"
              resizeMode="contain"
            />
          )}
        </BlurView>
      </Pressable>
    </ImageBackground>
  );
};

export default ImageExpand;
