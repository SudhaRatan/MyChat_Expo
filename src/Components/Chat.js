import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import GradientText from "./LinearGradientText";
import { LinearGradient } from "expo-linear-gradient";

const Chat = ({
  dp,
  name,
  lastMessage,
  lastMessageDateTime,
  unreadMessages,
  sent,
  number,
  onclick,
}) => {
  return (
    <Pressable
      android_ripple={{ borderless: false }}
      className="justify-between items-center border-b-2 border-[#f6f6f6] flex-row"
      onPress={() => onclick({ name, dp, number })}
    >
    {
      dp ?
      <Image
        width={75}
        height={75}
        style={{resizeMode:"center", objectFit:"cover"}}
        className="rounded-full m-3"
        source={{ uri: dp }}
      />
      :
      <Image
        width={75}
        height={75}
        style={{resizeMode:"center", width:75,height:75}}
        className="rounded-full m-3"
        source={require('../../assets/dp-default.jpg')}
      />
    }
      
      <View className="flex-1 flex-col pr-2">
        <View className="flex-row m-1.5 justify-between">
          <Text className="font-bold text-lg">{name}</Text>
          {unreadMessages > 0 ? (
            <GradientText colors={["#5ce27f", "#5cabe2"]}>
              <Text className="text-[#c1c1c1]">{lastMessageDateTime}</Text>
            </GradientText>
          ) : (
            <Text className="text-[#c1c1c1]">{lastMessageDateTime}</Text>
          )}
        </View>
        <View className="flex-row m-1.5 justify-between">
          <Text className="text-[#c1c1c1]">{lastMessage}</Text>
          {sent === false && unreadMessages > 0 && (
            <LinearGradient
              colors={["#5ce27f", "#5cabe2"]}
              style={{}}
              className="bg-green-600 rounded-full w-[22] h-[22] items-center justify-center"
            >
              <Text className="text-slate-50">{unreadMessages}</Text>
            </LinearGradient>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default Chat;
