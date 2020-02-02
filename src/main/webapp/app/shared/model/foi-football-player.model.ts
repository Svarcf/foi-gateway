import { IFoiFootballPosition } from 'app/shared/model/foi-football-position.model';
import { IFoiFootballTeam } from 'app/shared/model/foi-football-team.model';

export interface IFoiFootballPlayer {
  id?: number;
  name?: string;
  number?: number;
  foiFootballPosition?: IFoiFootballPosition;
  foiFootballTeam?: IFoiFootballTeam;
}

export const defaultValue: Readonly<IFoiFootballPlayer> = {};
