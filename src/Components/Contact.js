import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import GradientText from "./LinearGradientText";

const Contact = ({ pnId, name, image, number, ne, onPress }) => {
  return (
    <Pressable
      className="flex-row border-b border-t border-[#f0f0f0] dark:border-[#313131] w-full justify-between items-center p-3"
      style={{ gap: 12 }}
      android_ripple={{ borderless: false }}
      onPress={() => {
        onPress({ id: pnId, name, dp: image ? image.uri : null, number });
      }}
    >
      <View className="flex-row items-center" style={{ gap: 12 }}>
        {image ? (
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 500,
              resizeMode: "contain",
              objectFit: "contain",
            }}
            source={{ uri: image.uri }}
          />
        ) : (
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 500,
              resizeMode: "contain",
              objectFit: "contain",
            }}
            source={require("../../assets/dp-default.jpg")}
          />
        )}
        <View>
          <Text className="flex dark:text-[#fcfcfc]" style={{ fontSize: 17, fontWeight: 500 }}>
            {name}
          </Text>
          <Text className="text-[#c1c1c1]">{number}</Text>
        </View>
      </View>
      {ne && (
        <TouchableOpacity
          onPress={() =>
            ToastAndroid.show("Upcoming feature", ToastAndroid.SHORT)
          }
        >
          <GradientText colors={["#5ce27f", "#5cabe2"]} style={{}}>
            <Text className="font-semibold" style={{ fontSize: 16 }}>
              Invite
            </Text>
          </GradientText>
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default Contact;
