import { createStackNavigator } from "@react-navigation/stack";
import MainScreenTabs from "./MainScreenTab";
import ChatScreen from "../Screens/ChatScreen";
import { useColorScheme } from "nativewind";
import { View, Text, Pressable, Image } from "react-native";
import socket from "../Sockets/Socket";
import { useEffect } from "react";
import { storage } from "../DL/MMKV_Storage";
import ChatScreenHeader from "../Components/ChatScreenHeader";
import { useMainStore } from "../stores/mainStore";
import AuthScreen from "../Screens/AuthScreen";
import Signup from "../Screens/Signup";

const Stack = createStackNavigator();

const MainRoute = () => {
  const isSignedIn = useMainStore((state) => state.isSignedIn);

  const { colorScheme, toggleColorScheme } = useColorScheme();
  const userNumber = storage.getString("user.number");

  useEffect(() => {
    if(isSignedIn && !socket.connected){
      socket.connect()
    }
    socket.on("connect", function () {
      console.log("Connected to server");
    });
    socket.on("disconnect", function () {
      console.log("Disconnected to server");
    });
    socket.on("new_message", function (data) {
      console.log(`received on ${userNumber} ->`, data);
    });
  }, []);

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={MainScreenTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            options={(props) => ({
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              header: () => <ChatScreenHeader navigation={props.navigation} />,
            })}
            component={ChatScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="AuthScreen"
            component={AuthScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              presentation: "modal",
            }}
            name="Signup"
            component={Signup}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainRoute;
