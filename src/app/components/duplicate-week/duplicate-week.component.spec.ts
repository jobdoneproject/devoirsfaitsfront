import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateWeekComponent } from './duplicate-week.component';

describe('DuplicateWeekComponent', () => {
  let component: DuplicateWeekComponent;
  let fixture: ComponentFixture<DuplicateWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
