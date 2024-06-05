import AES from './src/Security/AES';
import algoRSA from './src/Security/RSA';

const doIt = async () => {
  try {
    const keys = await algoRSA.generateKeyPair();
    const PB = keys.publicKey;
    const PK = keys.privateKey;
    const keys1 = await algoRSA.generateKeyPair();
    const PB1 = keys1.publicKey;
    const PK1 = keys1.privateKey;

    console.log(
      '...................FROM CHECK : ENCRYPION STARTS.................. : ',
    );

    const AESKey = AES.generateKey();
    console.log('FROM CHECK : AES KEY : ', AESKey);
    const message =
      'My name is Muhammad Awais My name is Muhammad Awais My name is Muhammad Awais';
    console.log('FROM CHECK :  MESSAGE : ', message);
    const ciphertext = AES.encrypt(message, AESKey);
    console.log('FROM CHECK : CIPHER TEXT : ', ciphertext);

    const AESCipher = await algoRSA.encryptMessage([PB, PB1], AESKey);
    console.log('FROM CHECK : ENCRYPTED AES KEY : ', AESCipher);

    console.log(
      '...................FROM CHECK : DECRYPION STARTS.................. : ',
    );
    console.log('DECRYPTION FIRST TIME');
    const AESClear = await algoRSA.decryptMessage(PK, AESCipher);
    console.log('FROM CHECK 1: DECRYPTED AES KEY : ', AESClear);
    const clearText = AES.decrypt(ciphertext, AESClear);
    console.log('FROM CHECK : DECRYPTED MESSAGE : ', clearText);

    console.log('DECRYPTION SECOND TIME');
    const AESClear1 = await algoRSA.decryptMessage(PK1, AESCipher);
    console.log('FROM CHECK 2 : DECRYPTED AES KEY : ', AESClear1);
    const clearText1 = AES.decrypt(ciphertext, AESClear);
    console.log('FROM CHECK 2 : DECRYPTED MESSAGE : ', clearText1);
  } catch (error) {
    console.log('ERROR FROM CHECK : ', error);
  }
};
const checker = {doIt};

export default checker;
