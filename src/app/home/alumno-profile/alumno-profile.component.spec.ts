import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoProfileComponent } from './alumno-profile.component';

describe('AlumnoProfileComponent', () => {
  let component: AlumnoProfileComponent;
  let fixture: ComponentFixture<AlumnoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
