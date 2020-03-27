import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';

export interface IMetadata {
  id?: number;
  createdDate?: Moment;
  title?: string;
  comment?: string;
  location?: ILocation;
}

export class Metadata implements IMetadata {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public title?: string,
    public comment?: string,
    public location?: ILocation
  ) {}
}
