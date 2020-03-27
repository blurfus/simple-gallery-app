export interface ILocation {
  id?: number;
  lon?: number;
  lat?: number;
}

export class Location implements ILocation {
  constructor(public id?: number, public lon?: number, public lat?: number) {}
}
