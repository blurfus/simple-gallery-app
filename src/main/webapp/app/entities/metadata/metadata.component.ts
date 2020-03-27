import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMetadata } from 'app/shared/model/metadata.model';
import { MetadataService } from './metadata.service';
import { MetadataDeleteDialogComponent } from './metadata-delete-dialog.component';

@Component({
  selector: 'jhi-metadata',
  templateUrl: './metadata.component.html'
})
export class MetadataComponent implements OnInit, OnDestroy {
  metadata?: IMetadata[];
  eventSubscriber?: Subscription;

  constructor(protected metadataService: MetadataService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.metadataService.query().subscribe((res: HttpResponse<IMetadata[]>) => (this.metadata = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMetadata();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMetadata): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMetadata(): void {
    this.eventSubscriber = this.eventManager.subscribe('metadataListModification', () => this.loadAll());
  }

  delete(metadata: IMetadata): void {
    const modalRef = this.modalService.open(MetadataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.metadata = metadata;
  }
}
