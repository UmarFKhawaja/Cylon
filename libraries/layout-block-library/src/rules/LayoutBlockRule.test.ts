import { applyRule, Input, ModelToken, ModelType, Queue, Result, SuccessResult, Token } from '@cylon/common-library';
import { Identifier } from '@cylon/core-library';
import { LayoutBlock } from '../models';
import { LayoutBlockRule } from './LayoutBlockRule';

const SNIPPET: string = `layout HomeLayout {
    ProfileProvider {
        ThemeProvider {
              AppShell {
                  Outlet
              }
        }
    }
}`;

describe('LayoutBlockRule', (): void => {
  it('should match a LayoutBlock block', (): void => {
    const input: Input = Input.fromText(SNIPPET);

    const result: Result = applyRule(input, LayoutBlockRule);

    expect(result.hasSucceeded).toEqual(true);
    expect(result).toBeInstanceOf(SuccessResult);

    const successResult: SuccessResult = result as SuccessResult;

    const queue: Queue<Token> = successResult.queue;

    expect(queue.length).toEqual(1);

    const token: Token = queue.remove();

    expect(token).toBeInstanceOf(ModelToken);

    const layoutToken: ModelToken = token as ModelToken;

    expect(layoutToken.model).toBeInstanceOf(LayoutBlock);
    expect(layoutToken.modelType).toEqual(ModelType.LAYOUT_BLOCK);

    const layout: LayoutBlock = layoutToken.model as LayoutBlock;

    expect(layout.name).toBeInstanceOf(Identifier);
    expect(layout.name.value).toEqual('HomeLayout');

    expect(layout.body.references.length).toEqual(1);
  });
});
