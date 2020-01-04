import { IPlayer } from 'app/shared/model/player.model';

export interface ITeam {
  id?: number;
  name?: string;
  logo?: string;
  venueName?: string;
  venueCity?: string;
  players?: IPlayer[];
}

export const defaultValue: Readonly<ITeam> = {};
