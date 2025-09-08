import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngindataPageComponent } from './engindata-page.component';

describe('EngindataPageComponent', () => {
  let component: EngindataPageComponent;
  let fixture: ComponentFixture<EngindataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngindataPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngindataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
