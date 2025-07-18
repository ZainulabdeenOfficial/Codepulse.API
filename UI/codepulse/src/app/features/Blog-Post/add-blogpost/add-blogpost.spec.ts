import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogpost } from './add-blogpost';

describe('AddBlogpost', () => {
  let component: AddBlogpost;
  let fixture: ComponentFixture<AddBlogpost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBlogpost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogpost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
