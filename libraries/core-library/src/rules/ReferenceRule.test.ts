import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Reference } from '../models';
import { ReferenceRule } from './ReferenceRule';

const SNIPPET: string = `NavBar {
        Menu {
            Start {
                Item
                Item
            }
            End {
                Item
                Item
            }
        }
    }
`;

describe('ReferenceRule', (): void => {
  it('should match a Reference block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, ReferenceRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const referenceToken: ModelToken = token as ModelToken;

    expect(referenceToken.modelType).toEqual(ModelType.REFERENCE);
    expect(referenceToken.model).toBeInstanceOf(Reference);

    const reference: Reference = referenceToken.model as Reference;

    expect(reference.name.value).toEqual('NavBar');
    expect(reference.references[0]!.name.value).toEqual('Menu');
    expect(reference.references[0]!.references[0]!.name.value).toEqual('Start');
    expect(reference.references[0]!.references[0]!.references.length).toEqual(2);
    expect(reference.references[0]!.references[0]!.references[0]!.name.value).toEqual('Item');
    expect(reference.references[0]!.references[0]!.references[1]!.name.value).toEqual('Item');
    expect(reference.references[0]!.references[1]!.name.value).toEqual('End');
    expect(reference.references[0]!.references[1]!.references.length).toEqual(2);
    expect(reference.references[0]!.references[1]!.references[0]!.name.value).toEqual('Item');
    expect(reference.references[0]!.references[1]!.references[1]!.name.value).toEqual('Item');
  });
});
