import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { RouteEntries } from '../models';
import { RouteEntriesRule } from './RouteEntriesRule';

const SNIPPET: string = `
    HomeRoute
    SignUpRoute
    SignInRoute
    SignOutRoute
`;

describe('RouteEntriesRule', (): void => {
  it('produces a model token containing a RouteEntries instance', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, RouteEntriesRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(RouteEntries);

    const routeEntries: RouteEntries = modelToken.model as RouteEntries;

    expect(routeEntries.length).toEqual(4);

    expect(routeEntries[0]!.name.value).toEqual('HomeRoute');
    expect(routeEntries[1]!.name.value).toEqual('SignUpRoute');
    expect(routeEntries[2]!.name.value).toEqual('SignInRoute');
    expect(routeEntries[3]!.name.value).toEqual('SignOutRoute');
  });
});
