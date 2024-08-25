import { FailureResult, Input, Result, SuccessResult } from '../types';

export function peekChar(input: Input, value: string): Result {
  if (!value || value.length > 1) {
    throw new Error('PeekCharError');
  }

  return input.char === value
    ? SuccessResult.fromChar(input.char)
    : FailureResult.fromMessage('PeekCharError');
}
