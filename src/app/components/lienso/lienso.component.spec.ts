import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiensoComponent } from './lienso.component';

describe('LiensoComponent', () => {
  let component: LiensoComponent;
  let fixture: ComponentFixture<LiensoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiensoComponent]
    });
    fixture = TestBed.createComponent(LiensoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
