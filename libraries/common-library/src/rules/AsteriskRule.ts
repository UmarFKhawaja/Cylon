import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// Asterisk:
//   '*'

export const AsteriskRule: Rule = {
  name: 'Asterisk',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, '*');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
