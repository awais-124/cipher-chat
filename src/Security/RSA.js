import RSA from 'react-native-rsa-native';

const KEY_SIZE = 1024;

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

async function encryptMessage(publicKeys, message) {
  try {
    // console.log(
    //   'PLAIN TEXT IN RSA | TYPE | LENGTH | KEY | KEY-LENGTH: ',
    //   message,
    //   '  |  ',
    //   typeof message,
    //   '  |  ',
    //   message.length,
    //   '  |  ',
    //   typeof key,
    //   '  |  ',
    //   key,
    //   '  |  ',
    //   key.length,
    // );
    const encryptedMessage = await Promise.all(
      publicKeys.map(publicKey => {
        return RSA.encrypt(message, publicKey);
      }),
    );
    return encryptedMessage;
  } catch (error) {
    console.log('RSA ENCRYPTION FALIED: ', error);
    return false;
  }
}

async function decryptMessage(privateKey, messages) {
  console.log(
    'CIPHER TEXT IN RSA | TYPE | LENGTH | KEY | KEY-LENGTH: ',
    messages[0],
    '  |  ',
    typeof messages[0],
    '  |  ',
    messages[0].length,
    '  |  ',
    typeof privateKey,
    '  |  ',
    privateKey,
    '  |  ',
    privateKey.length,
  );
  for (const msg of messages) {
    try {
      const decryptedMessage = await RSA.decrypt(msg, privateKey);
      if (decryptedMessage !== '') {
        return decryptedMessage;
      }
    } catch (error) {
      console.log('RSA DECRYPTION ERROR : ', {error});
    }
  }
  return false;
}



const algoRSA = {generateKeyPair, encryptMessage, decryptMessage};

export default algoRSA;
