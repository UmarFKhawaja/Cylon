import { IS_LOWERCASE_LETTER } from '../constants';
import { doNothing } from '../methods';
import { Input, Result, Rule } from '../types';

// LowercaseLetter:
//   [a-z]

export const LowercaseLetterRule: Rule = {
  name: 'LowercaseLetter',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return IS_LOWERCASE_LETTER(input);
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
