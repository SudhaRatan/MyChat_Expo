import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Pressable,
  FlatList,
} from "react-native";
import chats from "../DL/chats_dummy";
import Chat from "../Components/Chat";
import { useMainStore } from "../stores/mainStore";

const Chats = ({ navigation }) => {
  const changeheaderName = useMainStore(
    (state) => state.changeheaderName
  );
  const goToChat = ({ name, dp, number }) => {
    changeheaderName(name, dp);
    navigation.navigate("ChatScreen", { number });
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return <Chat {...item} onclick={goToChat} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Chats;
