import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier, NonVoidTypeName } from '@cylon/core-library';
import { Attribute } from '../models';
import { AttributeRule } from './AttributeRule';

describe('AttributeRule', (): void => {
  it('should match a Attribute span', (): void => {
    const input: Input = Input.fromText('isLoading: Boolean');

    const result: Result = applyRule(input, AttributeRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const attributeToken: ModelToken = token as ModelToken;

    expect(attributeToken.model).toBeInstanceOf(Attribute);
    expect(attributeToken.modelType).toEqual(ModelType.ATTRIBUTE);

    const attribute: Attribute = attributeToken.model as Attribute;

    expect(attribute.name).toBeInstanceOf(Identifier);

    const name: Identifier = attribute.name;

    expect(name.value).toEqual('isLoading');

    expect(attribute.typeName).toBeInstanceOf(NonVoidTypeName);

    const nonVoidTypeName: NonVoidTypeName = attribute.typeName as NonVoidTypeName;

    expect(nonVoidTypeName.dataType).toEqual('Boolean');
  });
});
