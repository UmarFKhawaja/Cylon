import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { NonVoidTypeName } from '@cylon/core-library';
import { ParamsSpan } from '../models';
import { ParamsSpanRule } from './ParamsSpanRule';

describe('ParamsSpanRule', (): void => {
  it('should match a ParamsSpan span', (): void => {
    const input: Input = Input.fromText('isLoading: Boolean, color: Color');

    const result: Result = applyRule(input, ParamsSpanRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const paramsToken: ModelToken = token as ModelToken;

    expect(paramsToken.model).toBeInstanceOf(ParamsSpan);
    expect(paramsToken.modelType).toEqual(ModelType.PARAMS);

    const params: ParamsSpan = paramsToken.model as ParamsSpan;

    expect(params.length).toEqual(2);
    expect(params[0].name.value).toEqual('isLoading');
    expect(params[0].typeName).toBeInstanceOf(NonVoidTypeName);
    expect((params[0].typeName as NonVoidTypeName).dataType).toEqual('Boolean');
    expect(params[1].name.value).toEqual('color');
    expect(params[1].typeName).toBeInstanceOf(NonVoidTypeName);
    expect((params[1].typeName as NonVoidTypeName).dataType).toEqual('Color');
  });
});
