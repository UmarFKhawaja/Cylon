import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// CloseCurlyBracket:
//   '}'

export const CloseCurlyBracketRule: Rule = {
  name: 'CloseCurlyBracket',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, '}');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
