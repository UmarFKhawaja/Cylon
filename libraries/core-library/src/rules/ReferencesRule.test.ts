import { applyRule, Input, ModelToken, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { References } from '../models';
import { ReferencesRule } from './ReferencesRule';

const SNIPPET: string = `
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
`;

describe('ReferencesRule', (): void => {
  it('should match a References block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, ReferencesRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const referencesToken: ModelToken = token as ModelToken;

    expect(referencesToken.modelType).toEqual('REFERENCES');
    expect(referencesToken.model).toBeInstanceOf(References);

    const references: References = referencesToken.model as References;

    expect(references[0]!.name.value).toEqual('Menu');
    expect(references[0]!.references[0]!.name.value).toEqual('Start');
    expect(references[0]!.references[0]!.references.length).toEqual(2);
    expect(references[0]!.references[0]!.references[0]!.name.value).toEqual('Item');
    expect(references[0]!.references[0]!.references[1]!.name.value).toEqual('Item');
    expect(references[0]!.references[1]!.name.value).toEqual('End');
    expect(references[0]!.references[1]!.references.length).toEqual(2);
    expect(references[0]!.references[1]!.references[0]!.name.value).toEqual('Item');
    expect(references[0]!.references[1]!.references[1]!.name.value).toEqual('Item');
  });
});
