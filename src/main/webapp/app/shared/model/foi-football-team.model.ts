import { IFoiFootballPlayer } from 'app/shared/model/foi-football-player.model';
import { IFoiFootballFixture } from 'app/shared/model/foi-football-fixture.model';
import { IFoiFootballTable } from 'app/shared/model/foi-football-table.model';

export interface IFoiFootballTeam {
  id?: number;
  name?: string;
  logo?: string;
  venueName?: string;
  venueCity?: string;
  players?: IFoiFootballPlayer[];
  fixturesHomes?: IFoiFootballFixture[];
  fixturesAways?: IFoiFootballFixture[];
  tables?: IFoiFootballTable[];
}

export const defaultValue: Readonly<IFoiFootballTeam> = {};
