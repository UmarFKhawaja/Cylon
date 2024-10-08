import { Context, Input, Result, Rule } from '../types';
import { applyRule } from './applyRule';
import { makeAllRulesRule } from './makeAllRulesRule';
import { makeCharRule } from './makeCharRule';

export const makeStringRule: (value: string) => Rule = (value: string): Rule => {
  return ({
    name: `String(${value})`,
    options: {
      printLogs: false
    },
    match: (input: Input): Result => {
      const index: number = input.index;

      const rules: Rule[] = Array.from(value).map((char: string): Rule => makeCharRule(char));

      const result: Result = applyRule(input, makeAllRulesRule(...rules));

      if (!result.hasSucceeded) {
        input.setIndex(index);
      }

      return result;
    },
    produce: (context: Context): void => {
      for (let i: number = 0; i < value.length; i++) {
        if (context.removeChar() !== value[i]) {
          throw new Error('ProduceMatchStringError');
        }
      }

      context.addString(value);
    }
  });
};
