import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import GradientText from "../Components/LinearGradientText";
import { useMainStore } from "../stores/mainStore";
import { StatusBar } from "react-native";

const ChatScreenHeader = ({ navigation }) => {
  const headerName = useMainStore((state) => state.headerName);
  const imageSource = useMainStore((state) => state.imageSource);

  return (
    <View
      className={`bg-white flex-row justify-between items-center pl-4 pr-4 pb-2 border-b-2 border-[#f6f6f6]`}
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className="flex-row items-center" style={{ gap: 10 }}>
        <Pressable
          android_ripple={{ borderless: true }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={26} color={"#000"} />
        </Pressable>
        <Image
          width={40}
          height={40}
          source={{ uri: imageSource }}
          className="rounded-full"
        />
        <Text className="text-lg">{headerName}</Text>
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
