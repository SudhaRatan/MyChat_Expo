import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";
import GradientText from "../Components/LinearGradientText";
import socket from "../Sockets/Socket";
import { storage } from "../DL/MMKV_Storage";

const ChatScreen = ({ route }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { number } = route.params;
  const [newMessage,setNewMessage] = useState("")

  const sendMessage = () => {
    const fromNumber = storage.getString("user.number");
    socket.emit("message", { from: fromNumber, message: newMessage, to: number});
  };


  return (
    <View className="flex-1 bg-white justify-between">
      <View className="flex-1">
        <Text>Chats{number}</Text>
      </View>
      <View className="p-3 flex-row items-end" style={{ gap: 10 }}>
        <TouchableOpacity
          android_ripple={{ borderless: true }}
          className="border-2 rounded-full border-[#f0f0f0]"
        >
          <GradientText colors={["#5ce27f", "#5cabe2"]} style={{ padding: 10 }}>
            <Feather name="camera" size={24} />
          </GradientText>
        </TouchableOpacity>
        <TextInput
          className="flex-1 border-2 border-[#f0f0f0] rounded-3xl p-2 px-4"
          multiline={true}
          style={{ fontSize: 16, maxHeight: 100 }}
          placeholder="Message..."
          value={newMessage}
          onChangeText={(value) => setNewMessage(value)}
        />
        <TouchableOpacity
          android_ripple={{ borderless: true }}
          onPress={sendMessage}
          className="border-2 rounded-full border-[#f0f0f0]"
        >
          <GradientText colors={["#5ce27f", "#5cabe2"]} style={{ padding: 10 }}>
            <Feather name="send" size={24} />
          </GradientText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
