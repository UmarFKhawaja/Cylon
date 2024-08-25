import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// OpenSquareBracket:
//   '['

export const OpenSquareBracketRule: Rule = {
  name: 'OpenSquareBracket',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, '[');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
