import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelector } from './image-selector';

describe('ImageSelector', () => {
  let component: ImageSelector;
  let fixture: ComponentFixture<ImageSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
