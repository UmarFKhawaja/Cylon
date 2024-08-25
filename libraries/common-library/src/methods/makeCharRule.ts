import { Input, Result, Rule } from '../types';
import { doNothing } from './doNothing';
import { peekChar } from './peekChar';

export const makeCharRule: (value: string) => Rule = (value: string): Rule => ({
  name: `Char(${value})`,
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    try {
      return peekChar(input, value);
    } finally {
      input.incrementIndex();
    }
  },
  produce: doNothing
});
