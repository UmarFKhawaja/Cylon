import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, NonVoidTypeName, VoidTypeName } from '@cylon/core-library';
import { AttributeSpan, MethodSpan, ParamsSpan, StateBlock } from '../models';
import { StateBlockRule } from './StateBlockRule';

describe('StateBlockRule', (): void => {
  it('should match AttributeSpan and Method spans', (): void => {
    const input: Input = Input.fromText(`state {
        isLoading: Boolean
        setIsLoading(isLoading: Boolean): Void
    }`);

    const result: Result = applyRule(input, StateBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const stateToken: ModelToken = token as ModelToken;

    expect(stateToken.model).toBeInstanceOf(StateBlock);
    expect(stateToken.modelType).toEqual(ModelType.STATE_BLOCK);

    const state: StateBlock = stateToken.model as StateBlock;

    expect(state.length).toEqual(2);
    expect(state[0]).toBeInstanceOf(AttributeSpan);
    expect(state[1]).toBeInstanceOf(MethodSpan);

    const attribute: AttributeSpan = state[0] as AttributeSpan;
    const method: MethodSpan = state[1] as MethodSpan;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);
    expect(method.name).toBeInstanceOf(Identifier);
    expect(method.params).toBeInstanceOf(ParamsSpan);
    expect(method.typeName).toBeInstanceOf(VoidTypeName);

    const attributeName: Identifier = attribute.name;
    const attributeTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;
    const methodName: Identifier = method.name;
    const methodParams: ParamsSpan = method.params;

    expect(attributeName.value).toEqual('isLoading');
    expect(attributeTypeName.dataType).toEqual('Boolean');
    expect(methodName.value).toEqual('setIsLoading');
    expect(methodParams.length).toEqual(1);
    expect(methodParams[0].name).toBeInstanceOf(Identifier);
    expect(methodParams[0].name.value).toEqual('isLoading');
    expect(methodParams[0].typeName).toBeInstanceOf(NonVoidTypeName);

    const methodIsLoadingParamsTypeName: NonVoidTypeName = methodParams[0].typeName as NonVoidTypeName;

    expect(methodIsLoadingParamsTypeName.dataType).toEqual('Boolean');
  });

  it('should match a AttributeSpan span', (): void => {
    const input: Input = Input.fromText(`state {
        isLoading: Boolean
    }`);

    const result: Result = applyRule(input, StateBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const stateToken: ModelToken = token as ModelToken;

    expect(stateToken.model).toBeInstanceOf(StateBlock);
    expect(stateToken.modelType).toEqual(ModelType.STATE_BLOCK);

    const state: StateBlock = stateToken.model as StateBlock;

    expect(state.length).toEqual(1);
    expect(state[0]).toBeInstanceOf(AttributeSpan);

    const attribute: AttributeSpan = state[0] as AttributeSpan;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);

    const attributeName: Identifier = attribute.name;
    const attributeTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;

    expect(attributeName.value).toEqual('isLoading');
    expect(attributeTypeName.dataType).toEqual('Boolean');
  });

  it('should match a MethodSpan span', (): void => {
    const input: Input = Input.fromText(`state {
        setIsLoading(isLoading: Boolean): Void
    }`);

    const result: Result = applyRule(input, StateBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const stateToken: ModelToken = token as ModelToken;

    expect(stateToken.model).toBeInstanceOf(StateBlock);
    expect(stateToken.modelType).toEqual(ModelType.STATE_BLOCK);

    const state: StateBlock = stateToken.model as StateBlock;

    expect(state.length).toEqual(1);
    expect(state[0]).toBeInstanceOf(MethodSpan);

    const method: MethodSpan = state[0] as MethodSpan;

    expect(method.name).toBeInstanceOf(Identifier);
    expect(method.params).toBeInstanceOf(ParamsSpan);
    expect(method.typeName).toBeInstanceOf(VoidTypeName);

    const methodName: Identifier = method.name;
    const methodParams: ParamsSpan = method.params;

    expect(methodName.value).toEqual('setIsLoading');
    expect(methodParams.length).toEqual(1);
    expect(methodParams[0].name).toBeInstanceOf(Identifier);
    expect(methodParams[0].name.value).toEqual('isLoading');
    expect(methodParams[0].typeName).toBeInstanceOf(NonVoidTypeName);

    const methodIsLoadingParamsTypeName: NonVoidTypeName = methodParams[0].typeName as NonVoidTypeName;

    expect(methodIsLoadingParamsTypeName.dataType).toEqual('Boolean');
  });
});
