import { applyRule, Input, Result, SuccessResult } from '@cylon/common-library';
import { WidgetBlockRule } from '../rules';

const SNIPPET_WITH_ROUTE_WIDGET: string = `
route HomeRoute {
  HeroLayout {
    HomeFeature
  }
}
`;

const SNIPPET_WITH_PROVIDER_WIDGET: string = `
provider AxiosClientProvider {
  state {
  }

  value {
  }
}
`;

const SNIPPET_WITH_LAYOUT_WIDGET: string = `
layout HeroLayout {
  AxiosClientProvider {
    ApolloClientProvider {
      TokenProvider {
        ProfileProvider {
          ThemeProvider {
            Outlet
          }
        }
      }
    }
  }
}
`;

const SNIPPET_WITH_COMPONENT_WIDGET: string = `
component HomeFeature {
}
`;

describe('WidgetBlockRule', (): void => {
  it('should match Route as WidgetBlock block', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_ROUTE_WIDGET);
    const result: Result = applyRule(input, WidgetBlockRule);

    expect(result).toBeInstanceOf(Result);
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.hasSucceeded).toEqual(true);
  });

  it('should match Provider as WidgetBlock block', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_PROVIDER_WIDGET);
    const result: Result = applyRule(input, WidgetBlockRule);

    expect(result).toBeInstanceOf(Result);
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.hasSucceeded).toEqual(true);
  });

  it('should match Layout as WidgetBlock block', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_LAYOUT_WIDGET);
    const result: Result = applyRule(input, WidgetBlockRule);

    expect(result).toBeInstanceOf(Result);
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.hasSucceeded).toEqual(true);
  });

  it('should match Component as WidgetBlock block', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_COMPONENT_WIDGET);
    const result: Result = applyRule(input, WidgetBlockRule);

    expect(result).toBeInstanceOf(Result);
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.hasSucceeded).toEqual(true);
  });
});
