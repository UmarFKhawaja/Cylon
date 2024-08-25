import { FailureResult, Input, Match, Result, SuccessResult } from '../types';

export const IS_WHITESPACE: Match = (input: Input): Result => {
  return /^\s$/.test(input.char) ? SuccessResult.fromChar(input.char) : FailureResult.fromMessage('IsWhitespaceError');
};

export const IS_LOWERCASE_LETTER: Match = (input: Input): Result => {
  return /^[a-z]$/.test(input.char) ? SuccessResult.fromChar(input.char) : FailureResult.fromMessage('IsLowercaseLetterError');
};

export const IS_UPPERCASE_LETTER: Match = (input: Input): Result => {
  return /^[A-Z]$/.test(input.char) ? SuccessResult.fromChar(input.char) : FailureResult.fromMessage('IsUppercaseLetterError');
};

export const IS_DIGIT: Match = (input: Input): Result => {
  return /^[0-9]$/.test(input.char) ? SuccessResult.fromChar(input.char) : FailureResult.fromMessage('IsDigitError');
};
