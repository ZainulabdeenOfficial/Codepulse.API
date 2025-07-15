import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostList } from './blogpost-list';

describe('BlogpostList', () => {
  let component: BlogpostList;
  let fixture: ComponentFixture<BlogpostList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogpostList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogpostList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
