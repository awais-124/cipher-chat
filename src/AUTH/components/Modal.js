import {Image, StyleSheet, Text, View} from 'react-native';

import ASSETS from '../helpers/imports';
import COLORS from '../styles/colors';
import FLEX from '../styles/flex';
import FONTS from '../styles/typography';

import BtnSmall from './BtnSmall';

import {screen_height, screen_width} from '../utils/Dimensions';

const Modal = ({style, onPress, message, title = 'OK', color = '#000'}) => {
  return (
    <View style={[FLEX.justifyCenteredFill, styles.container, style]}>
      <Image source={ASSETS.Check} style={styles.icon} />
      <Text style={[FONTS.regular.pt14, styles.text]}>{message}</Text>
      <BtnSmall
        text={title}
        back={COLORS.primary.orange}
        color={color}
        onClick={onPress}
      />
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    elevation: 50,
    zIndex: 999,
    padding: 20,
    height: screen_height * 0.38,
    width: screen_width * 0.75,
    backgroundColor: COLORS.secondary.white,
    borderRadius: 20,
    gap: 20,
  },
  icon: {
    height: '35%',
    aspectRatio: 1,
  },
  text: {
    textAlign: 'center',
    color: COLORS.secondary.black,
    lineHeight: 20,
  },
});
