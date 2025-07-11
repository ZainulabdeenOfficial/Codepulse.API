import { TestBed } from '@angular/core/testing';

import { Cetagorey } from './cetagorey';

describe('Cetagorey', () => {
  let service: Cetagorey;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cetagorey);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
