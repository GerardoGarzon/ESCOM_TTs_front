import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrabajoComponent } from './search-trabajo.component';

describe('SearchTrabajoComponent', () => {
  let component: SearchTrabajoComponent;
  let fixture: ComponentFixture<SearchTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
