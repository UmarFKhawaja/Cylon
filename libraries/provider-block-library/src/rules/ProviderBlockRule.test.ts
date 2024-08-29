import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, NonVoidTypeName, VoidTypeName } from '@cylon/core-library';
import { AttributeSpan, MethodSpan, ParamsSpan } from '@cylon/field-block-library';
import { ProviderBlock } from '../models';
import { ProviderBlockRule } from './ProviderBlockRule';

const SNIPPET_WITH_ATTRIBUTE_AND_METHOD: string = `provider ProfileProvider {
    props {
        isLoading: Boolean
        setIsLoading(isLoading: Boolean): Void
    }
}`;

const SNIPPET_WITH_ATTRIBUTE_ONLY: string = `provider ProfileProvider {
    props {
        isLoading: Boolean
    }
}`;

const SNIPPET_WITH_METHOD_ONLY: string = `provider ProfileProvider {
    props {
        setIsLoading(isLoading: Boolean): Void
    }
}`;

describe('ProviderBlockRule', (): void => {
  it('should match a ProviderBlock block with AttributeSpan and MethodSpan spans', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_ATTRIBUTE_AND_METHOD);

    const result: Result = applyRule(input, ProviderBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const providerToken: ModelToken = token as ModelToken;

    expect(providerToken.model).toBeInstanceOf(ProviderBlock);
    expect(providerToken.modelType).toEqual(ModelType.PROVIDER_BLOCK);

    const provider: ProviderBlock = providerToken.model as ProviderBlock;

    expect(provider.name).toBeInstanceOf(Identifier);
    expect(provider.name.value).toEqual('ProfileProvider');

    expect(provider.body.props.length).toEqual(2);
    expect(provider.body.props[0]).toBeInstanceOf(AttributeSpan);
    expect(provider.body.props[1]).toBeInstanceOf(MethodSpan);

    const attribute: AttributeSpan = provider.body.props[0] as AttributeSpan;
    const method: MethodSpan = provider.body.props[1] as MethodSpan;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);
    expect(method.name).toBeInstanceOf(Identifier);
    expect(method.params).toBeInstanceOf(ParamsSpan);
    expect(method.typeName).toBeInstanceOf(VoidTypeName);

    const propName: Identifier = attribute.name;
    const propTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;
    const methodName: Identifier = method.name;
    const methodParams: ParamsSpan = method.params;

    expect(propName.value).toEqual('isLoading');
    expect(propTypeName.dataType).toEqual('Boolean');
    expect(methodName.value).toEqual('setIsLoading');
    expect(methodParams.length).toEqual(1);
    expect(methodParams[0].name).toBeInstanceOf(Identifier);
    expect(methodParams[0].name.value).toEqual('isLoading');
    expect(methodParams[0].typeName).toBeInstanceOf(NonVoidTypeName);

    const methodIsLoadingParamsTypeName: NonVoidTypeName = methodParams[0].typeName as NonVoidTypeName;

    expect(methodIsLoadingParamsTypeName.dataType).toEqual('Boolean');
  });

  it('should match a Provider block with an AttributeSpan span', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_ATTRIBUTE_ONLY);

    const result: Result = applyRule(input, ProviderBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const providerToken: ModelToken = token as ModelToken;

    expect(providerToken.model).toBeInstanceOf(ProviderBlock);
    expect(providerToken.modelType).toEqual(ModelType.PROVIDER_BLOCK);

    const provider: ProviderBlock = providerToken.model as ProviderBlock;

    expect(provider.name).toBeInstanceOf(Identifier);
    expect(provider.name.value).toEqual('ProfileProvider');

    expect(provider.body.props.length).toEqual(1);
    expect(provider.body.props[0]).toBeInstanceOf(AttributeSpan);

    const attribute: AttributeSpan = provider.body.props[0] as AttributeSpan;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);

    const propName: Identifier = attribute.name;
    const propTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;

    expect(propName.value).toEqual('isLoading');
    expect(propTypeName.dataType).toEqual('Boolean');
  });

  it('should match a ProviderBlock block with a MethodSpan span', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_METHOD_ONLY);

    const result: Result = applyRule(input, ProviderBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const providerToken: ModelToken = token as ModelToken;

    expect(providerToken.model).toBeInstanceOf(ProviderBlock);
    expect(providerToken.modelType).toEqual(ModelType.PROVIDER_BLOCK);

    const provider: ProviderBlock = providerToken.model as ProviderBlock;

    expect(provider.name).toBeInstanceOf(Identifier);
    expect(provider.name.value).toEqual('ProfileProvider');

    expect(provider.body.props.length).toEqual(1);
    expect(provider.body.props[0]).toBeInstanceOf(MethodSpan);

    const method: MethodSpan = provider.body.props[0] as MethodSpan;

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
