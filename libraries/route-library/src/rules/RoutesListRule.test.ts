import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { RoutesList } from '../models';
import { RoutesListRule } from './RoutesListRule';

const SNIPPET: string = `routes {
    HomeRoute
    SignUpRoute
    SignInRoute
    SignOutRoute
}`;

describe('RoutesListRule', (): void => {
  it('should match a RoutesList block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, RoutesListRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(RoutesList);

    const routesList: RoutesList = modelToken.model as RoutesList;

    expect(routesList.length).toEqual(4);

    expect(routesList[0]!.name.value).toEqual('HomeRoute');
    expect(routesList[1]!.name.value).toEqual('SignUpRoute');
    expect(routesList[2]!.name.value).toEqual('SignInRoute');
    expect(routesList[3]!.name.value).toEqual('SignOutRoute');
  });
});
