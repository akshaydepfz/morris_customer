import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginDetailComponent } from './engin-detail.component';

describe('EnginDetailComponent', () => {
  let component: EnginDetailComponent;
  let fixture: ComponentFixture<EnginDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnginDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnginDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
