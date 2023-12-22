const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */

class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  checkArguments(message, key) {
    return message !== undefined && key !== undefined;
  }

  prepareKey(message, key) {
    let keyNew = '';
    let kChar = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i].toUpperCase();

      if (this.alphabet.includes(char)) {
        keyNew += key[kChar % key.length].toUpperCase();
        kChar++;
      } else {
        keyNew += ' ';
      }
    }

    return keyNew;
  }

  transformMessage(message, key, operation) {
    if (!this.checkArguments(message, key)) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    const keyNew = this.prepareKey(message, key);
    let transformedMessage = '';

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      if (!this.alphabet.includes(char)) {
        transformedMessage += char;
        continue;
      }

      const alphabetIndex = this.alphabet.indexOf(char);
      const keyIndex = this.alphabet.indexOf(keyNew[i]);
      let resultCharIndex;

      if (operation === 'encrypt') {
        resultCharIndex = (alphabetIndex + keyIndex) % 26;
      } else if (operation === 'decrypt') {
        resultCharIndex = (26 + alphabetIndex - keyIndex) % 26;
      }

      transformedMessage += this.alphabet[resultCharIndex];
    }

    return transformedMessage;
  }

  encrypt(message, key) {
    return this.isDirect ? this.transformMessage(message, key, 'encrypt') : this.transformMessage(message, key, 'encrypt').split('').reverse().join('');
  }

  decrypt(message, key) {
    return this.isDirect ? this.transformMessage(message, key, 'decrypt') : this.transformMessage(message, key, 'decrypt').split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
