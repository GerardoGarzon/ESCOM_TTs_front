import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswrodResetEmailComponent } from './passwrod-reset-email.component';

describe('PasswrodResetEmailComponent', () => {
  let component: PasswrodResetEmailComponent;
  let fixture: ComponentFixture<PasswrodResetEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswrodResetEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswrodResetEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
