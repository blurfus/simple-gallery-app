import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GalleryAppSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [GalleryAppSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class GalleryAppHomeModule {}
