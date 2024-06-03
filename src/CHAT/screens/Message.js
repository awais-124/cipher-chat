import {useState, useEffect, useCallback} from 'react';

import {StyleSheet, View, StatusBar, Alert} from 'react-native';

import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import Header from '../components/Header';

import FONTFAMILY from '../../AUTH/styles/fonts';
import COLORS from '../../AUTH/styles/colors';

import AES from '../../Security/AES';
import {rsaEncrypt, rsaDecrypt} from '../../Security/hybrid-rsa';
import {screen_width} from '../../AUTH/utils/Dimensions';
import StorageService from '../../AUTH/utils/StorageHelper';

const Message = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [privateKey, setPrivateKey] = useState('');
  const [senderPublicKey, setSenderPublicKey] = useState('');

  const route = useRoute();
  const senderId = route.params?.id;
  const receiverId = route.params?.receiver.userId;
  const receiverName = route.params?.receiver.name;
  const publicKey = route.params?.receiver.publicKey;

  useEffect(() => {
    const getMyPrivateKey = async () => {
      const temp = await StorageService.getItem('KEYS');
      const keys = JSON.parse(temp);
      setPrivateKey(keys.private);
      setSenderPublicKey(keys.public);
    };

    getMyPrivateKey();
  }, []);

  if (typeof publicKey !== 'string' || typeof privateKey !== 'string') {
    Alert.alert('Error', 'Keys not set');
  }

  const sender = `${senderId}_${receiverId}`;
  const receiver = `${receiverId}_${senderId}`;

  const goToPreviousScreen = () => navigation.goBack();
  const goToContactScreen = () => navigation.navigate('Contact');

  useEffect(() => {
    const fetchData = async () => {
      const subscriber = firestore()
        .collection('chats')
        .doc(sender)
        .collection('messages')
        .orderBy('createdAt', 'desc');

      const unsubscribe = subscriber.onSnapshot(async querySnapshot => {
        const newMessagesPromises = querySnapshot.docs.map(async doc => {
          const firebaseData = doc.data();
          const encryptedAESKey = firebaseData.metadata.key;

          try {
            const aesKey = await rsaDecrypt(privateKey, encryptedAESKey);
            const clearText = AES.decrypt(firebaseData.text, aesKey);

            return {
              _id: doc.id,
              text: clearText,
              createdAt: firebaseData.createdAt.toDate(),
              user: firebaseData.user,
            };
          } catch (error) {
            Alert.alert('Decryption Error', error.message);
            return null;
          }
        });

        const newMessages = await Promise.all(newMessagesPromises);
        setMessages(newMessages.filter(msg => msg !== null));
      });

      return unsubscribe;
    };

    fetchData();
  }, [senderId, receiverId, privateKey]);

  const onSend = useCallback(
    async (messages = []) => {
      const message = messages[0];
      const aesKey = AES.generateKey();
      const encryptedMessage = AES.encrypt(message.text, aesKey);
      const keys = await StorageService.getItem('KEYS');
      const parsedKeys = JSON.parse(keys);
      const encryptedAESKey = await rsaEncrypt(
        [publicKey, parsedKeys.public],
        aesKey,
      );

      const myMsg = {
        _id: message._id,
        text: encryptedMessage,
        createdAt: new Date(),
        user: {
          _id: senderId,
        },
        metadata: {
          key: encryptedAESKey,
        },
      };

      try {
        await firestore()
          .collection('chats')
          .doc(sender)
          .collection('messages')
          .add(myMsg);

        await firestore()
          .collection('chats')
          .doc(receiver)
          .collection('messages')
          .add(myMsg);
      } catch (error) {
        console.log('ON SEND: ', error);
      }
    },
    [senderId, receiverId],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary.blue}
        barStyle="light-content"
      />
      <Header
        name={receiverName}
        goBack={goToPreviousScreen}
        goToContact={goToContactScreen}
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: senderId,
        }}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={styles.bubbleWrapper}
            containerStyle={styles.bubbleContainer}
          />
        )}
      />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.chat.back,
  },
  header: {
    elevation: 5,
    width: screen_width,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '300',
    textTransform: 'uppercase',
    ...FONTFAMILY.COMFORTAA.md.pt20,
    elevation: 5,
  },
  bubbleWrapper: {
    left: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.chat.left,
      padding: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    right: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.chat.right,
      padding: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
  },
  bubbleContainer: {
    left: {maxWidth: '80%', marginLeft: -45},
    right: {maxWidth: '80%'},
  },
});
