import { Moment } from 'moment';

export interface IFoiFootballFixture {
  id?: number;
  eventDate?: Moment;
  round?: string;
  venue?: string;
  score?: string;
}

export const defaultValue: Readonly<IFoiFootballFixture> = {};
