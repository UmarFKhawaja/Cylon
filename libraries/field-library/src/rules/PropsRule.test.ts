import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, NonVoidTypeName, VoidTypeName } from '@cylon/core-library';
import { Attribute, Method, Params, Props } from '../models';
import { PropsRule } from './PropsRule';

describe('PropsRule', (): void => {
  it('should match Attribute and Method spans', (): void => {
    const input: Input = Input.fromText(`props {
        isLoading: Boolean
        setIsLoading(isLoading: Boolean): Void
    }`);

    const result: Result = applyRule(input, PropsRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const propsToken: ModelToken = token as ModelToken;

    expect(propsToken.model).toBeInstanceOf(Props);
    expect(propsToken.modelType).toEqual(ModelType.PROPS);

    const props: Props = propsToken.model as Props;

    expect(props.length).toEqual(2);
    expect(props[0]).toBeInstanceOf(Attribute);
    expect(props[1]).toBeInstanceOf(Method);

    const attribute: Attribute = props[0] as Attribute;
    const method: Method = props[1] as Method;

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
    const input: Input = Input.fromText(`props {
        isLoading: Boolean
    }`);

    const result: Result = applyRule(input, PropsRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const propsToken: ModelToken = token as ModelToken;

    expect(propsToken.model).toBeInstanceOf(Props);
    expect(propsToken.modelType).toEqual(ModelType.PROPS);

    const props: Props = propsToken.model as Props;

    expect(props.length).toEqual(1);
    expect(props[0]).toBeInstanceOf(Attribute);

    const attribute: Attribute = props[0] as Attribute;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);

    const attributeName: Identifier = attribute.name;
    const attributeTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;

    expect(attributeName.value).toEqual('isLoading');
    expect(attributeTypeName.dataType).toEqual('Boolean');
  });

  it('should match a Method span', (): void => {
    const input: Input = Input.fromText(`props {
        setIsLoading(isLoading: Boolean): Void
    }`);

    const result: Result = applyRule(input, PropsRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const propsToken: ModelToken = token as ModelToken;

    expect(propsToken.model).toBeInstanceOf(Props);
    expect(propsToken.modelType).toEqual(ModelType.PROPS);

    const props: Props = propsToken.model as Props;

    expect(props.length).toEqual(1);
    expect(props[0]).toBeInstanceOf(Method);

    const method: Method = props[0] as Method;

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
