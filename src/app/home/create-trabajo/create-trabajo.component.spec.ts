import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrabajoComponent } from './create-trabajo.component';

describe('CreateTrabajoComponent', () => {
  let component: CreateTrabajoComponent;
  let fixture: ComponentFixture<CreateTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
