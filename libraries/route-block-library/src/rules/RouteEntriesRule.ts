import {
  applyRule,
  Context,
  Input,
  makeAllRulesRule,
  makeOneOrMoreRule,
  ModelType,
  Result,
  Rule
} from '@cylon/common-library';
import { RouteEntries, RouteEntry } from '../models';
import { RouteEntryRule } from './RouteEntryRule';

// RouteEntries:
//   RouteEntry+

export const RouteEntriesRule: Rule = {
  name: 'RouteEntries',
  options: {
    printLogs: false
  },
  match: (input: Input): Result => {
    return applyRule(input, makeAllRulesRule(
      makeOneOrMoreRule(RouteEntryRule)
    ));
  },
  produce: (context: Context): void => {
    const routeEntries: RouteEntry[] = [];

    while (!context.isEmpty) {
      context.assertModel(ModelType.ROUTE_ENTRY);

      const routeEntry: RouteEntry = context.removeModel<RouteEntry>();

      routeEntries.push(routeEntry);
    }

    context.assertEmpty();

    context.addModel(
      new RouteEntries(
        ...routeEntries
      ),
      ModelType.ROUTE_ENTRIES
    );
  }
};
