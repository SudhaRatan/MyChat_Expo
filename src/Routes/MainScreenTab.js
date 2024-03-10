import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calls from "../Screens/Calls";
import Chats from "../Screens/Chats";
import SettingsScreen from "../Screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import GradientText from "../Components/LinearGradientText";
import { MaterialIcons } from "@expo/vector-icons";
import { useMainStore } from "../stores/mainStore";
import ChatScreenHeaderRight from "../Components/ChatScreenHeaderRight";
import { useChatStore } from "../stores/chatsStore";
import { useContactStore } from "../stores/contactStore";
import { useShallow } from "zustand/react/shallow";
import { useColorScheme } from "nativewind";

const Tab = createBottomTabNavigator();

const MainScreenTabs = () => {
  const signOut = useMainStore((state) => state.signOut);
  const setChats = useChatStore((state) => state.setChats);
  const { colorScheme } = useColorScheme();
  const { setContacts, setTempContacts, setPermissionGranted } =
    useContactStore(
      useShallow((state) => ({
        setContacts: state.setContacts,
        setTempContacts: state.setTempContacts,
        setPermissionGranted: state.setPermissionGranted,
      }))
    );

  const signout = () => {
    setChats([]);
    setContacts([]);
    setTempContacts([]);
    setPermissionGranted(false);
    signOut();
  };

  return (
    <Tab.Navigator
      initialRouteName="Chats"
      sceneContainerStyle={{
        backgroundColor:'#fff000'
      }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 10,
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderColor: colorScheme==='dark'? '#313131' : "#f6f6f6",
          backgroundColor: colorScheme === "dark" ? "#121212" : "#fff",
        },
        headerTitleStyle: {
          color: colorScheme === "light" ? "#121212" : "#fff",
          fontSize: 24,
          fontWeight:700
        },
      }}
      backBehavior="none"
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Calls" component={Calls} options={{}} />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={(props) => ({
          headerRight: () => (
            <ChatScreenHeaderRight navigation={props.navigation} />
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity className="px-4" onPress={signout}>
              <MaterialIcons
                name="logout"
                size={24}
                color={colorScheme === "light" ? "#121212" : "#fff"}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreenTabs;

function MyTabBar({ state, descriptors, navigation }) {
  const icons = {
    Calls: <Ionicons name="call-outline" size={24} color="#b1b1b1" />,
    Chats: <Ionicons name="chatbubble-outline" size={24} color="#b1b1b1" />,
    Settings: <Ionicons name="settings-outline" size={24} color="#b1b1b1" />,
  };

  return (
    <View className="flex-row bg-white dark:bg-[#121212] justify-center border-t border-[#f6f6f6] dark:border-[#313131]">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            android_ripple={{ borderless: false }}
            style={{
              flex: 1,
              alignItems: "center",
              padding: 22,
            }}
          >
            {isFocused ? (
              <GradientText colors={["#5ce27f", "#5cabe2"]} style={{}}>
                {icons[route.name]}
              </GradientText>
            ) : (
              icons[route.name]
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
