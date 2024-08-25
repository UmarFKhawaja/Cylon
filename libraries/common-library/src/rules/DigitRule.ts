import { IS_DIGIT } from '../constants';
import { doNothing } from '../methods';
import { Input, Result, Rule } from '../types';

// Digit:
//   [0-9]

export const DigitRule: Rule = {
  name: 'Digit',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return IS_DIGIT(input);
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
