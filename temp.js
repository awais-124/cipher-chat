import {ImageBackground, StyleSheet, Text, View} from 'react-native';

import {useEffect} from 'react';

import ASSETS from '../helpers/imports';
import FLEX from '../styles/flex';
import COLORS from '../styles/colors';
import CONSTANTS from '../helpers/CONSTANTS';

import {screen_height} from '../utils/Dimensions';

const Splash = ({navigation}) => {
  // const navigateToHome = () => navigation.replace('SignIn');

  // useEffect(() => {
  //   const timeoutId = setTimeout(navigateToHome, CONSTANTS.SPLASH_TIMEOUT);
  //   return () => clearTimeout(timeoutId);
  // }, []);
  return (
    <ImageBackground source={ASSETS.SplashBack} style={FLEX.centeredFill}>
      <View>
        <Text>Splash</Text>
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  baseText: {
    textAlignVertical: 'bottom',
    color: COLORS.secondary.white,
    marginBottom: screen_height * 0.05,
  },
});
