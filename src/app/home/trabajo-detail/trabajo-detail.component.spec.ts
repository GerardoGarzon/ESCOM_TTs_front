import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoDetailComponent } from './trabajo-detail.component';

describe('TrabajoDetailComponent', () => {
  let component: TrabajoDetailComponent;
  let fixture: ComponentFixture<TrabajoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabajoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
