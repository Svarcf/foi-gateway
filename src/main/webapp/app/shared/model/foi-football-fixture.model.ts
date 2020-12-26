import { Moment } from 'moment';

export interface IFoiFootballFixture {
  id?: number;
  eventDate?: Moment;
  round?: string;
  venue?: string;
  score?: string;
  tournamentId?: number;
  homeTeamId?: number;
  awayTeamId?: number;
}

export const defaultValue: Readonly<IFoiFootballFixture> = {};
