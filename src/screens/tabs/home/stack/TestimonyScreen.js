import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import SectionHeader from "../../../../components/ui/SectionHeader";
import AboutPost from "../../../../components/ui/post/AboutPost";
import { styles } from "../../../../components/metrics/styles";
import { colors } from "../../../../components/metrics/colors";
import { AntDesign } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { CustomAlert } from "../../../../components/custom-ui/CustomAlert";
import { PostData } from "../../../../components/function/PostData";
import { POST_URL, TESTIMONY_URL } from "../../../../components/url/url";

const TestimonyScreen = () => {
  const [isShown, setShown] = React.useState(false);
  const [isTypeShown, setTypeShown] = React.useState(false);
  const [testimonyData, setTestimonyData] = React.useState({
    title: "",
    phone: "",
    testimonyType: "",
    email: "",
    address: "",
    testimony: "",
    testifier: "user",
  });
  const [inputError, setInputError] = React.useState({
    mailError: false,
  });
  const { alert } = CustomAlert();
  const { postData } = PostData({ url: TESTIMONY_URL, data: testimonyData });

  // function to check if the email is valid
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setInputError({ ...inputError, mailError: false });
    } else {
      setInputError({ ...inputError, mailError: true });
    }
  };

  const onSubmit = () => {
    if (
      testimonyData.title.length > 0 &&
      inputError.mailError === false &&
      testimonyData.testimony.length > 0 &&
      testimonyData.email.length > 0 &&
      testimonyData.address.length > 0 &&
      testimonyData.phone.length > 0
    ) {
      postData(TESTIMONY_URL, testimonyData);
    } else {
      alert(true, "Please fill all the fields correctly");
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#0a0a0c]" vertical>
      <SectionHeader
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        name={isShown ? "Share your testimony" : "Testimony"}
        type={2}
        image={require("../../../../../assets/icon.png")}
      />

      <View className="my-4 mx-4">
        {!isShown && (
          <AboutPost
            onPress={() => setShown(!isShown)}
            type={2}
            tapText={"Tap to share your testimony"}
            description={
              "Sharing our stories holds immense power. When we share our testimonies, we're not just talking about our experiences; we're offering hope, encouragement, and understanding."
            }
            title={"Testimony"}
            bg={require("../../../../../assets/post-images/testimony-image.png")}
          />
        )}

        {/* // the testimony form */}
        {isShown && (
          <Animated.View entering={FadeIn} className="m-4 mt-1">
            <TextInput
              style={styles.textmedium}
              placeholderTextColor={"#969696"}
              className="border-[1px] border-[#F0DA6B] rounded-[8px] text-xs text-white p-4 py-3 my-2"
              placeholder="Testimony Title"
              cursorColor={colors.gold}
              value={testimonyData.title}
              onChangeText={(e) =>
                setTestimonyData({ ...testimonyData, title: e })
              }
            />
            {/* phone number details */}
            <View className="flex-row items-center">
              <View className="border-[1px] border-[#F0DA6B] rounded-[8px] py-[7px] px-3">
                <Image
                  className="w-9 h-9"
                  source={require("../../../../../assets/icons/nigeria-icon.png")}
                />
              </View>
              <Text
                style={styles.textmedium}
                className="border-[1px] border-[#F0DA6B] rounded-[8px] text-xs text-[#969696] p-4 py-[17px] mx-2"
              >
                +234
              </Text>

              <TextInput
                style={styles.textmedium}
                placeholderTextColor={"#969696"}
                className="border-[1px] border-[#F0DA6B] rounded-[8px] text-xs text-white p-4 py-3 my-2 flex-1"
                placeholder="Phone number"
                cursorColor={colors.gold}
                value={testimonyData.phone}
                keyboardType="number-pad"
                onChangeText={(e) =>
                  setTestimonyData({ ...testimonyData, phone: e })
                }
              />
            </View>
            {/* mail */}
            <TextInput
              style={[
                styles.textmedium,
                { borderColor: inputError.mailError ? "red" : "#F0DA6B" },
              ]}
              placeholderTextColor={"#969696"}
              className="border-[1px] rounded-[8px] text-xs text-white p-4 py-3 mt-2"
              placeholder="Mail"
              cursorColor={colors.gold}
              value={testimonyData.email}
              onChangeText={(e) => {
                setTestimonyData({ ...testimonyData, email: e });
                isEmailValid(e);
              }}
            />
            {/* error message for mail */}
            {inputError.mailError ? (
              <Animated.Text
                entering={FadeIn}
                style={styles.textmedium}
                className="text-red-500 text-xs ml-1 mt-1 mb-2"
              >
                *Input a valid mail!
              </Animated.Text>
            ) : null}

            {/* Adress */}
            <TextInput
              style={styles.textmedium}
              placeholderTextColor={"#969696"}
              className="border-[1px] border-[#F0DA6B] rounded-[8px] text-xs text-white p-4 py-3 my-2"
              placeholder="Address"
              multiline={true}
              numberOfLines={5}
              cursorColor={colors.gold}
              value={testimonyData.address}
              onChangeText={(e) =>
                setTestimonyData({ ...testimonyData, address: e })
              }
            />
            {/* testimony type */}
            <View>
              <View className="flex-row justify-between items-center border-[#F0DA6B] p-3 border-[1px] rounded-[8px] mt-2">
                <Text
                  style={styles.textmedium}
                  className="text-xs text-[#969696]"
                >
                  {testimonyData.testimonyType
                    ? testimonyData.testimonyType
                    : "Select Testimony Type"}
                </Text>

                <TouchableOpacity onPress={() => setTypeShown(!isTypeShown)}>
                  <AntDesign name="circledowno" size={24} color={"#F0DA6B99"} />
                </TouchableOpacity>
              </View>

              {isTypeShown && (
                <Animated.View
                  entering={FadeIn}
                  exiting={FadeOut}
                  className="p-3 border-[1px] border-[#F0DA6B] rounded-[8px] mt-4"
                >
                  <TouchableOpacity
                    onPress={() => {
                      setTypeShown(!isTypeShown);
                      setTestimonyData({
                        ...testimonyData,
                        testimonyType: "Agape",
                      });
                    }}
                    className="border-b-[1px] border-b-[#F0DA6B70] p-3"
                  >
                    <Text
                      style={styles.textmedium}
                      className="text-gray-400 text-sm"
                    >
                      Agape
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setTypeShown(!isTypeShown);
                      setTestimonyData({ ...testimonyData, type: "Others" });
                    }}
                  >
                    <Text
                      style={styles.textmedium}
                      className="text-gray-400 text-sm px-3 py-3"
                    >
                      Others
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </View>
            {/* testimony */}

            <TextInput
              style={styles.textmedium}
              placeholderTextColor={"#969696"}
              className="border-[1px] border-[#F0DA6B] rounded-[8px] text-xs text-white p-4 py-3 my-4"
              placeholder="Type your testimony....."
              multiline={true}
              numberOfLines={6}
              cursorColor={colors.gold}
              value={testimonyData.testimony}
              onChangeText={(e) =>
                setTestimonyData({ ...testimonyData, testimony: e })
              }
            />

            <TouchableOpacity
              onPress={onSubmit}
              style={{ backgroundColor: colors.gold }}
              className="p-4 rounded-[8px] my-5"
            >
              <Text
                style={styles.textbold}
                className="text-base text-center text-gray-900"
              >
                Submit
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
};

export default TestimonyScreen;
