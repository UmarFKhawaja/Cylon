import { IS_UPPERCASE_LETTER } from '../constants';
import { doNothing } from '../methods';
import { Input, Result, Rule } from '../types';

// UppercaseLetter:
//   [A-Z]

export const UppercaseLetterRule: Rule = {
  name: 'UppercaseLetter',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return IS_UPPERCASE_LETTER(input);
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
