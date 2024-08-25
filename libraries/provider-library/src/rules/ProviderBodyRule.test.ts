import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, NonVoidTypeName, VoidTypeName } from '@cylon/core-library';
import { Attribute, Method, Params } from '@cylon/field-library';
import { ProviderBody } from '../models';
import { ProviderBodyRule } from './ProviderBodyRule';

const SNIPPET_WITH_STATE_AND_VALUE: string = `{
    state {
        isLoading: Boolean
    }

    value {
        setIsLoading(isLoading: Boolean): Void
    }
}`;

const SNIPPET_WITH_PROPS_ONLY: string = `{
    props {
        fontName: String
    }
}`;

const SNIPPET_WITH_VALUE_ONLY: string = `{
    value {
        invalidateToken(): Void
    }
}`;

describe('ProviderBodyRule', (): void => {
  it('should match a ProviderBody block with State and Value blocks', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_STATE_AND_VALUE);

    const result: Result = applyRule(input, ProviderBodyRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const bodyToken: ModelToken = token as ModelToken;

    expect(bodyToken.model).toBeInstanceOf(ProviderBody);
    expect(bodyToken.modelType).toEqual(ModelType.PROVIDER_BODY);

    const body: ProviderBody = bodyToken.model as ProviderBody;

    expect(body.props.length).toEqual(0);
    expect(body.state.length).toEqual(1);
    expect(body.value.length).toEqual(1);
    expect(body.state[0]).toBeInstanceOf(Attribute);
    expect(body.value[0]).toBeInstanceOf(Method);

    const attribute: Attribute = body.state[0] as Attribute;
    const method: Method = body.value[0] as Method;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);
    expect(method.name).toBeInstanceOf(Identifier);
    expect(method.params).toBeInstanceOf(Params);
    expect(method.typeName).toBeInstanceOf(VoidTypeName);

    const propName: Identifier = attribute.name;
    const propTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;
    const methodName: Identifier = method.name;
    const methodParams: Params = method.params;

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

  it('should match a ProviderBody block with a Prop block', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_PROPS_ONLY);

    const result: Result = applyRule(input, ProviderBodyRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const bodyToken: ModelToken = token as ModelToken;

    expect(bodyToken.model).toBeInstanceOf(ProviderBody);
    expect(bodyToken.modelType).toEqual(ModelType.PROVIDER_BODY);

    const body: ProviderBody = bodyToken.model as ProviderBody;

    expect(body.props.length).toEqual(1);
    expect(body.props[0]).toBeInstanceOf(Attribute);

    const attribute: Attribute = body.props[0] as Attribute;

    expect(attribute.name).toBeInstanceOf(Identifier);
    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);

    const propName: Identifier = attribute.name;
    const propTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;

    expect(propName.value).toEqual('fontName');
    expect(propTypeName.dataType).toEqual('String');
  });

  it('should match a ProviderBody block with a Value block', (): void => {
    const input: Input = Input.fromText(SNIPPET_WITH_VALUE_ONLY);

    const result: Result = applyRule(input, ProviderBodyRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const bodyToken: ModelToken = token as ModelToken;

    expect(bodyToken.model).toBeInstanceOf(ProviderBody);
    expect(bodyToken.modelType).toEqual(ModelType.PROVIDER_BODY);

    const body: ProviderBody = bodyToken.model as ProviderBody;

    expect(body.props.length).toEqual(0);
    expect(body.state.length).toEqual(0);
    expect(body.value.length).toEqual(1);
    expect(body.value[0]).toBeInstanceOf(Method);

    const method: Method = body.value[0] as Method;

    expect(method.name).toBeInstanceOf(Identifier);
    expect(method.params).toBeInstanceOf(Params);
    expect(method.typeName).toBeInstanceOf(VoidTypeName);

    const methodName: Identifier = method.name;
    const methodParams: Params = method.params;

    expect(methodName.value).toEqual('invalidateToken');
    expect(methodParams.length).toEqual(0);
  });
});
