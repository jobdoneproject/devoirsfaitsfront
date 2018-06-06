import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportElevesComponent } from './import-eleves.component';

describe('ImportElevesComponent', () => {
  let component: ImportElevesComponent;
  let fixture: ComponentFixture<ImportElevesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportElevesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
