import React from "react";
import { View, FlatList, Text } from "react-native";
// import chats from "../DL/chats_dummy";
import Chat from "../Components/Chat";
import { useMainStore } from "../stores/mainStore";
import { useChatStore } from "../stores/chatsStore";
import { useMessageStore } from "../stores/messageStore";

const Chats = ({ navigation }) => {
  const changeheaderName = useMainStore((state) => state.changeheaderName);

  const setCurrentScreen = useMessageStore((state) => state.setCurrentScreen)

  const goToChat = ({ name, dp, number }) => {
    changeheaderName(name, dp);
    setCurrentScreen("ChatScreen")
    navigation.navigate("ChatScreen", { number });
  };

  const chats = useChatStore((state) => state.chats);

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      {chats.length > 0 ? (
        <FlatList
          data={chats}
          renderItem={({ item }) => {
            return <Chat {...item} onclick={goToChat} />;
          }}
          keyExtractor={(item) => item.number}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="dark:text-white">Click on the above add button to start a conversation</Text>
        </View>
      )}
    </View>
  );
};

export default Chats;
