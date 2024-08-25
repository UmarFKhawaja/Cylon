import { Match } from './Match';
import { Produce } from './Produce';
import { RuleOptions } from './RuleOptions';

export interface Rule {
  name: string;
  options: RuleOptions;
  match: Match;
  produce: Produce;
}
