import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfesorLinksComponent } from './update-profesor-links.component';

describe('UpdateProfesorLinksComponent', () => {
  let component: UpdateProfesorLinksComponent;
  let fixture: ComponentFixture<UpdateProfesorLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfesorLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfesorLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
