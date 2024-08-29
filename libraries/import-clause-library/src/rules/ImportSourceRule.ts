import {
  applyRule,
  AtRule,
  Context,
  doNothing,
  DoubleQuoteRule,
  ForwardSlashRule,
  Input,
  makeAllRulesRule,
  makeAnyRulesRule,
  ModelType,
  Result,
  Rule,
  SingleQuoteRule
} from '@cylon/common-library';
import { Identifier, IdentifierRule } from '@cylon/core-library';
import { ImportSource, ScopedImportPackage, UnscopedImportPackage } from '../models';

// ImportSource:
//   SingleQuotedImportSource
//   DoubleQuotedImportSource

export const ImportSourceRule: Rule = {
  name: 'ImportSource',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      SingleQuotedImportSourceRule,
      DoubleQuotedImportSourceRule
    ));
  },
  produce: doNothing
};

// SingleQuotedImportSource:
//   SingleQuote ImportPackage SingleQuote

export const SingleQuotedImportSourceRule: Rule = {
  name: 'SingleQuotedImportSource',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      SingleQuoteRule,
      ImportPackageRule,
      SingleQuoteRule
    ));
  },
  produce: (context: Context): void => {
    context.assertChar('\'');

    context.removeChar();

    const importSource: ImportSource = context.removeModel<ImportSource>();

    context.assertChar('\'');

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      importSource,
      ModelType.IMPORT_SOURCE
    );
  }
};

// DoubleQuotedImportSource:
//   DoubleQuote ImportPackage DoubleQuote

export const DoubleQuotedImportSourceRule: Rule = {
  name: 'DoubleQuotedImportSource',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      DoubleQuoteRule,
      ImportPackageRule,
      DoubleQuoteRule
    ));
  },
  produce: (context: Context): void => {
    context.assertChar('"');

    context.removeChar();

    const importSource: ImportSource = context.removeModel<ImportSource>();

    context.assertChar('"');

    context.removeChar();

    context.assertEmpty();

    context.addModel(
      importSource,
      ModelType.IMPORT_SOURCE
    );
  }
};

// ImportPackage:
//   ScopedImportPackage
//   UnscopedImportPackage

export const ImportPackageRule: Rule = {
  name: 'ImportPackage',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      ScopedImportPackageRule,
      UnscopedImportPackageRule
    ));
  },
  produce: doNothing
};

// ScopedImportPackage:
//   At Identifier ForwardSlash Identifier

const ScopedImportPackageRule: Rule = {
  name: 'ScopedImportPackage',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      AtRule,
      IdentifierRule,
      ForwardSlashRule,
      IdentifierRule
    ));
  },
  produce: (context: Context): void => {
    context.assertChar('@');

    context.removeChar();

    context.assertModel(ModelType.IDENTIFIER);

    const scopeName: Identifier = context.removeModel<Identifier>();

    context.assertChar('/');

    context.removeChar();

    context.assertModel(ModelType.IDENTIFIER);

    const packageName: Identifier = context.removeModel<Identifier>();

    context.assertEmpty();

    context.addModel(
      new ScopedImportPackage(scopeName, packageName),
      ModelType.IMPORT_PACKAGE
    );
  }
};

// UnscopedImportPackage:
//   Identifier

const UnscopedImportPackageRule: Rule = {
  name: 'UnscopedImportPackage',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, IdentifierRule);
  },
  produce: (context: Context): void => {
    context.assertModel(ModelType.IDENTIFIER);

    const packageName: Identifier = context.removeModel<Identifier>();

    context.assertEmpty();

    context.addModel(
      new UnscopedImportPackage(packageName),
      ModelType.IMPORT_PACKAGE
    );
  }
};
