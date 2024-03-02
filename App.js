import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import MainRoute from "./src/Routes/MainRoute";
import { useColorScheme } from "nativewind";

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <MainRoute />
    </NavigationContainer>
  );
}
