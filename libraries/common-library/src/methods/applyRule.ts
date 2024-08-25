import { bold, green, italic, red, strikethrough, yellow } from 'chalk';
import dayjs from 'dayjs';
import { FailureResult, Input, Output, Result, Rule, SuccessResult } from '../types';

interface MessageInput {
  char: string;
  index: number;
  length: number;
  level: number;
}

interface Message {
  kind: 'START' | 'SUCCESS' | 'FAILURE';
  timestamp: Date;
  text: string;
}

interface StartMessage extends Message {
  kind: 'START';
  input: MessageInput;
}

interface SuccessMessage extends Message {
  kind: 'SUCCESS';
  input: MessageInput;
}

interface FailureMessage extends Message {
  kind: 'FAILURE';
  input: MessageInput;
  error?: Error;
}

function isStartMessage(message: Message): message is StartMessage {
  return message.kind === 'START';
}

function isSuccessMessage(message: Message): message is SuccessMessage {
  return message.kind === 'SUCCESS';
}

function isFailureMessage(message: Message): message is FailureMessage {
  return message.kind === 'FAILURE';
}

type StartAction = (messageInput: MessageInput) => StartMessage;
type SuccessAction = (messageInput: MessageInput) => SuccessMessage;
type FailureAction = (messageInput: MessageInput, error: Error) => FailureMessage;

interface Actions {
  start: StartAction;
  success: SuccessAction;
  failure: FailureAction;
}

export function applyRule(input: Input, rule: Rule): Result {
  const actions: Actions | null = rule.options.printLogs ? parseAction(rule.name) : null;

  try {
    if (actions) console.debug(formatMessage(actions.start(input), input.level));

    const result: Result = executeRule(input, rule);

    if (result.hasSucceeded) {
      if (actions) console.info(formatMessage(actions.success(input), input.level));
    } else {
      if (actions?.failure) console.error(formatMessage(actions.failure(input, new Error((result as FailureResult).message)), input.level));
    }

    return result;
  } catch (error: unknown) {
    if (actions?.failure) console.error(formatMessage(actions.failure(input, error as Error), input.level));

    throw error;
  }
}

function formatMessage(message: Message, level: number): string {
  const timestamp: string = yellow(dayjs(message.timestamp).toISOString());
  const indent: string = ' '.repeat(level * 2);

  const text: string = (
    isStartMessage(message)
      ? [italic(message.text)]
      : isSuccessMessage(message)
        ? [bold(green(message.text))]
        : isFailureMessage(message)
          ? [strikethrough(red(message.text))]
          : [message.text]
  )
    .join('; ');

  return `${timestamp}: ${indent}${text}`;
}

function parseAction(ruleName: string): Actions | null {
  const startText: string = `applying ${ruleName} rule`;
  const successText: string = `applied ${ruleName} rule`;
  const failureText: string = `could not apply ${ruleName}`;

  try {
    const start: StartAction = makeStartAction(startText);
    const success: SuccessAction = makeSuccessAction(successText);
    const failure: FailureAction = makeFailureAction(failureText);

    return {
      start,
      success,
      failure
    };
  } catch (error: unknown) {
    return null;
  }
}

function makeStartAction(text: string): StartAction {
  return (messageInput: MessageInput) => {
    return ({
      kind: 'START',
      timestamp: new Date(),
      text,
      input: messageInput
    });
  };
}

function makeSuccessAction(text: string): SuccessAction {
  return (messageInput: MessageInput) => {
    return ({
      kind: 'SUCCESS',
      timestamp: new Date(),
      text,
      input: messageInput
    });
  };
}

function makeFailureAction(text: string): FailureAction {
  return (messageInput: MessageInput, error: Error) => {
    const { message }: Error = error;

    return {
      kind: 'FAILURE',
      timestamp: new Date(),
      text: message
        ? `${text} because a ${message} was thrown`
        : text,
      input: messageInput,
      ...(error ? { error } : {})
    };
  };
}

function executeRule(input: Input, rule: Rule): Result {
  input.increaseLevel();

  const index: number = input.index;

  const result: Result = rule.match(input);

  if (result.hasSucceeded) {
    rule.produce(new Output(rule, (result as SuccessResult).queue));
  } else {
    input.setIndex(index);
  }

  input.decreaseLevel();

  return result;
}
