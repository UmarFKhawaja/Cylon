import {
  applyRule,
  Input,
  makeAllRulesRule,
  makeOneOrMoreRule,
  ModelType,
  Output,
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
  produce: (output: Output): void => {
    const routeEntries: RouteEntry[] = [];

    while (!output.isEmpty) {
      output.assertModel(ModelType.ROUTE_ENTRY);

      const routeEntry: RouteEntry = output.removeModel<RouteEntry>();

      routeEntries.push(routeEntry);
    }

    output.assertEmpty();

    output.addModel(
      new RouteEntries(
        ...routeEntries
      ),
      ModelType.ROUTE_ENTRIES
    );
  }
};
