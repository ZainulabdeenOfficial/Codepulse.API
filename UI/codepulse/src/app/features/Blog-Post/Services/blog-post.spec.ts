import { TestBed } from '@angular/core/testing';

import { BlogPost } from './blog-post';

describe('BlogPost', () => {
  let service: BlogPost;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogPost);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
