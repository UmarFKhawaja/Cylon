import { applyRule } from '../methods';
import { Input, Queue, Result, SuccessResult, Token } from '../types';
import { EmptyRule } from './EmptyRule';

describe('EmptyRule', (): void => {
  it('should match', (): void => {
    const input: Input = Input.fromText('');

    const result: Result = applyRule(input, EmptyRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(0);
  });
});
