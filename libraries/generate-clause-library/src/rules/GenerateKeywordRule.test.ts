import { applyRule, Input, KeywordToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { GenerateKeywordRule } from './GenerateKeywordRule';

describe('GenerateKeywordRule', (): void => {
  it('should match the \'generate\' keyword', (): void => {
    const input: Input = Input.fromText('generate');

    const result: Result = applyRule(input, GenerateKeywordRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(KeywordToken);

    const keywordToken: KeywordToken = token as KeywordToken;

    expect(keywordToken.keyword).toEqual('generate');
  });
});
