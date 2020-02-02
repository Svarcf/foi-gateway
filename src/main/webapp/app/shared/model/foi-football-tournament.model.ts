import { Moment } from 'moment';

export interface IFoiFootballTournament {
  id?: number;
  name?: string;
  start?: Moment;
  end?: Moment;
}

export const defaultValue: Readonly<IFoiFootballTournament> = {};
