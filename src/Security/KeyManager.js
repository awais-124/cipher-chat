import * as Keychain from 'react-native-keychain';
import {AES, enc} from 'react-native-crypto-js';

const ENCRYPTION_KEYCHAIN_KEY = 'CIPHER_CHAT_ENCRYPTION_KEY_ID';

const generateEncryptionKey = () => {
  const key = AES.generateKey();
  return enc.Hex.stringify(key);
};

const storeEncryptionKey = async () => {
  try {
    const existingKey = await Keychain.getGenericPassword({
      service: ENCRYPTION_KEYCHAIN_KEY,
    });

    if (!existingKey) {
      const encryptionKey = generateEncryptionKey();
      await Keychain.setGenericPassword(
        ENCRYPTION_KEYCHAIN_KEY,
        encryptionKey,
        {
          service: ENCRYPTION_KEYCHAIN_KEY,
        },
      );
      return encryptionKey;
    }

    return existingKey.password;
  } catch (error) {
    throw new Error('Error storing encryption key: ' + error.message);
  }
};

const getEncryptionKey = async () => {
  try {
    const keychainResult = await Keychain.getGenericPassword({
      service: ENCRYPTION_KEYCHAIN_KEY,
    });

    if (keychainResult) {
      return keychainResult.password;
    } else {
      throw new Error('Encryption key not found');
    }
  } catch (error) {
    throw new Error('Error retrieving encryption key: ' + error.message);
  }
};

const encryptData = async data => {
  try {
    const key = await getEncryptionKey();
    return AES.encrypt(JSON.stringify(data), key).toString();
  } catch (error) {
    throw new Error('Error encrypting data: ' + error.message);
  }
};

const decryptData = async cipherText => {
  try {
    const key = await getEncryptionKey();
    const bytes = AES.decrypt(cipherText, key);
    return JSON.parse(bytes.toString(enc.Utf8));
  } catch (error) {
    throw new Error('Error decrypting data: ' + error.message);
  }
};

const KeyManager = {
  storeEncryptionKey,
  getEncryptionKey,
  decryptData,
  encryptData,
};

export default KeyManager;
