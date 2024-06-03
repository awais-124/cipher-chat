import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import FONTFAMILY from '../../AUTH/styles/fonts';
import COLORS from '../../AUTH/styles/colors';

const Update = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  return (
    <View style={styles.container}>
      <Text style={styles.data}>{data.name}</Text>
      <Text style={styles.data}>{data.email}</Text>
      <Text style={styles.data}>{data.phone}</Text>
      <Text style={styles.data}>{data.dob}</Text>
      <Text style={styles.error}>
        Cannot update yet. Screen under development
      </Text>
      <Button
        color={COLORS.secondary.red}
        title="Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: COLORS.primary.blue,
  },
  data: {
    ...FONTFAMILY.MONTSERRAT.md.pt16,
    textTransform: 'uppercase',
    color: COLORS.secondary.white,
  },
  error: {
    ...FONTFAMILY.MONTSERRAT.md.pt16,
    color: COLORS.secondary.red,
    textAlign: 'center',
  },
});
