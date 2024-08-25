import { AggregateResult, FailureResult, Input, Queue, Result, Rule, SuccessResult, Token } from '../types';
import { applyRule } from './applyRule';
import { doNothing } from './doNothing';

export function makeOneOrMoreRule(rule: Rule): Rule {
  return {
    name: `${rule.name}+`,
    options: {
      printLogs: false
    },
    match: (input: Input): Result => {
      // eslint-disable-next-line prefer-const
      let [hasSucceeded, queue]: AggregateResult = [false, new Queue<Token>()];

      while (true) {
        const result: Result = applyRule(input, rule);

        if (result.hasSucceeded) {
          while (!(result as SuccessResult).queue.isEmpty) {
            queue.add((result as SuccessResult).queue.remove());
          }

          hasSucceeded = true;
        } else {
          break;
        }
      }

      return hasSucceeded
        ? SuccessResult.fromQueue(queue)
        : FailureResult.fromMessage('MatchOneOrMoreRuleError');
    },
    produce: doNothing
  };
}
