import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentTrabajoComponent } from './add-student-trabajo.component';

describe('AddStudentTrabajoComponent', () => {
  let component: AddStudentTrabajoComponent;
  let fixture: ComponentFixture<AddStudentTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
