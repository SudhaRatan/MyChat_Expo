import {
  View,
  Text,
  Pressable,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useContactStore } from "../stores/contactStore";
import { MaterialIcons } from "@expo/vector-icons";

const ContactScreenHeader = ({ navigation }) => {
  const contacts = useContactStore((state) => state.contacts);
  const fetchingUsers = useContactStore((state) => state.fetchingUsers);
  const searchInput = useContactStore((state) => state.searchInput);
  const setSearchInput = useContactStore((state) => state.setSearchInput);

  const [searchToggle, setSearchToggle] = useState(false);

  return (
    <View
      className="bg-white flex-row justify-between items-center pl-4 pr-4 pb-2 border-b-2 border-[#f6f6f6]"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      {!searchToggle ? (
        <View
          className="flex-row justify-between items-center flex-1"
          style={{ gap: 20 }}
        >
          <View className="flex-row items-center" style={{ gap: 20 }}>
            <Pressable
              android_ripple={{ borderless: true }}
              onPress={() => navigation.goBack()}
              className="p-1"
            >
              <Ionicons name="arrow-back-outline" size={26} color={"#000"} />
            </Pressable>
            <View>
              <Text style={{ fontSize: 17 }}>Select contact</Text>
              <Text>{contacts.length} contacts</Text>
            </View>
          </View>
          <View className="flex-row items-center" style={{ gap: 10 }}>
            {fetchingUsers && (
              <Pressable android_ripple={{ borderless: true }}>
                <ActivityIndicator size="small" />
              </Pressable>
            )}
            <Pressable
              onPress={() => setSearchToggle(!searchToggle)}
              android_ripple={{ borderless: true }}
              className="p-1"
            >
              <MaterialIcons name="search" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      ) : (
        <View
          className="flex-row bg-[#f0f0f0] flex-1 p-2 rounded-full"
          style={{ gap: 10 }}
        >
          <Pressable
            android_ripple={{ borderless: true }}
            onPress={() => {
              setSearchInput("")
              setSearchToggle(!searchToggle);
            }}
          >
            <Ionicons name="arrow-back-outline" size={26} color={"#000"} />
          </Pressable>
          <TextInput
            autoFocus={true}
            multiline={false}
            value={searchInput}
            onChangeText={(val) => setSearchInput(val)}
            className="flex-1 pr-2"
            style={{ fontSize: 16 }}
            placeholder="Search name or number..."
          />
        </View>
      )}
    </View>
  );
};

export default ContactScreenHeader;
