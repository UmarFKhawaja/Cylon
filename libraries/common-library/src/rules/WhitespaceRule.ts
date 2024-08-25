import { IS_WHITESPACE } from '../constants';
import { doNothing } from '../methods';
import { Input, Result, Rule } from '../types';

// Whitespace:
//   \s

export const WhitespaceRule: Rule = {
  name: 'Whitespace',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return IS_WHITESPACE(input);
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
