import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { ProviderName } from '../models';
import { ProviderNameRule } from './ProviderNameRule';

describe('ProviderNameRule', (): void => {
  it('should match a ProviderName span', (): void => {
    const input: Input = Input.fromText('ThemeProvider');

    const result: Result = applyRule(input, ProviderNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const providerNameToken: ModelToken = token as ModelToken;

    expect(providerNameToken.model).toBeInstanceOf(ProviderName);
    expect(providerNameToken.modelType).toEqual(ModelType.PROVIDER_NAME);

    const providerName: ProviderName = providerNameToken.model as ProviderName;

    expect(providerName.value).toEqual('ThemeProvider');
  });
});
