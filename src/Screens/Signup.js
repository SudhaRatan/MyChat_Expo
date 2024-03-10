import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ToastAndroid,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "../../config";
import axios from "axios";

const Signup = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  const signUp = async () => {
    Keyboard.dismiss();
    setFetching(true);
    axios({
      method: "POST",
      url: `${API_URL}/login/signup`,
      data: { userName, number: "+91" + number, password },
    })
      .then((data) => {
        navigation.goBack();
        ToastAndroid.show("Registered successfully", ToastAndroid.SHORT);
        setError(null);
        setFetching(false);
      })
      .catch((error) => {
        setFetching(false);
        setError(error.response.data);
      });
  };

  return (
    <View
      className="flex-1 justify-center items-center bg-white p-4"
      style={{ gap: 20 }}
    >
      <Text className="text-3xl font-semibold">Signup</Text>
      {error && <Text className="text-red-500">{error}</Text>}
      <TextInput
        placeholder="Username"
        className="border-2 border-[#f0f0f0] w-full p-2 px-4 rounded-2xl"
        value={userName}
        onChangeText={(value) => setUserName(value)}
      />
      <TextInput
        placeholder="Number"
        className="border-2 border-[#f0f0f0] w-full p-2 px-4 rounded-2xl"
        keyboardType="decimal-pad"
        value={number}
        onChangeText={(value) => setNumber(value)}
      />
      <TextInput
        placeholder="Password"
        className="border-2 border-[#f0f0f0] w-full p-2 px-4 rounded-2xl"
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      {!fetching ? (
        <View className="rounded-2xl w-full" style={{ elevation: 4 }}>
          <Pressable
            android_ripple={{ borderless: true }}
            className="bg-slate-500 p-2 w-full items-center"
            onPress={signUp}
          >
            <Text className="text-white text-lg">Signup</Text>
          </Pressable>
        </View>
      ) : (
        <View className="rounded-2xl w-full" style={{ elevation: 4 }}>
          <Pressable
            android_ripple={{ borderless: true }}
            className="bg-slate-500 p-2 w-full items-center"
          >
            <ActivityIndicator size="small" className="p-1" color="#ffffff" />
          </Pressable>
        </View>
      )}
      <Pressable onPress={() => navigation.goBack()}>
        <Text className="text-lg underline text-blue-500">Go to login</Text>
      </Pressable>
    </View>
  );
};

export default Signup;
