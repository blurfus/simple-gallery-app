import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetadata } from 'app/shared/model/metadata.model';
import { MetadataService } from './metadata.service';

@Component({
  templateUrl: './metadata-delete-dialog.component.html'
})
export class MetadataDeleteDialogComponent {
  metadata?: IMetadata;

  constructor(protected metadataService: MetadataService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.metadataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('metadataListModification');
      this.activeModal.close();
    });
  }
}
