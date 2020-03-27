import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GalleryAppTestModule } from '../../../test.module';
import { MetadataDetailComponent } from 'app/entities/metadata/metadata-detail.component';
import { Metadata } from 'app/shared/model/metadata.model';

describe('Component Tests', () => {
  describe('Metadata Management Detail Component', () => {
    let comp: MetadataDetailComponent;
    let fixture: ComponentFixture<MetadataDetailComponent>;
    const route = ({ data: of({ metadata: new Metadata(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GalleryAppTestModule],
        declarations: [MetadataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MetadataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MetadataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load metadata on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.metadata).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
