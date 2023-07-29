import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaComponent } from './materia.component';

describe('MateriaComponent', () => {
  let component: MateriaComponent;
  let fixture: ComponentFixture<MateriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MateriaComponent]
    });
    fixture = TestBed.createComponent(MateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
