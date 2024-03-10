import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import GradientText from "../Components/LinearGradientText";
import { useMainStore } from "../stores/mainStore";
import { StatusBar } from "react-native";
import { StackActions } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

const ChatScreenHeader = ({ navigation }) => {
  const headerName = useMainStore((state) => state.headerName);
  const imageSource = useMainStore((state) => state.imageSource);

  const { colorScheme } = useColorScheme();

  return (
    <View
      className={`bg-white dark:bg-[#121212] flex-row justify-between items-center pl-4 pr-4 pb-2 border-b border-[#f6f6f6] dark:border-[#313131]`}
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className="flex-row items-center" style={{ gap: 10 }}>
        <Pressable
          android_ripple={{ borderless: true }}
          onPress={() => {
            StackActions.pop();
            navigation.navigate("Main");
          }}
        >
          <Ionicons name="arrow-back-outline" size={26} color={colorScheme === 'light' ? "#121212" : '#fff'} />
        </Pressable>
        {imageSource ? (
          <Image
            width={40}
            height={40}
            source={{ uri: imageSource }}
            className="rounded-full"
          />
        ) : (
          <Image
            width={40}
            height={40}
            style={{ width: 40, height: 40, resizeMode: "center" }}
            source={require("../../assets/dp-default.jpg")}
            className="rounded-full"
          />
        )}
        <Text className="text-lg dark:text-white">{headerName}</Text>
      </View>
      <View>
        <Pressable android_ripple={{ borderless: true }}>
          <GradientText colors={["#5ce27f", "#5cabe2"]} style={{}}>
            <Ionicons name="call-outline" size={24} color="black" />
          </GradientText>
        </Pressable>
      </View>
    </View>
  );
};

export default ChatScreenHeader;
