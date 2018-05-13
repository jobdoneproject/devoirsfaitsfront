import { TestBed, inject } from '@angular/core/testing';

import { NavBarLinksService } from './nav-bar-links.service';

describe('NavBarLinksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavBarLinksService]
    });
  });

  it('should be created', inject([NavBarLinksService], (service: NavBarLinksService) => {
    expect(service).toBeTruthy();
  }));
});
