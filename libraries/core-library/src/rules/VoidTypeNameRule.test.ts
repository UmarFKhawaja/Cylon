import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { VoidTypeName } from '../models';
import { VoidTypeNameRule } from './VoidTypeNameRule';

describe('VoidTypeNameRule', (): void => {
  it('should match the \'Void\' string', (): void => {
    const input: Input = Input.fromText('Void');

    const result: Result = applyRule(input, VoidTypeNameRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const modelToken: ModelToken = token as ModelToken;

    expect(modelToken.model).toBeInstanceOf(VoidTypeName);
  });
});
