import { Input, Output, Result, Rule, SuccessResult } from '../types';

export const DebugRule: Rule = {
  name: 'Debug',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return SuccessResult.fromEmpty();
  },
  produce: (output: Output): void => {
  }
};
