import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoCardComponent } from './trabajo-card.component';

describe('TrabajoCardComponent', () => {
  let component: TrabajoCardComponent;
  let fixture: ComponentFixture<TrabajoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabajoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
