import { Moment } from 'moment';
import { IPlayer } from 'app/shared/model/player.model';

export interface IFixture {
  id?: number;
  eventDate?: Moment;
  round?: string;
  statusShort?: string;
  score?: string;
  homeTeam?: IPlayer;
  awayTeam?: IPlayer;
}

export const defaultValue: Readonly<IFixture> = {};
