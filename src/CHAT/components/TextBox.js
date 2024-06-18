import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

const TextBox = ({text, heading}) => {
  return (
    <View style={styles.messageBox}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  messageBox: {
    backgroundColor: COLORS.secondary.greySix,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.secondary.greyFour,
  },
  heading: {
    ...FONTFAMILY.MONTSERRAT.sb.pt18,
    color: COLORS.secondary.black,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  messageText: {
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
  },
});
