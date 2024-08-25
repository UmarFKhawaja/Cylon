import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier } from '@cylon/core-library';
import { Route } from '../models';
import { RouteRule } from './RouteRule';

const SNIPPET: string = `route HomeRoute {
    LandingLayout {
        MarketingBlurb
    }
}`;

describe('RouteRule', (): void => {
  it('should match a Route block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, RouteRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const routeToken: ModelToken = token as ModelToken;

    expect(routeToken.model).toBeInstanceOf(Route);
    expect(routeToken.modelType).toEqual(ModelType.ROUTE);

    const route: Route = routeToken.model as Route;

    expect(route.name).toBeInstanceOf(Identifier);
    expect(route.name.value).toEqual('HomeRoute');

    expect(route.body.references.length).toEqual(1);
  });
});
