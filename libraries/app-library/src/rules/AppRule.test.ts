import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { App, AppName } from '../models';
import { AppRule } from './AppRule';

const SNIPPET: string = `app BrowserApp {
    routes {
        HomeRoute
        SignUpRoute
        SignInRoute
        SignOutRoute
    }
}`;

describe('AppRule', (): void => {
  it('should match an App block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, AppRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(App);

    const app: App = modelToken.model as App;

    expect(app.name).toBeInstanceOf(AppName);
    expect(app.name.value).toEqual('BrowserApp');

    expect(app.body.routesList.length).toEqual(4);

    expect(app.body.routesList[0]!.name.value).toEqual('HomeRoute');
    expect(app.body.routesList[1]!.name.value).toEqual('SignUpRoute');
    expect(app.body.routesList[2]!.name.value).toEqual('SignInRoute');
    expect(app.body.routesList[3]!.name.value).toEqual('SignOutRoute');
  });
});
