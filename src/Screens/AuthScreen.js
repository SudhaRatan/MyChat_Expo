import axios from "axios";
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  Keyboard,
  ToastAndroid,
} from "react-native";
import { API_URL } from "../../config";
import { useMainStore } from "../stores/mainStore";

const AuthScreen = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  const signInLocal = useMainStore((state) => state.signIn);

  const login = () => {
    Keyboard.dismiss();
    setFetching(true);
    axios
      .post(`${API_URL}/login`, { number: "+91" + number, password })
      .then((data) => {
        setFetching(false);
        setError(null);
        if (data) {
          const { token, user } = data.data;
          const { number, userName, _id } = user;
          signInLocal({ token, name: userName, number, _id });
        }
      })
      .catch((error) => {
        setFetching(false);
        if (error.response?.status) {
          setError(error.response.data);
        } else {
          ToastAndroid.show("Unable to connect to server", ToastAndroid.SHORT);
        }
      });
  };

  return (
    <View
      className="flex-1 justify-center items-center bg-white p-4"
      style={{ gap: 20 }}
    >
      <Text className="text-3xl font-semibold">Login</Text>
      {error && <Text className="text-red-500">{error}</Text>}
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
            onPress={login}
          >
            <Text className="text-white text-lg">Login</Text>
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
      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text className="text-lg underline text-blue-500">Go to signup</Text>
      </Pressable>
    </View>
  );
};

export default AuthScreen;
