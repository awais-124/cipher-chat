const unsubscribe = subscriber.onSnapshot(async querySnapshot => {
  const newMessagesPromises = querySnapshot.docs
    .filter(doc => {
      console.log('doc : ', doc.data());
      console.log('messages : ', messages);
      return !messages.some(msg => msg._id === doc.id);
    })
    .map(async doc => {
      const firebaseData = doc.data();
      console.log('MESSAGES .DATA()  : ', firebaseData);
      const encryptedAESKey = firebaseData.metadata.key;
      const aesKey = await algoRSA.decryptMessage(privateKey, encryptedAESKey);
      if (!aesKey) {
        Alert.alert('algoRSA', 'AES KEY DECRYPTION FAILED');
      }
      const clearText = AES.decrypt(firebaseData.text, aesKey);
      if (!clearText) {
        Alert.alert('AES', 'CIPHER TEXT DECRYPTION FAILED');
      }
      const data = {
        _id: doc.id,
        text: clearText,
        createdAt: firebaseData.createdAt.toDate(),
        user: firebaseData.user,
      };
      return data;
    });

  const newMessages = await Promise.all(newMessagesPromises);
  setMessages(prevMessages => [...prevMessages, ...newMessages]);
});
