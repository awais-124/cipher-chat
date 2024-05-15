import {useEffect} from 'react';

import {StyleSheet, Text, ImageBackground} from 'react-native';

import CustomStatusBar from '../components/CustomStatusBar';
import Logo from '../components/Logo';

import CONSTANTS from '../helpers/CONSTANTS';
import ASSETS from '../helpers/imports';
import COLORS from '../styles/colors';
import FONTS from '../styles/typography';
import FLEX from '../styles/flex';

import {screen_height} from '../utils/Dimensions';

const Splash = ({navigation}) => {
  const navigateToHome = () => navigation.navigate('SignIn');

  useEffect(() => {
    const timeoutId = setTimeout(navigateToHome, CONSTANTS.SPLASH_TIMEOUT);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ImageBackground source={ASSETS.SplashBack} style={[FLEX.centeredFill]}>
      <CustomStatusBar />
      <Logo style={FLEX.centeredFill} />
      <Text style={[FONTS.semibold.pt14, styles.baseText]}>
        Your best choice for chatting
      </Text>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Comfortaa',
    textAlignVertical: 'bottom',
    color: COLORS.secondary.white,
    marginBottom: screen_height * 0.05,
  },
});
