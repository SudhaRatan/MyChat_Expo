import React, { useEffect, useState } from "react";
import { View, Text, Button, Switch, Appearance } from "react-native";
import { useContactStore } from "../stores/contactStore";
import { useChatStore } from "../stores/chatsStore";
import { useColorScheme } from "nativewind";
import { useMainStore } from "../stores/mainStore";
import { useThemeStore } from "../stores/themeStore";

const SettingsScreen = () => {
  const setContacts = useContactStore((state) => state.setContacts);
  const clearChats = useChatStore((state) => state.clearChats);

  const { setColorScheme } = useColorScheme();

  const setTheme = useThemeStore((state) => state.setTheme);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {}, []);

  return (
    <View
      className="flex-1 justify-center items-center p-5 bg-white dark:bg-[#121212]"
      style={{ gap: 10 }}
    >
      <View className="flex-row" style={{ gap: 10 }}>
        <View className="flex-1">
          <Button onPress={() => setContacts([])} title="Clear contacts" />
        </View>
        <View className="flex-1">
          <Button onPress={clearChats} title="Clear chats" />
        </View>
      </View>
      <View className="flex-row items-center" style={{ gap: 10 }}>
        <Text className="dark:text-white">Light mode</Text>
        <Switch
          onValueChange={(val) => {
            if (val) {
              setTheme("dark");
              setColorScheme("dark");
            } else {
              setTheme("light");
              setColorScheme("light");
            }
          }}
          value={theme === 'dark' ? true : false}
        />
        <Text className="dark:text-white">Dark mode</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
