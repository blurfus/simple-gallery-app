import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GalleryAppSharedModule } from 'app/shared/shared.module';
import { ResourceComponent } from './resource.component';
import { ResourceDetailComponent } from './resource-detail.component';
import { ResourceUpdateComponent } from './resource-update.component';
import { ResourceDeleteDialogComponent } from './resource-delete-dialog.component';
import { resourceRoute } from './resource.route';

@NgModule({
  imports: [GalleryAppSharedModule, RouterModule.forChild(resourceRoute)],
  declarations: [ResourceComponent, ResourceDetailComponent, ResourceUpdateComponent, ResourceDeleteDialogComponent],
  entryComponents: [ResourceDeleteDialogComponent]
})
export class GalleryAppResourceModule {}
