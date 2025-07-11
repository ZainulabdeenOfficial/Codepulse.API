import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategorey } from './add-categorey';

describe('AddCategorey', () => {
  let component: AddCategorey;
  let fixture: ComponentFixture<AddCategorey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategorey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategorey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
