import { applyRule, makeStringRule } from '../methods';
import { Context, Input, Result, Rule } from '../types';

export const makeKeywordRule: (keyword: string) => Rule = (keyword: string): Rule => ({
  name: `Keyword(${keyword})`,
  options: {
    printLogs: false
  },
  match: (input: Input): Result => applyRule(input, makeStringRule(keyword)),
  produce: (context: Context): void => {
    if (context.removeString() !== keyword) {
      throw new Error('ProduceMatchKeywordError');
    }

    context.addKeyword(keyword);
  }
});
