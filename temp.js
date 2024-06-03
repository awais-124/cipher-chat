import AES from './src/Security/AES';
import {
  rsaDecrypt,
  rsaEncrypt,
  generateKeyPair,
} from './src/Security/hybrid-rsa';

const doIt = async () => {
  try {
    const keys = await generateKeyPair();
    console.log('STARTED');
    const PB = keys.publicKey;
    const PK = keys.privateKey;

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

    const AESCipher = await rsaEncrypt(PB, AESKey);
    console.log('FROM CHECK : ENCRYPTED AES KEY : ', AESCipher);

    console.log(
      '...................FROM CHECK : DECRYPION STARTS.................. : ',
    );
    const AESClear = await rsaDecrypt(PK, AESCipher);
    console.log('FROM CHECK : DECRYPTED AES KEY : ', AESClear);
    const clearText = AES.decrypt(ciphertext, AESClear);
    console.log('FROM CHECK : DECRYPTED MESSAGE : ', clearText);
  } catch (error) {
    console.log('ERROR FROM CHECK : ', error);
  }
};
const checker = {doIt};

export default checker;
