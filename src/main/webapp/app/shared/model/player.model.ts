import { ITeam } from 'app/shared/model/team.model';

export interface IPlayer {
  id?: number;
  name?: string;
  number?: number;
  position?: string;
  team?: ITeam;
}

export const defaultValue: Readonly<IPlayer> = {};
