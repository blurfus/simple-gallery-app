import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMetadata, Metadata } from 'app/shared/model/metadata.model';
import { MetadataService } from './metadata.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';

@Component({
  selector: 'jhi-metadata-update',
  templateUrl: './metadata-update.component.html'
})
export class MetadataUpdateComponent implements OnInit {
  isSaving = false;
  locations: ILocation[] = [];

  editForm = this.fb.group({
    id: [],
    createdDate: [],
    title: [],
    comment: [],
    location: []
  });

  constructor(
    protected metadataService: MetadataService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ metadata }) => {
      if (!metadata.id) {
        const today = moment().startOf('day');
        metadata.createdDate = today;
      }

      this.updateForm(metadata);

      this.locationService
        .query({ filter: 'metadata-is-null' })
        .pipe(
          map((res: HttpResponse<ILocation[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ILocation[]) => {
          if (!metadata.location || !metadata.location.id) {
            this.locations = resBody;
          } else {
            this.locationService
              .find(metadata.location.id)
              .pipe(
                map((subRes: HttpResponse<ILocation>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILocation[]) => (this.locations = concatRes));
          }
        });
    });
  }

  updateForm(metadata: IMetadata): void {
    this.editForm.patchValue({
      id: metadata.id,
      createdDate: metadata.createdDate ? metadata.createdDate.format(DATE_TIME_FORMAT) : null,
      title: metadata.title,
      comment: metadata.comment,
      location: metadata.location
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const metadata = this.createFromForm();
    if (metadata.id !== undefined) {
      this.subscribeToSaveResponse(this.metadataService.update(metadata));
    } else {
      this.subscribeToSaveResponse(this.metadataService.create(metadata));
    }
  }

  private createFromForm(): IMetadata {
    return {
      ...new Metadata(),
      id: this.editForm.get(['id'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      title: this.editForm.get(['title'])!.value,
      comment: this.editForm.get(['comment'])!.value,
      location: this.editForm.get(['location'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetadata>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ILocation): any {
    return item.id;
  }
}
