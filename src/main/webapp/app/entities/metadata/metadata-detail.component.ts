import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMetadata } from 'app/shared/model/metadata.model';

@Component({
  selector: 'jhi-metadata-detail',
  templateUrl: './metadata-detail.component.html'
})
export class MetadataDetailComponent implements OnInit {
  metadata: IMetadata | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metadata }) => (this.metadata = metadata));
  }

  previousState(): void {
    window.history.back();
  }
}
