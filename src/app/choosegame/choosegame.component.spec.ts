import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosegameComponent } from './choosegame.component';

describe('ChoosegameComponent', () => {
  let component: ChoosegameComponent;
  let fixture: ComponentFixture<ChoosegameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosegameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
