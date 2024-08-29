import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, VoidTypeName } from '@cylon/core-library';
import { MethodSpan } from '../models';
import { MethodSpanRule } from './MethodSpanRule';

describe('MethodSpanRule', (): void => {
  it('should match a MethodSpan span', (): void => {
    const input: Input = Input.fromText('setIsLoading(isLoading: Boolean): Void');

    const result: Result = applyRule(input, MethodSpanRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const methodToken: ModelToken = token as ModelToken;

    expect(methodToken.model).toBeInstanceOf(MethodSpan);
    expect(methodToken.modelType).toEqual(ModelType.METHOD);

    const method: MethodSpan = methodToken.model as MethodSpan;

    expect(method.name).toBeInstanceOf(Identifier);

    const name: Identifier = method.name;

    expect(name.value).toEqual('setIsLoading');

    expect(method.typeName).toBeInstanceOf(VoidTypeName);
  });
});
