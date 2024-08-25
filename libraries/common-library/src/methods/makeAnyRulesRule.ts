import { FailureResult, Input, Result, Rule } from '../types';
import { applyRule } from './applyRule';
import { doNothing } from './doNothing';

export function makeAnyRulesRule(...rules: Rule[]): Rule {
  return {
    name: rules.map((rule: Rule): string => rule.name).join(' | '),
    options: {
      printLogs: false
    },
    match: (input: Input): Result => {
      for (let i: number = 0; i < rules.length; i++) {
        const result: Result = applyRule(input, rules[i]!);

        if (result.hasSucceeded) {
          return result;
        }
      }

      return FailureResult.fromMessage('MatchAnyRulesRuleError');
    },
    produce: doNothing
  };
}
