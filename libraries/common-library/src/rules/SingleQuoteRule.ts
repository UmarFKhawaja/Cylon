import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// SingleQuote:
//   '\''

export const SingleQuoteRule: Rule = {
  name: 'SingleQuote',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, '\'');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
