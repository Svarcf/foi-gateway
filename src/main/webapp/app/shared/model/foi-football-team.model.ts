import { IFoiFootballPlayer } from 'app/shared/model/foi-football-player.model';

export interface IFoiFootballTeam {
  id?: number;
  name?: string;
  logo?: string;
  venueName?: string;
  venueCity?: string;
  players?: IFoiFootballPlayer[];
}

export const defaultValue: Readonly<IFoiFootballTeam> = {};
