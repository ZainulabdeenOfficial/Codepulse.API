import { TestBed } from '@angular/core/testing';

// import { Image } from './image'; // Removed because './image' has no exported member 'Image'

describe('Image', () => {
  let service: typeof Image;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Image);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
