import { AggregateResult, Input, Queue, Result, Rule, SuccessResult, Token } from '../types';
import { applyRule } from './applyRule';
import { doNothing } from './doNothing';

export function makeZeroOrMoreRule(rule: Rule): Rule {
  return {
    name: `${rule.name}*`,
    options: {
      printLogs: false
    },
    match: (input: Input): Result => {
      // eslint-disable-next-line prefer-const
      let [hasSucceeded, queue]: AggregateResult = [true, new Queue<Token>()];

      while (hasSucceeded) {
        const result: Result = applyRule(input, rule);

        if (result.hasSucceeded) {
          while (!(result as SuccessResult).queue.isEmpty) {
            queue.add((result as SuccessResult).queue.remove());
          }
        }

        hasSucceeded = result.hasSucceeded;
      }

      return SuccessResult.fromQueue(queue);
    },
    produce: doNothing
  };
}
