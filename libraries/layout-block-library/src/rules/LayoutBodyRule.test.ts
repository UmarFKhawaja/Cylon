import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { LayoutBody } from '../models';
import { LayoutBodyRule } from './LayoutBodyRule';

const SNIPPET: string = `{
    ProfileProvider {
        ThemeProvider {
              AppShell {
                  Outlet
              }
        }
    }
}`;

describe('LayoutBodyRule', (): void => {
  it('should match a LayoutBody block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, LayoutBodyRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const bodyToken: ModelToken = token as ModelToken;

    expect(bodyToken.model).toBeInstanceOf(LayoutBody);
    expect(bodyToken.modelType).toEqual(ModelType.LAYOUT_BODY);

    const body: LayoutBody = bodyToken.model as LayoutBody;

    expect(body.references.length).toEqual(1);
  });
});
