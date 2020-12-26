import { Moment } from 'moment';
import { IFoiFootballFixture } from 'app/shared/model/foi-football-fixture.model';
import { IFoiFootballTable } from 'app/shared/model/foi-football-table.model';

export interface IFoiFootballTournament {
  id?: number;
  name?: string;
  start?: Moment;
  end?: Moment;
  fixtures?: IFoiFootballFixture[];
  tables?: IFoiFootballTable[];
}

export const defaultValue: Readonly<IFoiFootballTournament> = {};
