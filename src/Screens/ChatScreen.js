import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  BackHandler,
  FlatList,
} from "react-native";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";
import GradientText from "../Components/LinearGradientText";
import socket from "../Sockets/Socket";
import { StackActions } from "@react-navigation/native";
import { useMessageStore } from "../stores/messageStore";
import { useMainStore } from "../stores/mainStore";
import { LinearGradient } from "expo-linear-gradient";

const ChatScreen = ({ route, navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { number } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const myNumber = useMainStore((state) => state.number);

  const [chats, setChats] = useState([]);

  const sendMessage = () => {
    const msg = {
      from: myNumber,
      message: newMessage,
      to: number,
    };
    socket.emit("message", msg);
    setNewMessage("");
    setChats((prev) => [
      ...prev,
      { ...msg, type: "sent", id: Math.random() * 10 },
    ]);
  };

  useEffect(() => {
    socket.on("new_message", function (data) {
      console.log(data, myNumber);
      setChats((prev) => [
        ...prev,
        { ...data, type: "received", id: Math.random() * 10 },
      ]);
    });

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      function () {
        StackActions.pop();
        navigation.navigate("Main");
        return true;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-[#121212] justify-between">
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        extraData={chats}
        renderItem={({ item }) => {
          return (
            <View
              className={`w-full ${
                item.type === "sent" ? "justify-end" : "justify-start"
              } flex-row`}
              key={item.id}
            >
              {item.type === "received" ? (
                <View style={{ maxWidth: "80%" }}>
                  <Text
                    className="px-3 py-2 mx-2 my-1 rounded-3xl rounded-br-none"
                    style={{
                      backgroundColor: colorScheme === 'dark'? '#313131' : "#efefef",
                      fontSize: 16,
                    }}
                  >
                    {item.message}
                  </Text>
                </View>
              ) : (
                <View style={{ maxWidth: "80%" }}>
                  <LinearGradient
                    className="px-3 py-2 mx-2 my-1 rounded-3xl rounded-br-[2]"
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["#5ce27f", "#5cabe2"]}
                  >
                    <Text
                      className="text-[#fefefe]"
                      style={{
                        fontSize: 16,
                      }}
                    >
                      {item.message}
                    </Text>
                  </LinearGradient>
                </View>
              )}
            </View>
          );
        }}
      />
      <View className="p-3 flex-row items-end bg-white dark:bg-[#121212]" style={{ gap: 10 }}>
        <TouchableOpacity
          android_ripple={{ borderless: true }}
          className="border-2 rounded-full border-[#f0f0f0] dark:border-[#313131]"
        >
          <GradientText colors={colorScheme === 'light' ? ["#5ce27f", "#5cabe2"] : ["#ffffff","#ffffff"]} style={{ padding: 10 }}>
            <Feather name="camera" size={24} />
          </GradientText>
        </TouchableOpacity>
        <TextInput
          className="flex-1 border-2 dark:text-white border-[#f0f0f0] dark:border-[#313131] rounded-3xl p-2 px-4"
          multiline={true}
          style={{ fontSize: 16, maxHeight: 120 }}
          placeholder="Message..."
          placeholderTextColor={colorScheme === 'dark' && '#ffffff80'}
          value={newMessage}
          onChangeText={(value) => setNewMessage(value)}
        />
        <TouchableOpacity
          android_ripple={{ borderless: true }}
          onPress={sendMessage}
          className="border-2 rounded-full border-[#f0f0f0] dark:border-[#313131]"
        >
          <GradientText colors={colorScheme === 'light' ? ["#5ce27f", "#5cabe2"] : ["#ffffff","#ffffff"]} style={{ padding: 10 }}>
            <Feather name="send" size={24} />
          </GradientText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
