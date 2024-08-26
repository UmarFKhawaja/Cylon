import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeOneOrMoreRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { Reference, References } from '../models';
import { ReferenceRule } from './ReferenceRule';

// References:
//   ( InsignificantWhitespace Reference )+
//
//   Start {
//       Item
//       Item
//   }
//   End {
//       Item
//       Item
//   }

export const ReferencesRule: Rule = {
  name: 'References',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeOneOrMoreRule(
      makeAllRulesRule(
        InsignificantWhitespaceRule,
        ReferenceRule
      ))
    );
  },
  produce: (context: Context): void => {
    const references: Reference[] = [];

    while (!context.isEmpty) {
      context.skipWhitespace();

      if (context.hasCloseCurlyBracket()) {
        break;
      }

      context.assertModel(ModelType.REFERENCE);

      const reference: Reference = context.removeModel<Reference>();

      references.push(reference);
    }

    context.assertEmpty();

    context.addModel(
      new References(...references),
      ModelType.REFERENCES
    );
  }
};
