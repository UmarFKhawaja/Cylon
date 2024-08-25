import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { AppBody } from '../models';
import { AppBodyRule } from './AppBodyRule';

const SNIPPET: string = `{
    routes {
        HomeRoute
        SignUpRoute
        SignInRoute
        SignOutRoute
    }
}`;

describe('AppBodyRule', (): void => {
  it('should match an AppBody block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, AppBodyRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(AppBody);

    const appBody: AppBody = modelToken.model as AppBody;

    expect(appBody.routesList.length).toEqual(4);

    expect(appBody.routesList[0]!.name.value).toEqual('HomeRoute');
    expect(appBody.routesList[1]!.name.value).toEqual('SignUpRoute');
    expect(appBody.routesList[2]!.name.value).toEqual('SignInRoute');
    expect(appBody.routesList[3]!.name.value).toEqual('SignOutRoute');
  });
});
