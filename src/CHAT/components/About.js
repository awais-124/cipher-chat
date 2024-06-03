import {StyleSheet, Text, View} from 'react-native';

import {screen_height, screen_width} from '../../AUTH/utils/Dimensions';

import COLORS from '../../AUTH/styles/colors';
import FONTFAMILY from '../../AUTH/styles/fonts';

const About = ({data}) => {
  console.log(data);
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.email}>{`Email: ${data.email}`}</Text>
      <Text style={styles.dob}>{`Date of Birth: ${data.dob}`}</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: screen_width * 0.85,
    height: 120,
    elevation: 5,
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: COLORS.secondary.white,
  },
  name: {
    ...FONTFAMILY.MONTSERRAT.b.pt18,
    color: COLORS.secondary.black,
    textTransform: 'capitalize',
  },
  email: {
    ...FONTFAMILY.MONTSERRAT.md.pt14,
    color: COLORS.secondary.black,
  },
  dob: {
    ...FONTFAMILY.MONTSERRAT.md.pt14,
    color: COLORS.secondary.black,
  },
});
