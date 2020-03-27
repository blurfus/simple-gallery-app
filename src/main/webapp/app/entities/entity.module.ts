import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'resource',
        loadChildren: () => import('./resource/resource.module').then(m => m.GalleryAppResourceModule)
      },
      {
        path: 'metadata',
        loadChildren: () => import('./metadata/metadata.module').then(m => m.GalleryAppMetadataModule)
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.GalleryAppAuthorModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.GalleryAppLocationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GalleryAppEntityModule {}
