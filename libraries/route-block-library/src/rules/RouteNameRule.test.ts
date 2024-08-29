import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { RouteName } from '../models';
import { RouteNameRule } from './RouteNameRule';

describe('RouteNameRule', (): void => {
  it('should match RouteName span', (): void => {
    const input: Input = Input.fromText('HomeRoute');

    const result: Result = applyRule(input, RouteNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const routeNameToken: ModelToken = token as ModelToken;

    expect(routeNameToken.model).toBeInstanceOf(RouteName);
    expect(routeNameToken.modelType).toEqual(ModelType.ROUTE_NAME);

    const routeName: RouteName = routeNameToken.model as RouteName;

    expect(routeName.value).toEqual('HomeRoute');
  });
});
