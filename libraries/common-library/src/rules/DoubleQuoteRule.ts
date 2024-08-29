import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// DoubleQuote:
//   '"'

export const DoubleQuoteRule: Rule = {
  name: 'DoubleQuote',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, '"');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
