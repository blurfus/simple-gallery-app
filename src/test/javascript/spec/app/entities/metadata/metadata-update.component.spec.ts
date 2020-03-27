import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GalleryAppTestModule } from '../../../test.module';
import { MetadataUpdateComponent } from 'app/entities/metadata/metadata-update.component';
import { MetadataService } from 'app/entities/metadata/metadata.service';
import { Metadata } from 'app/shared/model/metadata.model';

describe('Component Tests', () => {
  describe('Metadata Management Update Component', () => {
    let comp: MetadataUpdateComponent;
    let fixture: ComponentFixture<MetadataUpdateComponent>;
    let service: MetadataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GalleryAppTestModule],
        declarations: [MetadataUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MetadataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetadataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetadataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Metadata(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Metadata();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
