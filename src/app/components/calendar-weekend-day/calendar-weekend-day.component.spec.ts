import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeekendDayComponent } from './calendar-weekend-day.component';

describe('CalendarWeekendDayComponent', () => {
  let component: CalendarWeekendDayComponent;
  let fixture: ComponentFixture<CalendarWeekendDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarWeekendDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarWeekendDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
