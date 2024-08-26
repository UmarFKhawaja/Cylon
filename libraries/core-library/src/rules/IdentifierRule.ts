import {
  applyRule,
  Context,
  Input,
  LetterOrDigitRule,
  LetterRule,
  makeAllRulesRule,
  makeZeroOrMoreRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { Identifier } from '../models';

// Identifier:
//   Letter LetterOrDigit*

export const IdentifierRule: Rule = {
  name: 'Identifier',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      LetterRule,
      makeZeroOrMoreRule(LetterOrDigitRule)
    ));
  },
  produce: (context: Context): void => {
    let value: string = '';

    while (!context.isEmpty) {
      value += context.removeChar();
    }

    context.addModel(
      new Identifier(value),
      ModelType.IDENTIFIER
    );
  }
};
