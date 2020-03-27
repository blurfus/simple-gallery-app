import { IMetadata } from 'app/shared/model/metadata.model';
import { IAuthor } from 'app/shared/model/author.model';

export interface IResource {
  id?: number;
  url?: string;
  isFavourite?: boolean;
  metadata?: IMetadata;
  authors?: IAuthor[];
  author?: IAuthor;
}

export class Resource implements IResource {
  constructor(
    public id?: number,
    public url?: string,
    public isFavourite?: boolean,
    public metadata?: IMetadata,
    public authors?: IAuthor[],
    public author?: IAuthor
  ) {
    this.isFavourite = this.isFavourite || false;
  }
}
