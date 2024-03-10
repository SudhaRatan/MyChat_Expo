import React from "react";
import {
  View,
  FlatList,
  Text,
} from "react-native";
import chats from "../DL/chats_dummy";
import Chat from "../Components/Chat";
import { useMainStore } from "../stores/mainStore";
import { useChatStore } from "../stores/chatsStore";

const Chats = ({ navigation }) => {
  const changeheaderName = useMainStore(
    (state) => state.changeheaderName
  );
  const goToChat = ({ name, dp, number }) => {
    changeheaderName(name, dp);
    navigation.navigate("ChatScreen", { number });
  };

  // const chats = useChatStore((state) => state.chats)

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
    {
      chats.length > 0 ?
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return <Chat {...item} onclick={goToChat} />;
        }}
        // keyExtractor={(item) => item.id}
      />
      :
      <View className="flex-1 justify-center items-center">
        <Text>Click on the above add button to start a conversation</Text>
      </View>
    }
    </View>
  );
};

export default Chats;
