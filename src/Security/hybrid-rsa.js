import {RSA} from 'hybrid-crypto-js';

const rsa = new RSA();

export const rsaEncrypt = (publicKeys, message) => {
  return new Promise((resolve, reject) => {
    rsa.encrypt(publicKeys, message, cipher => {
      if (cipher) {
        resolve(cipher);
      } else {
        reject('Encryption failed');
      }
    });
  });
};

export const rsaDecrypt = (privateKey, encryptedData) => {
  return new Promise((resolve, reject) => {
    rsa.decrypt(privateKey, encryptedData, plainText => {
      if (plainText) {
        resolve(plainText);
      } else {
        reject('Decryption failed');
      }
    });
  });
};

export const generateKeyPair = () => {
  return new Promise((resolve, reject) => {
    rsa.generateKeyPair(keyPair => {
      if (keyPair) {
        resolve(keyPair);
      } else {
        reject('Key pair generation failed');
      }
    });
  });
};
