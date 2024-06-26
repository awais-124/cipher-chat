import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import FONTS from '../styles/typography';
import FLEX from '../styles/flex';

import {screen_width} from '../utils/Dimensions';

const BtnSimple = ({
  back,
  color,
  onClick,
  text,
  isDisabled = false,
  style = {width: screen_width * 0.87},
}) => {
  return (
    <TouchableOpacity onPress={onClick} disabled={isDisabled}>
      <View
        style={[FLEX.centered, style, {backgroundColor: back, ...styles.body}]}>
        <Text style={[FONTS.semibold.pt16, {color: color, ...styles.text}]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BtnSimple;

const styles = StyleSheet.create({
  body: {
    height: 60,
    marginHorizontal: 'auto',
    borderRadius: 15,
  },
  text: {textAlign: 'center', textTransform: 'uppercase'},
});
