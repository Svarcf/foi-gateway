import { ITeam } from './team.model';

export interface IStanding {
  id?: number;
  position?: number;
  won?: number;
  draw?: number;
  lost?: number;
  points?: number;
  team?: ITeam;
}

export const defaultValue: Readonly<IStanding> = {};
