import {RSA, Crypt} from 'hybrid-crypto-js';

const rsa = new RSA();
const crypt = new Crypt();

export const rsaEncrypt = (publicKeys, message) => {
  try {
    const encrypted = crypt.encrypt(publicKeys, message);
    return encrypted;
  } catch (error) {
    console.log('RSA ENCRYPTION FAILED', {error});
    return false;
  }
};

export const rsaDecrypt = (privateKey, cipher) => {
  try {
    const clear = crypt.decrypt(privateKey, cipher);
    return clear;
  } catch (error) {
    console.log('RSA DECRYPTION FAILED', {error});
    return false;
  }
};

export const generateKeyPair = async () => {
  let privateKey = '';
  let publicKey = '';
  rsa.generateKeyPair(function (keyPair) {
    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;
  });
  return {privateKey, publicKey};
};
