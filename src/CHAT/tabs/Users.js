import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import StorageService from '../../AUTH/utils/StorageHelper';

import ScreenWrapper from '../../AUTH/components/ScreenWrapper';
import CONSTANTS from '../../AUTH/helpers/CONSTANTS';
import FONTFAMILY from '../../AUTH/styles/fonts';
import COLORS from '../../AUTH/styles/colors';
import ICONS from '../../AUTH/helpers/icons';

import {screen_height, screen_width} from '../../AUTH/utils/Dimensions';
import Loader from '../../AUTH/components/Loader';

let id = '';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const goToMessage = item => {
    const userData = {
      email: item.email,
      name: item.name,
      phone: item.phone,
      password: item.password,
      userId: item.userId,
      privateKey: item.privateKey,
      publicKey: item.publicKey,
    };
    navigation.navigate('Message', {receiver: userData, id});
  };

  useEffect(() => {
    setVisible(true);
    const getUsers = async () => {
      try {
        id = await StorageService.getItem('USERID');
        const myEmail = await StorageService.getItem('EMAIL');
        const querySnapshot = await firestore()
          .collection('users')
          .where('email', '!=', myEmail)
          .get();
        let allUsers = querySnapshot.docs;
        const parsedResult = allUsers.map(docSnapshot => docSnapshot._data);
        if (querySnapshot.docs.length !== 0) setUsers(parsedResult);
        setVisible(false);
      } catch (error) {
        console.log('GET USERS: ', error);
        setVisible(false);
        Alert.alert('Error', 'Failed to fetch list of users!');
      }
    };
    getUsers();
  }, []);

  const Contacts = ({item, index}) => (
    <TouchableOpacity onPress={() => goToMessage(item)}>
      <View style={styles.item} key={index}>
        <Image source={ICONS.AVATAR} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <Loader shown={visible} color={COLORS.secondary.white} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>CONTACTS</Text>
        </View>
        <FlatList data={users} renderItem={Contacts} />
      </View>
    </ScreenWrapper>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary.white,
    alignItems: 'center',
  },
  header: {
    width: screen_width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.blue,
  },
  title: {
    color: COLORS.secondary.white,
    ...FONTFAMILY.MONTSERRAT.reg.pt20,
  },
  item: {
    width: screen_width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.secondary.greyThree,
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  name: {
    ...FONTFAMILY.MONTSERRAT.md.pt18,
    textTransform: 'capitalize',
  },

  avatar: {
    tintColor: COLORS.primary.blue,
    height: 35,
    width: 35,
    aspectRatio: 1,
  },
});
