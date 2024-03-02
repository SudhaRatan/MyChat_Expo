import { View, Text, Pressable } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

const AuthScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white p-4" style={{gap:20}}>
      <TextInput
        placeholder="Number"
        className="border-2 border-[#f0f0f0] w-full p-2 px-4 rounded-2xl"
        keyboardType="decimal-pad"
      />
      <TextInput
        placeholder="Password"
        className="border-2 border-[#f0f0f0] w-full p-2 px-4 rounded-2xl"
        secureTextEntry={true}
      />
      <View className="rounded-2xl w-full">
      <Pressable android_ripple={{borderless: true}} className="bg-slate-700 p-2 w-full items-center">
        <Text className="text-white text-lg">Login</Text>
      </Pressable>
      </View>
    </View>
  );
};

export default AuthScreen;
