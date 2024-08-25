import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, NonVoidTypeName, VoidTypeName } from '@cylon/core-library';
import { Attribute, Method, Params, State } from '../models';
import { StateRule } from './StateRule';

describe('StateRule', (): void => {
  it('should match Attribute and Method spans', (): void => {
    const input: Input = Input.fromText(`state {
        isLoading: Boolean
        setIsLoading(isLoading: Boolean): Void
    }`);

    const result: Result = applyRule(input, StateRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const stateToken: ModelToken = token as ModelToken;

    expect(stateToken.model).toBeInstanceOf(State);
    expect(stateToken.modelType).toEqual(ModelType.STATE);

    const state: State = stateToken.model as State;

    expect(state.length).toEqual(2);
    expect(state[0]).toBeInstanceOf(Attribute);
    expect(state[1]).toBeInstanceOf(Method);

    const attribute: Attribute = state[0] as Attribute;
    const method: Method = state[1] as Method;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);
    expect(method.name).toBeInstanceOf(Identifier);
    expect(method.params).toBeInstanceOf(Params);
    expect(method.typeName).toBeInstanceOf(VoidTypeName);

    const attributeName: Identifier = attribute.name;
    const attributeTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;
    const methodName: Identifier = method.name;
    const methodParams: Params = method.params;

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

  it('should match a Attribute span', (): void => {
    const input: Input = Input.fromText(`state {
        isLoading: Boolean
    }`);

    const result: Result = applyRule(input, StateRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const stateToken: ModelToken = token as ModelToken;

    expect(stateToken.model).toBeInstanceOf(State);
    expect(stateToken.modelType).toEqual(ModelType.STATE);

    const state: State = stateToken.model as State;

    expect(state.length).toEqual(1);
    expect(state[0]).toBeInstanceOf(Attribute);

    const attribute: Attribute = state[0] as Attribute;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);

    const attributeName: Identifier = attribute.name;
    const attributeTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;

    expect(attributeName.value).toEqual('isLoading');
    expect(attributeTypeName.dataType).toEqual('Boolean');
  });

  it('should match a Method span', (): void => {
    const input: Input = Input.fromText(`state {
        setIsLoading(isLoading: Boolean): Void
    }`);

    const result: Result = applyRule(input, StateRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const stateToken: ModelToken = token as ModelToken;

    expect(stateToken.model).toBeInstanceOf(State);
    expect(stateToken.modelType).toEqual(ModelType.STATE);

    const state: State = stateToken.model as State;

    expect(state.length).toEqual(1);
    expect(state[0]).toBeInstanceOf(Method);

    const method: Method = state[0] as Method;

    expect(method.name).toBeInstanceOf(Identifier);
    expect(method.params).toBeInstanceOf(Params);
    expect(method.typeName).toBeInstanceOf(VoidTypeName);

    const methodName: Identifier = method.name;
    const methodParams: Params = method.params;

    expect(methodName.value).toEqual('setIsLoading');
    expect(methodParams.length).toEqual(1);
    expect(methodParams[0].name).toBeInstanceOf(Identifier);
    expect(methodParams[0].name.value).toEqual('isLoading');
    expect(methodParams[0].typeName).toBeInstanceOf(NonVoidTypeName);

    const methodIsLoadingParamsTypeName: NonVoidTypeName = methodParams[0].typeName as NonVoidTypeName;

    expect(methodIsLoadingParamsTypeName.dataType).toEqual('Boolean');
  });
});
