import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrabajoComponent } from './update-trabajo.component';

describe('UpdateTrabajoComponent', () => {
  let component: UpdateTrabajoComponent;
  let fixture: ComponentFixture<UpdateTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
