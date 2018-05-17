import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSidebarComponent } from './container-sidebar.component';

describe('ContainerSidebarComponent', () => {
  let component: ContainerSidebarComponent;
  let fixture: ComponentFixture<ContainerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
