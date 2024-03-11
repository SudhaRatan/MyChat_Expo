import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import MainRoute from "./src/Routes/MainRoute";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export default function App() {
  const { colorScheme } = useColorScheme();

  return (
      <NavigationContainer theme={{colors:{background: colorScheme === 'dark' ? '#121212' : '#ffffff'}}}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <MainRoute />
      </NavigationContainer>
  );
}
