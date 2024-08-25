import { applyRule, makeStringRule } from '../methods';
import { Input, Output, Result, Rule } from '../types';

export const makeKeywordRule: (keyword: string) => Rule = (keyword: string): Rule => ({
  name: `Keyword(${keyword})`,
  options: {
    printLogs: false
  },
  match: (input: Input): Result => applyRule(input, makeStringRule(keyword)),
  produce: (output: Output): void => {
    if (output.removeString() !== keyword) {
      throw new Error('ProduceMatchKeywordError');
    }

    output.addKeyword(keyword);
  }
});
