import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDashboardComponent } from './container-dashboard.component';

describe('ContainerDashboardComponent', () => {
  let component: ContainerDashboardComponent;
  let fixture: ComponentFixture<ContainerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
