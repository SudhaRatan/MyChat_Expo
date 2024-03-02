import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import socket from "../Sockets/Socket";
import { storage } from "../DL/MMKV_Storage";

const SettingsScreen = () => {
  const [number, setNumber] = useState("");
  const [borderColor, setBorderColor] = useState("#f0f0f0");

  const handleNumberInputChange = (text) => {
    setNumber(text);
    if (text.length > 0) {
      setBorderColor("#f0f0f0");
    }
  };

  const joinRoomHandler = () => {
    socket.disconnect();
    if (number == "") {
      setBorderColor("red");
    } else {
      setBorderColor("#f0f0f0");
      socket.connect();
      socket.emit("join", { number });
      storage.set("user.number", number);
      
    }
  };

  useEffect(() => {}, []);

  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <TextInput
        keyboardType="number-pad"
        placeholder="Enter number"
        value={number}
        onChangeText={handleNumberInputChange}
        maxLength={10}
        className={`w-full border-2 p-3 rounded-2xl mb-4`}
        style={{
          borderColor: borderColor,
        }}
      />
      <Button title="Join room" onPress={joinRoomHandler} />
    </View>
  );
};

export default SettingsScreen;
