import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view'

const GradientText = ({colors, ...rest}) => {
  return (
    <MaskedView maskElement={<Text {...rest} />}>
      <LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
        <Text {...rest} style={[rest.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText