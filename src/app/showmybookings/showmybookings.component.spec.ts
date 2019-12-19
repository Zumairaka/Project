import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmybookingsComponent } from './showmybookings.component';

describe('ShowmybookingsComponent', () => {
  let component: ShowmybookingsComponent;
  let fixture: ComponentFixture<ShowmybookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowmybookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowmybookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
