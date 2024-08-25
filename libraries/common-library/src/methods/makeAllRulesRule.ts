import { AggregateResult, FailureResult, Input, Queue, Result, Rule, SuccessResult, Token } from '../types';
import { applyRule } from './applyRule';
import { doNothing } from './doNothing';

export function makeAllRulesRule(...rules: Rule[]): Rule {
  return {
    name: `(${rules.map((rule: Rule): string => rule.name).join(' ')})`,
    options: {
      printLogs: false
    },
    match: (input: Input): Result => {
      const [hasSucceeded, queue]: AggregateResult = rules
        .reduce(([hasSucceeded, queue]: AggregateResult, rule: Rule): AggregateResult => {
          if (hasSucceeded) {
            const result: Result = applyRule(input, rule);

            if (result.hasSucceeded) {
              while (!(result as SuccessResult).queue.isEmpty) {
                const token: Token = (result as SuccessResult).queue.remove();

                queue.add(token);
              }
            } else {
              hasSucceeded = false;
            }
          }

          return [hasSucceeded, queue];
        }, [true, new Queue<Token>()]);

      return hasSucceeded
        ? SuccessResult.fromQueue(queue)
        : FailureResult.fromMessage('MatchAllRulesRuleError');
    },
    produce: doNothing
  };
}
