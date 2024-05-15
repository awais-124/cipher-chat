import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';

import Logo from '../components/Logo';
import BtnSimple from '../components/BtnSimple';
import ScreenWrapper from '../components/ScreenWrapper';
import LabelledInput from '../components/LabelledInput';
import CustomStatusBar from '../components/CustomStatusBar';

import FLEX from '../styles/flex';
import COLORS from '../styles/colors';
import ASSETS from '../helpers/imports';
import FONTFAMILY from '../styles/fonts';
import FONTS from '../styles/typography';
import CONSTANTS from '../helpers/CONSTANTS';

import {screen_height, screen_width} from '../utils/Dimensions';

const {COMFORTAA: com, MONTSERRAT: mon, POPPINS: pop} = FONTFAMILY;
const {primary: p, secondary: s} = COLORS;

const Home = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const {navigate} = navigation;

  const handlePass = pass => setPassword(pass);
  const handleEmail = email => setEmail(email);

  const navigateForward = name => {
    setPassword('');
    setEmail('');
    navigate(name);
  };

  useEffect(
    () =>
      setIsFormValid(CONSTANTS.emailRegex.test(email) && password.length > 5),
    [email, password],
  );

  const submitForm = () => {
    const isEmpty = email.length === 0 || password.length === 0;
    let message = !isEmpty
      ? 'Either email not valid or Password is less than 6 characters'
      : 'Email or Password cannot be empty';

    if (isFormValid) navigateForward('OTP');
    else Alert.alert('Error', message);
  };

  return (
    <ScreenWrapper>
      <ImageBackground source={ASSETS.SignInBack} style={[FLEX.fill]}>
        <KeyboardAvoidingView style={[FLEX.centeredFill, styles.container]}>
          <CustomStatusBar />
          <Logo style={styles.logo} />
          <View style={[FLEX.col, FLEX.justifyCentered, styles.form]}>
            <Text style={styles.formHeading}>Sign In</Text>
            <LabelledInput
              label="Email/Phone Number"
              labelColor={s.greyThree}
              data={email}
              onChange={handleEmail}
            />
            <LabelledInput
              label="Password"
              labelColor={s.greyThree}
              data={password}
              onChange={handlePass}
            />
            <BtnSimple
              text="Sign In"
              back={p.orange}
              color={s.white}
              onClick={submitForm}
              style={styles.btn}
            />
            <TouchableOpacity onPress={() => navigateForward('ForgotPass')}>
              <Text
                style={[
                  {fontFamily: 'Montserrat-Medium', color: p.orange},
                  FONTS.semibold.pt14,
                ]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View style={[FLEX.row, {gap: 3}]}>
              <Text style={[styles.footerText, FONTS.regular.pt14]}>
                Don't have an account yet?
              </Text>
              <TouchableOpacity onPress={() => navigateForward('SignUp')}>
                <Text
                  style={[
                    {color: p.orange, fontFamily: 'Montserrat-Medium'},
                    FONTS.semibold.pt14,
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  h1: {
    marginVertical: 40,
    fontSize: 30,
    color: s.white,
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    top: screen_height * 0.038,
    left: screen_width * 0.32,
  },
  form: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: s.white,
    width: screen_width,
    height: screen_height * 0.6,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 40,
    paddingTop: 20,
  },
  /* Montserrat-ExtraBold */
  btn: {width: screen_width * 0.872},
  formHeading: {
    // ...FONTS.bold.pt24,
    fontFamily: 'Montserrat-Bold',
    fontSize: 26,
    alignSelf: 'flex-start',
    marginTop: 15,
    marginLeft: 25,
    color: s.black,
  },
  footerText: {color: COLORS.secondary.black, ...mon.reg.pt14},
});
