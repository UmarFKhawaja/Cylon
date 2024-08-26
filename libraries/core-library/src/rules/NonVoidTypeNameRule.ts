import {
  applyRule,
  CloseSquareBracketRule,
  Context,
  Input,
  makeAllRulesRule,
  makeAnyRulesRule,
  makeStringRule,
  ModelType,
  OpenSquareBracketRule,
  Result,
  Rule
} from '@cylon/common-library';
import { Identifier, NonVoidTypeName } from '../models';
import { IdentifierRule } from './IdentifierRule';

// NonVoidTypeName
//     OpenSquareBracket NonVoidTypeName CloseSquareBracket
//     'Object'
//     'Date'
//     'String'
//     'Number'
//     'Boolean'
//     Identifier

export const NonVoidTypeNameRule: Rule = {
  name: 'NonVoidTypeName',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      makeAllRulesRule(OpenSquareBracketRule, NonVoidTypeNameRule, CloseSquareBracketRule),
      makeStringRule('Object'),
      makeStringRule('Date'),
      makeStringRule('String'),
      makeStringRule('Number'),
      makeStringRule('Boolean'),
      IdentifierRule
    ));
  },
  produce: (context: Context): void => {
    if (context.length === 1) {
      if (context.hasString(['Object', 'Date', 'String', 'Number', 'Boolean'])) {
        produceNonArrayBaseTypeNameToken(context);
      } else if (context.hasModel(ModelType.IDENTIFIER)) {
        produceNonArrayCustomTypeNameToken(context);
      } else {
        context.throwError('Unsupported');
      }
    } else if (context.length === 3) {
      produceArrayTypeNameToken(context);
    } else {
      context.throwError('Unsupported');
    }
  }
};

function produceNonArrayBaseTypeNameToken(context: Context) {
  const dataType: string = context.removeString();

  context.assertEmpty();

  context.addModel(
    new NonVoidTypeName(dataType),
    ModelType.TYPE_NAME
  );
}

function produceNonArrayCustomTypeNameToken(context: Context) {
  const identifier: Identifier = context.removeModel<Identifier>();

  context.assertEmpty();

  context.addModel(
    new NonVoidTypeName(identifier.value),
    ModelType.TYPE_NAME
  );
}

function produceArrayTypeNameToken(context: Context) {
  context.assertOpenSquareBracket();

  context.removeChar();

  context.assertModel(ModelType.TYPE_NAME);

  const typeName: NonVoidTypeName = context.removeModel<NonVoidTypeName>();

  context.assertCloseSquareBracket();

  context.removeChar();

  context.assertEmpty();

  context.addModel(
    new NonVoidTypeName(`[${typeName.dataType}]`),
    ModelType.TYPE_NAME
  );
}
