import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import ICONS from '../../AUTH/helpers/icons';
import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

const StyledInput = ({message, setter, handler}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setter}
        placeholder="Type your message here"
        multiline
      />
      <TouchableOpacity onPress={handler}>
        <Image source={ICONS.SEND} />
      </TouchableOpacity>
    </View>
  );
};

export default StyledInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary.greySix,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.secondary.greyFour,
  },
  input: {
    flex: 1,
    ...FONTFAMILY.MONTSERRAT.reg.pt16,
    color: COLORS.secondary.black,
  },
});
