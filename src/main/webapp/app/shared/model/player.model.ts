import { ITeam } from 'app/shared/model/team.model';

export interface IPlayer {
  id?: number;
  name?: string;
  position?: string;
  team?: ITeam;
}

export const defaultValue: Readonly<IPlayer> = {};
