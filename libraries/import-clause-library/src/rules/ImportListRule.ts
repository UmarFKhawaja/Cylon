import {
  applyRule,
  AsteriskRule,
  CloseCurlyBracketRule,
  CommaRule,
  Context,
  doNothing,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeAnyRulesRule,
  makeZeroOrMoreRule,
  makeZeroOrOneRule,
  ModelType,
  OpenCurlyBracketRule,
  Result,
  Rule
} from '@cylon/common-library';
import { AsKeywordRule, Identifier, IdentifierRule } from '@cylon/core-library';
import { CombinedImportList, DestructuredImportList, NamedImportList } from '../models';

// ImportList:
//   CombinedImportList
//   DestructuredImportList
//   NamedImportList

export const ImportListRule: Rule = {
  name: 'ImportList',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      CombinedImportListRule,
      DestructuredImportListRule,
      NamedImportListRule
    ));
  },
  produce: doNothing
};

// CombinedImportList:
//   Identifier InsignificantWhitespace Comma Insignificant OpenCurlyBracket InsignificantWhitespace Identifier InsignificantWhitespace ( Comma InsignificantWhitespace Identifier InsignificantWhitespace )* CloseCurlyBracket

const CombinedImportListRule: Rule = {
  name: 'ImportList',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      IdentifierRule,
      InsignificantWhitespaceRule,
      CommaRule,
      InsignificantWhitespaceRule,
      OpenCurlyBracketRule,
      InsignificantWhitespaceRule,
      IdentifierRule,
      InsignificantWhitespaceRule,
      makeZeroOrMoreRule(
        makeAllRulesRule(
          CommaRule,
          InsignificantWhitespaceRule,
          IdentifierRule,
          InsignificantWhitespaceRule
        )
      ),
      CloseCurlyBracketRule
    ));
  },
  produce: (context: Context): void => {
    context.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = context.removeModel<Identifier>();

    context.skipWhitespace();

    context.assertChar(',');

    context.removeChar();

    context.skipWhitespace();

    context.assertOpenCurlyBracket();

    context.removeChar();

    context.skipWhitespace();

    const identifiers: Identifier[] = [];

    identifiers.push(context.removeModel<Identifier>());

    context.skipWhitespace();

    while (!context.isEmpty) {
      if (context.hasChar(',')) {
        context.removeChar();

        context.skipWhitespace();

        context.assertModel(ModelType.IDENTIFIER);

        identifiers.push(context.removeModel<Identifier>());

        context.skipWhitespace();
      } else {
        break;
      }
    }

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new CombinedImportList(identifier, identifiers),
      ModelType.IMPORT_LIST
    );
  }
};

// DestructuredImportList:
//   OpenCurlyBracket InsignificantWhitespace Identifier InsignificantWhitespace ( Comma InsignificantWhitespace Identifier InsignificantWhitespace )* CloseCurlyBracket

const DestructuredImportListRule: Rule = {
  name: 'ImportList',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      OpenCurlyBracketRule,
      InsignificantWhitespaceRule,
      IdentifierRule,
      InsignificantWhitespaceRule,
      makeZeroOrMoreRule(
        makeAllRulesRule(
          CommaRule,
          InsignificantWhitespaceRule,
          IdentifierRule,
          InsignificantWhitespaceRule
        )
      ),
      CloseCurlyBracketRule
    ));
  },
  produce: (context: Context): void => {
    context.assertOpenCurlyBracket();

    context.removeChar();

    context.skipWhitespace();

    const identifiers: Identifier[] = [];

    identifiers.push(context.removeModel<Identifier>());

    context.skipWhitespace();

    while (!context.isEmpty) {
      if (context.hasChar(',')) {
        context.removeChar();

        context.skipWhitespace();

        context.assertModel(ModelType.IDENTIFIER);

        identifiers.push(context.removeModel<Identifier>());

        context.skipWhitespace();
      } else {
        break;
      }
    }

    context.assertCloseCurlyBracket();

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      new DestructuredImportList(identifiers),
      ModelType.IMPORT_LIST
    );
  }
};

// NamedImportList:
//   ( Asterisk InsignificantWhitespace AsKeyword )? InsignificantWhitespace Identifier

const NamedImportListRule: Rule = {
  name: 'ImportList',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      makeZeroOrOneRule(
        makeAllRulesRule(
          AsteriskRule,
          InsignificantWhitespaceRule,
          AsKeywordRule,
          InsignificantWhitespaceRule
        )
      ),
      IdentifierRule
    ));
  },
  produce: (context: Context): void => {
    if (context.hasChar('*')) {
      context.removeChar();

      context.skipWhitespace();

      context.assertKeyword('as');

      context.removeKeyword();

      context.skipWhitespace();
    }

    context.assertModel(ModelType.IDENTIFIER);

    const identifier: Identifier = context.removeModel<Identifier>();

    context.assertEmpty();

    context.addModel(
      new NamedImportList(identifier),
      ModelType.IMPORT_LIST
    );
  }
};
