import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calls from "../Screens/Calls";
import Chats from "../Screens/Chats";
import SettingsScreen from "../Screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import GradientText from "../Components/LinearGradientText";

const Tab = createBottomTabNavigator();

const MainScreenTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontSize: 24,
        },
        tabBarStyle: {
          elevation: 10,
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 2,
          borderColor: "#f6f6f6",
        },
      }}
      backBehavior="none"
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Calls"
        component={Calls}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <GradientText colors={["#5ce27f", "#5cabe2"]} style={{}}>
                <Ionicons name="call-outline" size={24} color="black" />
              </GradientText>
            ) : (
              <Ionicons name="call-outline" size={24} color="#b1b1b1" />
            ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={({ route }) => ({
          headerTitleStyle: {
            fontWeight: "700",
          },
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <GradientText colors={["#5ce27f", "#5cabe2"]} style={{}}>
                <Ionicons name="chatbubble-outline" size={24} color="black" />
              </GradientText>
            ) : (
              <Ionicons name="chatbubble-outline" size={24} color="#b1b1b1" />
            ),
          headerRight: () => (
            <GradientText
              colors={["#5ce27f", "#5cabe2"]}
              style={{
                paddingHorizontal: 16,
              }}
            >
              <FontAwesome5 name="user-plus" size={20} color="#5cabe2" />
            </GradientText>
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <GradientText colors={["#5ce27f", "#5cabe2"]} style={{}}>
                <Ionicons name="settings-outline" size={24} color="black" />
              </GradientText>
            ) : (
              <View>
                <Ionicons name="settings-outline" size={24} color="#b1b1b1" />
              </View>
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
    <View className="flex-row bg-white justify-center border-t-2 border-[#f6f6f6]">
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
