import { Input, Queue, Result, Rule, SuccessResult, Token } from '../types';
import { applyRule } from './applyRule';
import { doNothing } from './doNothing';

export function makeZeroOrOneRule(rule: Rule): Rule {
  return {
    name: `${rule.name}?`,
    options: {
      printLogs: false
    },
    match: (input: Input): Result => {
      const queue: Queue<Token> = new Queue<Token>();

      const result: Result = applyRule(input, rule);

      if (result.hasSucceeded) {
        while (!(result as SuccessResult).queue.isEmpty) {
          queue.add((result as SuccessResult).queue.remove());
        }
      }

      return SuccessResult.fromQueue(queue);
    },
    produce: doNothing
  };
}
