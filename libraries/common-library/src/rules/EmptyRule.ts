import { doNothing } from '../methods';
import { Input, Result, Rule, SuccessResult } from '../types';

// Empty:
//   ''

export const EmptyRule: Rule = {
  name: 'Empty',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return SuccessResult.fromEmpty();
  },
  produce: doNothing
};
