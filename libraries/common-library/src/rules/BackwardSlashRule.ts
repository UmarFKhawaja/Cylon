import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// BackwardSlash:
//   '\'

export const BackwardSlashRule: Rule = {
  name: 'BackwardSlash',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, '\\');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
