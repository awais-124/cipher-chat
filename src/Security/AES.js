import CryptoJS from 'react-native-crypto-js';

const KEY_SIZE = 128;

const generateKey = () => {
  try {
    return CryptoJS.lib.WordArray.random(KEY_SIZE / 8).toString(
      CryptoJS.enc.Hex,
    );
  } catch (error) {
    console.log('AES-Key-Generation Failed: ', error);
    return false;
  }
};

const encrypt = (data, aesKey) => {
  try {
    console.log(
      'AES KEY | TYPE | LENGTH: ',
      aesKey,
      typeof aesKey,
      aesKey.length,
    );
    console.log('PLAIN TEXT IN AES ALGO : ', data);
    return CryptoJS.AES.encrypt(data, aesKey).toString();
  } catch (error) {
    console.log('AES-Encryption Failed: ', error);
    return false;
  }
};

const decrypt = (ciphertext, aesKey) => {
  try {
    console.log(
      'AES KEY | TYPE | LENGTH: ',
      aesKey,
      typeof aesKey,
      aesKey.length,
    );
    console.log('CIPHER TEXT IN AES ALGO : ', ciphertext);
    const bytes = CryptoJS.AES.decrypt(ciphertext, aesKey);
    const test = bytes.toString(CryptoJS.enc.Utf8);
    console.log({test});
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.log('AES-Decryption Failed: ', error);
    return false;
  }
};

const AES = {generateKey, encrypt, decrypt};

export default AES;
