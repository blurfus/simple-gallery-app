import { IResource } from 'app/shared/model/resource.model';

export interface IAuthor {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  resources?: IResource[];
  resource?: IResource;
}

export class Author implements IAuthor {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public resources?: IResource[],
    public resource?: IResource
  ) {}
}
