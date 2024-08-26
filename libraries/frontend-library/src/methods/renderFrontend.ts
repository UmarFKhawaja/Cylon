import { Item, ModelToken, Output, Result, SuccessResult, Token } from '@cylon/common-library';
import { Frontend } from '../models';

export function renderFrontend(result: Result): Output {
  if (!result.hasSucceeded) {
    throw new Error('SuccessResultNotProvidedError');
  }

  const successResult: SuccessResult = result as SuccessResult;

  const items: Item[] = [];

  while (!successResult.queue.isEmpty) {
    const token: Token = successResult.queue.remove();

    if (token instanceof ModelToken) {
      const modelToken: ModelToken = token as ModelToken;
      const model: object = modelToken.model;

      if (model instanceof Frontend) {
        const frontend: Frontend = model as Frontend;

        items.push(frontend.render());
      }
    }
  }

  if (items.length === 0) {
    throw new Error('ZeroModelsError');
  }

  if (items.length > 1) {
    throw new Error('MoreThanOneModelsError');
  }

  return new Output(items[0]);
}
