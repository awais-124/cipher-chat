import {useState, useEffect} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import FLEX from '../styles/flex';
import COLORS from '../styles/colors';
import FONTS from '../styles/typography';
import ASSETS from '../helpers/imports';
import HANDLERS from '../helpers/handlers';

import CustomStatusBar from '../components/CustomStatusBar';
import ScreenWrapper from '../components/ScreenWrapper';
import LabelledInput from '../components/LabelledInput';
import BtnSimple from '../components/BtnSimple';
import DateInput from '../components/DateInput';
import Logo from '../components/Logo';

import {screen_width} from '../utils/Dimensions';

const SignUp = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleEmail = val => setEmail(val);
  const handleName = val => setName(val);
  const handlePass = val => setPass(val);
  const handlePhone = val => setPhone(val);
  const handleDatePicker = () => setOpen(true);

  const onCancelDate = () => setOpen(false);
  const onConfirmDate = date => {
    setDate(date);
    setOpen(false);
  };

  const clearInputs = () => {
    setDate(null);
    setEmail('');
    setName('');
    setPass('');
    setPhone('');
  };

  const goToSignIn = () => {
    clearInputs();
    navigation.navigate('SignIn');
  };

  const handleFormSubmission = () => {
    const {message, isValid} = HANDLERS.handleFormValidity(
      email,
      pass,
      phone,
      name,
      date,
    );
    if (isValid) {
      clearInputs();
      goToSignIn();
    } else {
      Alert.alert('Error', message);
    }
  };

  const {primary: p, secondary: s} = COLORS;

  return (
    <ScreenWrapper>
      <ImageBackground
        source={ASSETS.SignUpBack}
        style={[FLEX.fill, styles.container]}>
        <KeyboardAvoidingView style={[FLEX.fill, styles.container]}>
          <CustomStatusBar />
          <View style={styles.header}>
            <Logo style={{zIndex: 999}} />
          </View>
          <ScrollView style={styles.form}>
            <View style={[FLEX.justifyCentered, styles.formBody]}>
              <Text style={[FONTS.bold.pt24, styles.formH1]}>Sign Up</Text>
              <LabelledInput label="Name" data={name} onChange={handleName} />
              <LabelledInput
                label="Phone Number"
                data={phone}
                onChange={handlePhone}
              />
              <LabelledInput
                label="Email Address"
                data={email}
                onChange={handleEmail}
              />
              <LabelledInput
                label="Password"
                data={pass}
                onChange={handlePass}
              />
              <DateInput
                label="Birthday"
                onClick={handleDatePicker}
                data={date ? date.toDateString() : ''}
                disabled={false}
              />
              <DatePicker
                androidVariant="nativeAndroid"
                modal
                open={open}
                date={date || new Date()}
                mode="date"
                onConfirm={onConfirmDate}
                onCancel={onCancelDate}
                theme="auto"
                textColor={s.black}
              />
              <BtnSimple
                text="Sign Up"
                back={p.orange}
                color={s.white}
                onClick={handleFormSubmission}
              />
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={goToSignIn}>
                  <Text style={[FONTS.semibold.pt16, {color: p.orange}]}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {justifyContent: 'space-evenly', alignItems: 'center'},
  header: {
    flex: 0.4,
    paddingTop: 3,
    width: screen_width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  form: {
    flex: 0.6,
    width: screen_width,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  formBody: {gap: 15, paddingVertical: 50},
  formH1: {color: COLORS.secondary.black, alignSelf: 'flex-start'},
  footer: {flexDirection: 'row', justifyContent: 'space-between', gap: 5},
  footerText: {color: COLORS.secondary.black},
});
