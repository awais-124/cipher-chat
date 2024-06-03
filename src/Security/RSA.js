import RSA from 'react-native-rsa-native';

const KEY_SIZE = 2046;

async function generateKeyPair() {
  try {
    const keys = await RSA.generateKeys(KEY_SIZE);
    return {
      publicKey: keys.public,
      privateKey: keys.private,
    };
  } catch (error) {
    console.log('RSA KEYS GENERATION FALIED: ', error);
    return false;
  }
}

async function encryptMessage(key, message) {
  try {
    console.log(
      'PLAIN TEXT IN RSA | TYPE | LENGTH | KEY | KEY-LENGTH: ',
      message,
      '  |  ',
      typeof message,
      '  |  ',
      message.length,
      '  |  ',
      typeof key,
      '  |  ',
      key,
      '  |  ',
      key.length,
    );
    const encryptedMessage = await RSA.encrypt(message, key);
    return encryptedMessage;
  } catch (error) {
    console.log('RSA ENCRYPTION FALIED: ', error);
    return false;
  }
}

async function decryptMessage(key, message) {
  try {
    console.log(
      'CIPHER TEXT IN RSA | TYPE | LENGTH | KEY | KEY-LENGTH: ',
      message,
      '  |  ',
      typeof message,
      '  |  ',
      message.length,
      '  |  ',
      typeof key,
      '  |  ',
      key,
      '  |  ',
      key.length,
    );
    const decryptedMessage = await RSA.decrypt(message, key);
    console.log({decryptedMessage});
    return decryptedMessage;
  } catch (error) {
    console.log('RSA DECRYPTION FALIED: ', error.message);
    return false;
  }
}

const algoRSA = {generateKeyPair, encryptMessage, decryptMessage};

export default algoRSA;
