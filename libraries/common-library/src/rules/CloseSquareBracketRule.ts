import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// CloseSquareBracket:
//   ']'

export const CloseSquareBracketRule: Rule = {
  name: 'CloseSquareBracket',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, ']');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
