import {
  applyRule,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  Output,
  Result,
  Rule,
  SignificantWhitespaceRule
} from '@cylon/common-library';
import { RouteEntries, RoutesList } from '@cylon/route-library';
import { App, AppBody, AppName } from '../models';
import { AppKeywordRule, AppNameRule } from '../rules';
import { AppBodyRule } from './AppBodyRule';

// App:
//   AppKeyword SignificantWhitespace AppName InsignificantWhitespace AppBody?

export const AppRule: Rule = {
  name: 'App',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      AppKeywordRule,
      SignificantWhitespaceRule,
      AppNameRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(AppBodyRule)
    ));
  },
  produce: (output: Output): void => {
    output.assertKeyword('app');

    output.removeKeyword();

    output.assertWhitespace();

    output.removeWhitespace();

    output.skipWhitespace();

    output.assertModel(ModelType.APP_NAME);

    const appName: AppName = output.removeModel<AppName>();

    output.skipWhitespace();

    const appBody: AppBody = output.hasModel(ModelType.APP_BODY)
      ? output.removeModel<AppBody>()
      : new AppBody(
        new RoutesList(
          new RouteEntries()
        )
      );

    output.assertEmpty();

    output.addModel(
      new App(appName, appBody),
      ModelType.APP
    );
  }
};
