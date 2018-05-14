import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInscripAdminComponent } from './page-inscrip-admin.component';

describe('PageInscripAdminComponent', () => {
  let component: PageInscripAdminComponent;
  let fixture: ComponentFixture<PageInscripAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInscripAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInscripAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
