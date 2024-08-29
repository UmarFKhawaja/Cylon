import { applyRule } from '../methods';
import { CharToken, Input, Queue, Result, SuccessResult, Token } from '../types';
import { DoubleQuoteRule } from './DoubleQuoteRule';

describe('DoubleQuoteRule', (): void => {
  it('should match a double quote character', (): void => {
    const input: Input = Input.fromText('"');

    const result: Result = applyRule(input, DoubleQuoteRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('"');
  });
});
