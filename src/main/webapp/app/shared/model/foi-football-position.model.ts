import { IFoiFootballPlayer } from 'app/shared/model/foi-football-player.model';

export interface IFoiFootballPosition {
  id?: number;
  name?: string;
  players?: IFoiFootballPlayer[];
}

export const defaultValue: Readonly<IFoiFootballPosition> = {};
