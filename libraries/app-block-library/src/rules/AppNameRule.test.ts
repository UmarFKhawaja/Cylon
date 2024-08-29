import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { AppName } from '../models';
import { AppNameRule } from './AppNameRule';

describe('AppNameRule', (): void => {
  it('should match a AppName span', (): void => {
    const input: Input = Input.fromText('BrowserApp');

    const result: Result = applyRule(input, AppNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const appNameToken: ModelToken = token as ModelToken;

    expect(appNameToken.model).toBeInstanceOf(AppName);
    expect(appNameToken.modelType).toEqual(ModelType.APP_NAME);

    const appName: AppName = appNameToken.model as AppName;

    expect(appName.value).toEqual('BrowserApp');
  });
});
