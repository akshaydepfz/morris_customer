import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmainproductComponent } from './submainproduct.component';

describe('SubmainproductComponent', () => {
  let component: SubmainproductComponent;
  let fixture: ComponentFixture<SubmainproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmainproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmainproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
