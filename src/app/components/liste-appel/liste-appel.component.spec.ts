import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAppelComponent } from './liste-appel.component';

describe('ListeAppelComponent', () => {
  let component: ListeAppelComponent;
  let fixture: ComponentFixture<ListeAppelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAppelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
