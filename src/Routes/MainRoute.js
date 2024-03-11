import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreenTabs from "./MainScreenTab";
import ChatScreen from "../Screens/ChatScreen";
import { useColorScheme } from "nativewind";
import socket from "../Sockets/Socket";
import { useEffect } from "react";
import ChatScreenHeader from "../Components/ChatScreenHeader";
import { useMainStore } from "../stores/mainStore";
import AuthScreen from "../Screens/AuthScreen";
import Signup from "../Screens/Signup";
import AddContactsScreen from "../Screens/AddContactsScreen";
import ContactScreenHeader from "../Components/ContactScreenHeader";
import { useThemeStore } from "../stores/themeStore";
import { View } from "react-native";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

const MainRoute = () => {
  const isSignedIn = useMainStore((state) => state.isSignedIn);

  const { setColorScheme } = useColorScheme();
  const number = useMainStore((state) => state.number);

  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    setColorScheme(theme);

    if (isSignedIn && !socket.connected) {
      socket.connect();
    }
    socket.on("connect", function () {
      console.log("Connected to server");
      socket.emit("join", { number });
    });
    socket.on("disconnect", function () {
      console.log("Disconnected to server");
    });

    
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        animation: "ios",
      }}
    >
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
              header: () => <ChatScreenHeader navigation={props.navigation} />,
            })}
            component={ChatScreen}
          />
          <Stack.Screen
            name="AddContacts"
            options={(props) => ({
              headerTitle: "Add Contacts",
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: "#f0f0f0",
              },
              header: () => (
                <ContactScreenHeader navigation={props.navigation} />
              ),
            })}
            component={AddContactsScreen}
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
