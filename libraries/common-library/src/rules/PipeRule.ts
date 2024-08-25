import { doNothing, peekChar } from '../methods';
import { Input, Result, Rule } from '../types';

// Pipe:
//   '|'

export const PipeRule: Rule = {
  name: 'Pipe',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, '|');
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
};
