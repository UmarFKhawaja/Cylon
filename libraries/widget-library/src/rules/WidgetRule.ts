import {
  applyRule,
  Context,
  Input,
  InsignificantWhitespaceRule,
  makeAllRulesRule,
  makeAnyRulesRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { ComponentRule } from '@cylon/component-library';
import { LayoutRule } from '@cylon/layout-library';
import { ProviderRule } from '@cylon/provider-library';
import { RouteRule } from '@cylon/route-library';
import { Widget } from '../models';

// Widget:
//   InsignificantWhitespace Route
//   InsignificantWhitespace Provider
//   InsignificantWhitespace Layout
//   InsignificantWhitespace Component

export const WidgetRule: Rule = {
  name: 'Widget',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAnyRulesRule(
      makeAllRulesRule(InsignificantWhitespaceRule, RouteRule),
      makeAllRulesRule(InsignificantWhitespaceRule, ProviderRule),
      makeAllRulesRule(InsignificantWhitespaceRule, LayoutRule),
      makeAllRulesRule(InsignificantWhitespaceRule, ComponentRule)
    ));
  },
  produce: (context: Context): void => {
    context.skipWhitespace();

    context.assertModel(ModelType.ROUTE, ModelType.PROVIDER, ModelType.LAYOUT, ModelType.COMPONENT);

    const widget: Widget = context.removeModel<Widget>();

    context.addModel(widget, ModelType.WIDGET);
  }
};
