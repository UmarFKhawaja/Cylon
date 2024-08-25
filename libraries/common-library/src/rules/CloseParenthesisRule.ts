import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// CloseParenthesis:
//   ')'

export const CloseParenthesisRule: Rule = {
  name: 'CloseParenthesis',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, ')');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
