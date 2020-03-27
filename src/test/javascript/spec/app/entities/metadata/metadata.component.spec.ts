import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GalleryAppTestModule } from '../../../test.module';
import { MetadataComponent } from 'app/entities/metadata/metadata.component';
import { MetadataService } from 'app/entities/metadata/metadata.service';
import { Metadata } from 'app/shared/model/metadata.model';

describe('Component Tests', () => {
  describe('Metadata Management Component', () => {
    let comp: MetadataComponent;
    let fixture: ComponentFixture<MetadataComponent>;
    let service: MetadataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GalleryAppTestModule],
        declarations: [MetadataComponent]
      })
        .overrideTemplate(MetadataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MetadataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MetadataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Metadata(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.metadata && comp.metadata[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
