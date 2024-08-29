import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// Colon:
//   ':'

export const ColonRule: Rule = {
  name: 'Colon',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, ':');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
