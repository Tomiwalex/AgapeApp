import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import React from "react";
import { Video } from "expo-av";
import { deviceWidth } from "../../metrics/styles";
import playIcon from "../../../../assets/icons/play-icon.png";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../context/AppContext";

const SinglePostItem = ({ item }) => {
  const postWidth = deviceWidth - 40;
  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const navigation = useNavigation();
  const { setTabBarVisible } = useAppContext();

  return (
    <View style={{ width: deviceWidth }}>
      {/* Post image */}
      {item.type == "image" && (
        <TouchableHighlight
          className="rounded-[22px] mx-5"
          underlayColor={"#00000030"}
          onPress={() => {
            navigation.navigate("Home", {
              screen: "ImageExpand",
              params: { image: item.link },
            });
            setTabBarVisible(false);
          }}
        >
          <Image
            source={{ uri: item.link }} // item.link}
            resizeMode="contain"
            style={{ height: postWidth * 0.8 }}
            className="w-full  bg-gray-900 rounded-[22px]"
          />
        </TouchableHighlight>
      )}

      {/* Post video */}
      {item.type == "video" ||
        (item.type == "audio" && (
          <View style={{ width: postWidth }} className="ml-5">
            <Video
              ref={videoRef}
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              style={{ height: postWidth * 0.8, width: postWidth }}
              source={{
                uri: item.link,
              }}
              useNativeControls
              isLooping
              resizeMode="cover"
              className="w-full bg-gray-900 rounded-[22px] mx-auto"
            />

            {/* Play button */}
            {!status.isPlaying ? (
              <TouchableOpacity
                className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-[#00000080] rounded-[22px]"
                onPress={() =>
                  status.isPlaying
                    ? videoRef.current.pauseAsync()
                    : videoRef.current.playAsync()
                }
              >
                <Image source={playIcon} className="h-10 w-10" />
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
    </View>
  );
};

export default SinglePostItem;
