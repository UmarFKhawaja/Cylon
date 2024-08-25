import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, NonVoidTypeName } from '@cylon/core-library';
import { Param } from '../models';
import { ParamRule } from './ParamRule';

describe('ParamRule', (): void => {
  it('should match a Param span', (): void => {
    const input: Input = Input.fromText('isLoading: Boolean');

    const result: Result = applyRule(input, ParamRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const paramToken: ModelToken = token as ModelToken;

    expect(paramToken.model).toBeInstanceOf(Param);
    expect(paramToken.modelType).toEqual(ModelType.PARAM);

    const param: Param = paramToken.model as Param;

    expect(param.name).toBeInstanceOf(Identifier);

    const name: Identifier = param.name;

    expect(name.value).toEqual('isLoading');

    expect(param.typeName).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = param.typeName as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('Boolean');
  });
});
