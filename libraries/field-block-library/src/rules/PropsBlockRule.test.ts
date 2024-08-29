import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, NonVoidTypeName, VoidTypeName } from '@cylon/core-library';
import { AttributeSpan, MethodSpan, ParamsSpan, PropsBlock } from '../models';
import { PropsBlockRule } from './PropsBlockRule';

describe('PropsRule', (): void => {
  it('should match AttributeSpan and Method spans', (): void => {
    const input: Input = Input.fromText(`props {
        isLoading: Boolean
        setIsLoading(isLoading: Boolean): Void
    }`);

    const result: Result = applyRule(input, PropsBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const propsToken: ModelToken = token as ModelToken;

    expect(propsToken.model).toBeInstanceOf(PropsBlock);
    expect(propsToken.modelType).toEqual(ModelType.PROPS_BLOCK);

    const props: PropsBlock = propsToken.model as PropsBlock;

    expect(props.length).toEqual(2);
    expect(props[0]).toBeInstanceOf(AttributeSpan);
    expect(props[1]).toBeInstanceOf(MethodSpan);

    const attribute: AttributeSpan = props[0] as AttributeSpan;
    const method: MethodSpan = props[1] as MethodSpan;

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
    const input: Input = Input.fromText(`props {
        isLoading: Boolean
    }`);

    const result: Result = applyRule(input, PropsBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const propsToken: ModelToken = token as ModelToken;

    expect(propsToken.model).toBeInstanceOf(PropsBlock);
    expect(propsToken.modelType).toEqual(ModelType.PROPS_BLOCK);

    const props: PropsBlock = propsToken.model as PropsBlock;

    expect(props.length).toEqual(1);
    expect(props[0]).toBeInstanceOf(AttributeSpan);

    const attribute: AttributeSpan = props[0] as AttributeSpan;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);

    const attributeName: Identifier = attribute.name;
    const attributeTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;

    expect(attributeName.value).toEqual('isLoading');
    expect(attributeTypeName.dataType).toEqual('Boolean');
  });

  it('should match a MethodSpan span', (): void => {
    const input: Input = Input.fromText(`props {
        setIsLoading(isLoading: Boolean): Void
    }`);

    const result: Result = applyRule(input, PropsBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const propsToken: ModelToken = token as ModelToken;

    expect(propsToken.model).toBeInstanceOf(PropsBlock);
    expect(propsToken.modelType).toEqual(ModelType.PROPS_BLOCK);

    const props: PropsBlock = propsToken.model as PropsBlock;

    expect(props.length).toEqual(1);
    expect(props[0]).toBeInstanceOf(MethodSpan);

    const method: MethodSpan = props[0] as MethodSpan;

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
