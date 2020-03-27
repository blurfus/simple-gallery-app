import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMetadata } from 'app/shared/model/metadata.model';

type EntityResponseType = HttpResponse<IMetadata>;
type EntityArrayResponseType = HttpResponse<IMetadata[]>;

@Injectable({ providedIn: 'root' })
export class MetadataService {
  public resourceUrl = SERVER_API_URL + 'api/metadata';

  constructor(protected http: HttpClient) {}

  create(metadata: IMetadata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(metadata);
    return this.http
      .post<IMetadata>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(metadata: IMetadata): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(metadata);
    return this.http
      .put<IMetadata>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMetadata>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMetadata[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(metadata: IMetadata): IMetadata {
    const copy: IMetadata = Object.assign({}, metadata, {
      createdDate: metadata.createdDate && metadata.createdDate.isValid() ? metadata.createdDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((metadata: IMetadata) => {
        metadata.createdDate = metadata.createdDate ? moment(metadata.createdDate) : undefined;
      });
    }
    return res;
  }
}
