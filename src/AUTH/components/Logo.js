import {Image, StyleSheet, Text, View} from 'react-native';

import {screen_height, screen_width} from '../utils/Dimensions';

import COLORS from '../styles/colors';
import FONTS from '../styles/typography';
import ASSETS from '../helpers/imports';

const Logo = ({style}) => {
  return (
    <View style={[styles.logoBox, style]}>
      <Image source={ASSETS.WhiteLogo} style={styles.logo} />
      <Text style={[styles.logoText, FONTS.bold.pt24]}>B-Wallet</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoBox: {
    width: screen_width * 0.352,
    height: screen_height * 0.18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
    width: screen_width * 0.18,
    height: screen_height * 0.18,
    aspectRatio: 1,
  },
  logoText: {
    color: COLORS.secondary.white,
    ...FONTS.semibold.pt32,
  },
});
