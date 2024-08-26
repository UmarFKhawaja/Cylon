import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
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
  produce: (context: Context): void => {
    context.assertKeyword('app');

    context.removeKeyword();

    context.assertWhitespace();

    context.removeWhitespace();

    context.skipWhitespace();

    context.assertModel(ModelType.APP_NAME);

    const appName: AppName = context.removeModel<AppName>();

    context.skipWhitespace();

    const appBody: AppBody = context.hasModel(ModelType.APP_BODY)
      ? context.removeModel<AppBody>()
      : new AppBody(
        new RoutesList(
          new RouteEntries()
        )
      );

    context.assertEmpty();

    context.addModel(
      new App(appName, appBody),
      ModelType.APP
    );
  }
};
