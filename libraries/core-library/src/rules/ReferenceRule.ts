import {
  applyRule,
  CloseCurlyBracketRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  OpenCurlyBracketRule,
  Result,
  Rule
} from '@cylon/common-library';
import { Identifier, Reference, References } from '../models';
import { IdentifierRule } from './IdentifierRule';
import { ReferencesRule } from './ReferencesRule';

// Reference:
//   Identifier ( InsignificantWhitespace OpenCurlyBracket InsignificantWhitespace References? InsignificantWhitespace CloseCurlyBracket )?
//
//     NavBar {
//         Menu {
//             Start {
//             }
//     }

export const ReferenceRule: Rule = {
  name: 'Reference',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      IdentifierRule,
      makeZeroOrOneRule(
        makeAllRulesRule(
          InsignificantWhitespaceRule,
          OpenCurlyBracketRule,
          InsignificantWhitespaceRule,
          makeZeroOrOneRule(ReferencesRule),
          InsignificantWhitespaceRule,
          CloseCurlyBracketRule
        )
      )
    ));
  },
  produce: (context: Context): void => {
    context.assertModel(ModelType.IDENTIFIER);

    const name: Identifier = context.removeModel<Identifier>();

    let references: References;

    if (!context.isEmpty) {
      context.skipWhitespace();

      context.assertOpenCurlyBracket();

      context.removeChar();

      context.skipWhitespace();

      references = context.hasModel(ModelType.REFERENCES)
        ? context.removeModel<References>()
        : new References();

      context.skipWhitespace();

      context.assertCloseCurlyBracket();

      context.removeChar();
    } else {
      references = new References();
    }

    context.assertEmpty();

    context.addModel(
      new Reference(name, references),
      ModelType.REFERENCE
    );
  }
};
