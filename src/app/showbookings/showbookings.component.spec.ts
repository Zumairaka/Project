import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbookingsComponent } from './showbookings.component';

describe('ShowbookingsComponent', () => {
  let component: ShowbookingsComponent;
  let fixture: ComponentFixture<ShowbookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowbookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
