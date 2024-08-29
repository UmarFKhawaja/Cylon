import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// ForwardSlash:
//   '/'

export const ForwardSlashRule: Rule = {
  name: 'ForwardSlash',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, '/');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
