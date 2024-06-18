import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

import BtnChat from '../components/BtnChat';
import TextBox from '../components/TextBox';
import SmallLoader from '../components/SmallLoader';

import algoRSA from '../../Security/RSA';
import AES from '../../Security/AES';

import COLORS from '../../AUTH/styles/colors';

import StorageService from '../../AUTH/utils/StorageHelper';

const DecryptMessage = ({navigation, route}) => {
  const {encryptedMessage, encryptedAesKey} = route?.params?.data;

  const [aesKey, setAesKey] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [prvKey, setPrvKey] = useState('');
  const [aesKeyDecrypted, setAesKeyDecrypted] = useState(false);
  const [messageDecrypted, setMessageDecrypted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Keys = await StorageService.getItem('KEYS');
        const obj = Keys ? JSON.parse(Keys) : null;
        const prv = obj?.private;
        setPrvKey(prv);
      } catch (error) {
        console.error('Error fetching private key:', error);
      }
    };
    fetchData();
  }, []);

  const handleDecryptAesKey = async () => {
    try {
      setMessageDecrypted(false);
      setAesKeyDecrypted(false);
      setLoading(true);
      const decryptedAesKey = await algoRSA.decryptSingle(
        prvKey,
        encryptedAesKey,
      );
      setAesKey(decryptedAesKey);
      setAesKeyDecrypted(true);
    } catch (error) {
      console.error('Error decrypting AES key:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecryptMessage = () => {
    try {
      console.log(
        '  ******************************  ',
        {
          encryptedMessage,
          aesKey,
        },
        '  ******************************  ',
      );
      const decryptedMessageTemp = AES.decrypt(encryptedMessage, aesKey);
      console.log(
        '  ******************************  ',
        {
          decryptedMessageTemp,
        },
        '  ******************************  ',
      );
      setDecryptedMessage(decryptedMessageTemp);
      setMessageDecrypted(true);
    } catch (error) {
      console.error('Error decrypting message:', error);
    }
  };

  const handleBack = () => navigation.goBack();

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextBox heading="Encrypted Message" text={encryptedMessage} />
        <TextBox heading="Encrypted AES Key" text={encryptedAesKey} />
        <BtnChat
          title="Decrypt AES Key"
          handler={handleDecryptAesKey}
          disabled={loading || aesKeyDecrypted}
        />
        {aesKeyDecrypted && (
          <>
            <TextBox heading="Decrypted AES Key" text={aesKey} />
            <TextBox heading="Private Key" text={prvKey} />
            <BtnChat
              title="Decrypt Message"
              handler={handleDecryptMessage}
              disabled={loading || messageDecrypted}
            />
          </>
        )}
        {messageDecrypted && (
          <>
            <TextBox heading="Decrypted Message" text={decryptedMessage} />
            <BtnChat title="Back" handler={handleBack} disabled={loading} />
          </>
        )}
        {loading && <SmallLoader />}
      </ScrollView>
    </View>
  );
};

export default DecryptMessage;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary.white,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 26,
  },
});
