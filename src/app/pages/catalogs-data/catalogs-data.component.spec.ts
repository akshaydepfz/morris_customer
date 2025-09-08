import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsDataComponent } from './catalogs-data.component';

describe('CatalogsDataComponent', () => {
  let component: CatalogsDataComponent;
  let fixture: ComponentFixture<CatalogsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
