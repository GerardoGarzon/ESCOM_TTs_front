import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrabajoComponent } from './edit-trabajo.component';

describe('EditTrabajoComponent', () => {
  let component: EditTrabajoComponent;
  let fixture: ComponentFixture<EditTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
