import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreneauComponent } from './page-creneau.component';

describe('PageCreneauComponent', () => {
  let component: PageCreneauComponent;
  let fixture: ComponentFixture<PageCreneauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCreneauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreneauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
