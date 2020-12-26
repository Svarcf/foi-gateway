export interface IFoiFootballPlayer {
  id?: number;
  name?: string;
  number?: number;
  positionId?: number;
  teamId?: number;
}

export const defaultValue: Readonly<IFoiFootballPlayer> = {};
