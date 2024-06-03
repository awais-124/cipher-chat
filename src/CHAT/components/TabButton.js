import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

const TabButton = ({label, icon, onClick, state}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.box}>
        <Image source={icon} style={state ? styles.white : styles.orange} />
        <Text
          style={[
            styles.title,
            {color: state ? COLORS.secondary.white : COLORS.secondary.black},
          ]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    gap: 5,
  },
  white: {
    tintColor: COLORS.secondary.white,
  },
  orange: {
    tintColor: COLORS.secondary.black,
  },
  title: {
    color: COLORS.secondary.white,
    ...FONTFAMILY.MONTSERRAT.reg.pt12,
    textTransform: 'uppercase',
  },
});
