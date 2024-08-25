import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// OpenParenthesis:
//   '('

export const OpenParenthesisRule: Rule = {
  name: 'OpenParenthesis',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, '(');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
