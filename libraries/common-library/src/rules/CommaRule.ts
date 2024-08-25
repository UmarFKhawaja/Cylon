import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// Comma:
//   ','

export const CommaRule: Rule = {
  name: 'Comma',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, ',');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
