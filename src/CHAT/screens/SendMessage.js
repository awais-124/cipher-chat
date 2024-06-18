import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import StyledInput from '../components/StyledInput';
import SmallLoader from '../components/SmallLoader';
import BtnChat from '../components/BtnChat';
import TextBox from '../components/TextBox';

import algoRSA from '../../Security/RSA';
import AES from '../../Security/AES';

import COLORS from '../../AUTH/styles/colors';

const SendMessage = ({navigation, route}) => {
  const ids = route.params.ids;
  const sender = ids.senderId;
  const receiver = ids.receiverId;

  console.log({receiver, sender});
  const [message, setMessage] = useState('');
  const [messageTwo, setMessageTwo] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [aesKey, setAesKey] = useState('');
  const [encryptedAesKey, setEncryptedAesKey] = useState('');
  const [receiverPublicKey, setReceiverPublicKey] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReceiverKeys = async () => {
      const receiverKeysDoc = await firestore()
        .collection('users')
        .doc(receiver)
        .get();
      const receiverKeys = receiverKeysDoc.data();
      setReceiverPublicKey(receiverKeys.publicKey);
      console.log(receiverKeys.publicKey);
    };
    fetchReceiverKeys();
  }, []);

  const handleSend = () => {
    // Logic for sending message to Firestore will be added later
  };

  const handleEncrypt = () => {
    // Logic for AES encryption will be added later
    setEncryptedAesKey('');
    const aesKeyTemp = AES.generateKey();
    const encryptedMessageTemp = AES.encrypt(message, aesKeyTemp);
    setAesKey(aesKeyTemp);
    setEncryptedMessage(encryptedMessageTemp);
  };

  const handleEncryptKey = async () => {
    // Logic for encrypting AES key with receiver's public key will be added later
    setLoading(true);
    const encryptedAesKeyTemp = await algoRSA.encryptMessage(
      [receiverPublicKey],
      aesKey,
    );
    setEncryptedAesKey(encryptedAesKeyTemp);
    setLoading(false);
  };

  const handleSubmitMessage = () => {
    if (!message.length) return;
    setAesKey('');
    setEncryptedMessage('');
    setEncryptedAesKey('');
    setMessageTwo(message);
    setMessage('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StyledInput
        message={message}
        setter={setMessage}
        handler={handleSubmitMessage}
      />
      {messageTwo ? (
        <>
          <TextBox text={messageTwo} heading="Message" />
          <BtnChat
            title="Encrypt"
            handler={handleEncrypt}
            disabled={!messageTwo || loading}
          />
        </>
      ) : null}
      {encryptedMessage ? (
        <>
          <TextBox heading={`Encrypted Message`} text={`${encryptedMessage}`} />
          <TextBox heading={`AES Key`} text={`${aesKey}`} />
          <BtnChat
            title="Encrypt AES Key"
            handler={handleEncryptKey}
            disabled={!messageTwo || loading}
          />
        </>
      ) : null}
      {encryptedAesKey && !loading && (
        <>
          <TextBox heading={`Encrypted Aes Key`} text={`${encryptedAesKey}`} />
          <TextBox
            text={`${receiverPublicKey}`}
            heading={`Receiver's Public Key`}
          />
          <BtnChat
            title="Send"
            handler={handleEncryptKey}
            disabled={!messageTwo || loading}
          />
        </>
      )}
      {loading && <SmallLoader />}
    </ScrollView>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: COLORS.secondary.black,
  },
});
