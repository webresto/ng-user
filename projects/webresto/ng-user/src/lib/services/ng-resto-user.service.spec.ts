import { TestBed, inject } from '@angular/core/testing';

import { NgRestoUserService } from './ng-resto-user.service';

describe('NgRestoUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgRestoUserService]
    });
  });

  it('should be created', inject([NgRestoUserService], (service: NgRestoUserService) => {
    expect(service).toBeTruthy();
  }));
});
