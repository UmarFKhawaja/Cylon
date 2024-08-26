import { Context, Input, Result, Rule, SuccessResult } from '../types';

export const DebugRule: Rule = {
  name: 'Debug',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return SuccessResult.fromEmpty();
  },
  produce: (context: Context): void => {
  }
};
