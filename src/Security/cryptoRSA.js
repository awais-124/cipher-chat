import {generateKeyPair, encrypt, decrypt} from 'react-native-crypto-js';

const RSA = {
  keyGenerator: async size => {
    const keyPair = await generateKeyPair(size);
    return {
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
    };
  },

  encrypter: async (publicKeys, message) => {
    const encryptedMessage = await Promise.all(
      publicKeys.map(publicKey => {
        return encrypt(message, publicKey);
      }),
    );
    return encryptedMessage;
  },

  decrypter: async (privateKeys, encryptedMessage) => {
    for (const privateKey of privateKeys) {
      try {
        const decryptedMessage = await decrypt(encryptedMessage, privateKey);
        if (decryptedMessage !== '') {
          return decryptedMessage;
        }
      } catch (error) {}
    }
    return null;
  },
};

export default RSA;
