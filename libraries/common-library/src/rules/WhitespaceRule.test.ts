import { applyRule } from '../methods';
import { CharToken, Input, Queue, Result, SuccessResult, Token } from '../types';
import { WhitespaceRule } from './WhitespaceRule';

describe('WhitespaceRule', (): void => {
  it('should match space character', (): void => {
    const input: Input = Input.fromText(' ');

    const result: Result = applyRule(input, WhitespaceRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual(' ');
  });

  it('should match tab character', (): void => {
    const input: Input = Input.fromText('\t');

    const result: Result = applyRule(input, WhitespaceRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('\t');
  });

  it('should match new-line character', (): void => {
    const input: Input = Input.fromText('\n');

    const result: Result = applyRule(input, WhitespaceRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('\n');
  });

  it('should match carriage-return character', (): void => {
    const input: Input = Input.fromText('\r');

    const result: Result = applyRule(input, WhitespaceRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(CharToken);

    const charToken: CharToken = token as CharToken;

    expect(charToken.value).toEqual('\r');
  });
});
