import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessegeComponent } from './error-messege.component';

describe('ErrorMessegeComponent', () => {
  let component: ErrorMessegeComponent;
  let fixture: ComponentFixture<ErrorMessegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMessegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
