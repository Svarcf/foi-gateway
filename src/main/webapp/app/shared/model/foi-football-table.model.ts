export interface IFoiFootballTable {
  id?: number;
  wins?: number;
  draws?: number;
  loses?: number;
  points?: number;
  team?: string;
}

export const defaultValue: Readonly<IFoiFootballTable> = {};
