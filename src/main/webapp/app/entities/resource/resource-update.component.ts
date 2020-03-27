import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IResource, Resource } from 'app/shared/model/resource.model';
import { ResourceService } from './resource.service';
import { IMetadata } from 'app/shared/model/metadata.model';
import { MetadataService } from 'app/entities/metadata/metadata.service';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author/author.service';

type SelectableEntity = IMetadata | IAuthor;

@Component({
  selector: 'jhi-resource-update',
  templateUrl: './resource-update.component.html'
})
export class ResourceUpdateComponent implements OnInit {
  isSaving = false;
  metadata: IMetadata[] = [];
  authors: IAuthor[] = [];

  editForm = this.fb.group({
    id: [],
    url: [],
    isFavourite: [],
    metadata: [],
    author: []
  });

  constructor(
    protected resourceService: ResourceService,
    protected metadataService: MetadataService,
    protected authorService: AuthorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resource }) => {
      this.updateForm(resource);

      this.metadataService
        .query({ filter: 'resource-is-null' })
        .pipe(
          map((res: HttpResponse<IMetadata[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMetadata[]) => {
          if (!resource.metadata || !resource.metadata.id) {
            this.metadata = resBody;
          } else {
            this.metadataService
              .find(resource.metadata.id)
              .pipe(
                map((subRes: HttpResponse<IMetadata>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMetadata[]) => (this.metadata = concatRes));
          }
        });

      this.authorService.query().subscribe((res: HttpResponse<IAuthor[]>) => (this.authors = res.body || []));
    });
  }

  updateForm(resource: IResource): void {
    this.editForm.patchValue({
      id: resource.id,
      url: resource.url,
      isFavourite: resource.isFavourite,
      metadata: resource.metadata,
      author: resource.author
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resource = this.createFromForm();
    if (resource.id !== undefined) {
      this.subscribeToSaveResponse(this.resourceService.update(resource));
    } else {
      this.subscribeToSaveResponse(this.resourceService.create(resource));
    }
  }

  private createFromForm(): IResource {
    return {
      ...new Resource(),
      id: this.editForm.get(['id'])!.value,
      url: this.editForm.get(['url'])!.value,
      isFavourite: this.editForm.get(['isFavourite'])!.value,
      metadata: this.editForm.get(['metadata'])!.value,
      author: this.editForm.get(['author'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResource>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
