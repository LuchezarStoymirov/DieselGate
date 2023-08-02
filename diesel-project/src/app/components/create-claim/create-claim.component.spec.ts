import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClaimComponent } from './create-claim.component';

describe('CreateClaimComponent', () => {
  let component: CreateClaimComponent;
  let fixture: ComponentFixture<CreateClaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateClaimComponent]
    });
    fixture = TestBed.createComponent(CreateClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
