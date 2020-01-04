import { Moment } from 'moment';

export interface IFixture {
  id?: number;
  eventDate?: Moment;
  round?: string;
  statusShort?: string;
  venue?: string;
  score?: string;
}

export const defaultValue: Readonly<IFixture> = {};
