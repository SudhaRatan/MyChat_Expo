import React, { useState, useEffect, useRef } from "react";
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
import { useMainStore } from "../stores/mainStore";
import { LinearGradient } from "expo-linear-gradient";
import { useMessageStore } from "../stores/messageStore";
import { Entypo } from "@expo/vector-icons";

const ChatScreen = ({ route, navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { number } = route.params;
  const [newMessage, setNewMessage] = useState("");
  const myNumber = useMainStore((state) => state.number);
  const setCurrentScreen = useMessageStore((state) => state.setCurrentScreen);

  const [chats, setChats] = useState([]);
  const [viewHeight, setViewHeight] = useState(0);

  const [scrollIndicator, setScrollIndicator] = useState(false);
  const [newMsg, setNewMsg] = useState(false);

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
    FlatListRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    socket.on("new_message", function (data) {
      console.log(data, myNumber);
      setChats((prev) => [
        ...prev,
        { ...data, type: "received", id: Math.random() * 10 },
      ]);
      setNewMsg(true);
    });

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      function () {
        setCurrentScreen("");
        StackActions.pop();
        navigation.navigate("Main");
        return true;
      }
    );

    bottomRef.current.measure((x, y, width, height, pageX, pageY) => {
      setViewHeight(height);
    });

    return () => {
      socket.off("new_message");
      backHandler.remove();
    };
  }, []);

  const FlatListRef = useRef(null);
  const bottomRef = useRef(null);
  const [shouldScrollToEnd, setShouldScrollToEnd] = useState(true);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const viewHeight = event.nativeEvent.layoutMeasurement.height;
    // console.log(offsetY, contentHeight, viewHeight);

    // Calculate the scroll position
    const isNearEnd =
      Math.floor(contentHeight - offsetY) === Math.floor(viewHeight);

    // If the user is near the end, enable scrolling to the end
    if (isNearEnd) {
      setShouldScrollToEnd(true);
      setScrollIndicator(false);
    } else {
      setShouldScrollToEnd(false);
      setScrollIndicator(true);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212] justify-between">
      <FlatList
        className="flex-1"
        ref={FlatListRef}
        onScroll={handleScroll}
        data={chats}
        keyExtractor={(item) => item.id}
        extraData={chats}
        onContentSizeChange={() => {
          if (chats[chats.length - 1]?.type === "received") {
            if (shouldScrollToEnd) {
              FlatListRef.current.scrollToEnd({ animated: true });
              setNewMsg(false);
            }
          } else {
            FlatListRef.current.scrollToEnd({ animated: true });
            setNewMsg(false);
          }
        }}
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
                    className="px-3 py-2 mx-2 my-1 rounded-2xl rounded-bl-none dark:text-[#EFEFEF] bg-[#EFEFEF] dark:bg-[#313131]"
                    style={{
                      fontSize: 16,
                    }}
                  >
                    {item.message}
                  </Text>
                </View>
              ) : (
                <View style={{ maxWidth: "80%" }}>
                  <LinearGradient
                    className="px-3 py-2 mx-2 my-1 rounded-2xl rounded-br-[2]"
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
      {scrollIndicator && (
        <TouchableOpacity
          className={`rounded-full bg-white dark:bg-[#313131] absolute right-0 p-1 m-4 `}
          onPress={() => {
            setNewMsg(false);
            FlatListRef.current.scrollToEnd({ animated: true });
          }}
          style={{ elevation: 2, bottom: viewHeight, gap: 10 }}
        >
          {newMsg && (
            <View className="justify-center items-center">
              <Text className="dark:text-white">1</Text>
            </View>
          )}
          <Entypo
            name="chevron-down"
            size={20}
            color={colorScheme === "light" ? "black" : "#efefef"}
          />
        </TouchableOpacity>
      )}

      <View
        ref={bottomRef}
        className="p-3 flex-row items-end bg-white dark:bg-[#121212]"
        style={{ gap: 10 }}
      >
        <TouchableOpacity
          android_ripple={{ borderless: true }}
          className="border-2 rounded-full border-[#f0f0f0] dark:border-[#313131]"
        >
          <GradientText
            colors={
              colorScheme === "light"
                ? ["#5ce27f", "#5cabe2"]
                : ["#ffffff", "#ffffff"]
            }
            style={{ padding: 10 }}
          >
            <Feather name="camera" size={24} />
          </GradientText>
        </TouchableOpacity>
        <TextInput
          className="flex-1 border-2 dark:text-white border-[#f0f0f0] dark:border-[#313131] rounded-3xl p-2 px-4"
          multiline={true}
          style={{ fontSize: 16, maxHeight: 120 }}
          placeholder="Message..."
          placeholderTextColor={colorScheme === "dark" && "#ffffff80"}
          value={newMessage}
          onChangeText={(value) => setNewMessage(value)}
        />
        <TouchableOpacity
          android_ripple={{ borderless: true }}
          onPress={sendMessage}
          className="border-2 rounded-full border-[#f0f0f0] dark:border-[#313131]"
        >
          <GradientText
            colors={
              colorScheme === "light"
                ? ["#5ce27f", "#5cabe2"]
                : ["#ffffff", "#ffffff"]
            }
            style={{ padding: 10 }}
          >
            <Feather name="send" size={24} />
          </GradientText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
