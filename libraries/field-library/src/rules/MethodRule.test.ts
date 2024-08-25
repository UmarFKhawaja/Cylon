import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, VoidTypeName } from '@cylon/core-library';
import { Method } from '../models';
import { MethodRule } from './MethodRule';

describe('MethodRule', (): void => {
  it('should match a Method span', (): void => {
    const input: Input = Input.fromText('setIsLoading(isLoading: Boolean): Void');

    const result: Result = applyRule(input, MethodRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const methodToken: ModelToken = token as ModelToken;

    expect(methodToken.model).toBeInstanceOf(Method);
    expect(methodToken.modelType).toEqual(ModelType.METHOD);

    const method: Method = methodToken.model as Method;

    expect(method.name).toBeInstanceOf(Identifier);

    const name: Identifier = method.name;

    expect(name.value).toEqual('setIsLoading');

    expect(method.typeName).toBeInstanceOf(VoidTypeName);
  });
});
