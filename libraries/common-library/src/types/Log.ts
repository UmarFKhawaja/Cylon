import { EOL } from 'os';

export class Log {
  static debug(message: string): void {
    process.stdout.write(message);
    process.stdout.write(EOL);
  }

  static info(message: string): void {
    process.stdout.write(message);
    process.stdout.write(EOL);
  }

  static error(message: string): void {
    process.stderr.write(message);
    process.stderr.write(EOL);
  }
}
