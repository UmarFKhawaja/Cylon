import { App, AppRule } from '@cylon/app-library';
import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeZeroOrOneRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { Component, Components } from '@cylon/component-library';
import { Layout, Layouts } from '@cylon/layout-library';
import { Provider, Providers } from '@cylon/provider-library';
import { Route, Routes } from '@cylon/route-library';
import { Widget, Widgets, WidgetsRule } from '@cylon/widget-library';
import { Frontend } from '../models';

// Frontend:
//   InsignificantWhitespace Widgets? InsignificantWhitespace App InsignificantWhitespace Widgets? InsignificantWhitespace

export const FrontendRule: Rule = {
  name: 'Frontend',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(WidgetsRule),
      InsignificantWhitespaceRule,
      AppRule,
      InsignificantWhitespaceRule,
      makeZeroOrOneRule(WidgetsRule),
      InsignificantWhitespaceRule
    ));
  },
  produce: (context: Context): void => {
    const widgets: Widget[] = [];

    context.skipWhitespace();

    if (context.hasModel(ModelType.WIDGETS)) {
      widgets.push(...context.removeModel<Widgets>());
    }

    context.skipWhitespace();

    context.assertModel(ModelType.APP);

    const app: App = context.removeModel<App>();

    context.skipWhitespace();

    if (context.hasModel(ModelType.WIDGETS)) {
      widgets.push(...context.removeModel<Widgets>());
    }

    context.skipWhitespace();

    context.assertEmpty();

    const routes: Route[] = widgets
      .filter((widget: Widget): boolean => widget instanceof Route)
      .map((widget: Widget): Route => widget as Route);

    const providers: Provider[] = widgets
      .filter((widget: Widget): boolean => widget instanceof Provider)
      .map((widget: Widget): Provider => widget as Provider);

    const layouts: Layout[] = widgets
      .filter((widget: Widget): boolean => widget instanceof Layout)
      .map((widget: Widget): Layout => widget as Layout);

    const components: Component[] = widgets
      .filter((widget: Widget): boolean => widget instanceof Component)
      .map((widget: Widget): Component => widget as Component);

    context.addModel(
      new Frontend(
        app,
        new Routes(...routes),
        new Providers(...providers),
        new Layouts(...layouts),
        new Components(...components)
      ),
      ModelType.FRONTEND
    );
  }
};
