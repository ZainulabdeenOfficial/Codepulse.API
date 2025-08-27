import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsDeatiles } from './blogs-deatiles';

describe('BlogsDeatiles', () => {
  let component: BlogsDeatiles;
  let fixture: ComponentFixture<BlogsDeatiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsDeatiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsDeatiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
