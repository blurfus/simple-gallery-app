import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMetadata, Metadata } from 'app/shared/model/metadata.model';
import { MetadataService } from './metadata.service';
import { MetadataComponent } from './metadata.component';
import { MetadataDetailComponent } from './metadata-detail.component';
import { MetadataUpdateComponent } from './metadata-update.component';

@Injectable({ providedIn: 'root' })
export class MetadataResolve implements Resolve<IMetadata> {
  constructor(private service: MetadataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMetadata> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((metadata: HttpResponse<Metadata>) => {
          if (metadata.body) {
            return of(metadata.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Metadata());
  }
}

export const metadataRoute: Routes = [
  {
    path: '',
    component: MetadataComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'galleryApp.metadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MetadataDetailComponent,
    resolve: {
      metadata: MetadataResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'galleryApp.metadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MetadataUpdateComponent,
    resolve: {
      metadata: MetadataResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'galleryApp.metadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MetadataUpdateComponent,
    resolve: {
      metadata: MetadataResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'galleryApp.metadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
