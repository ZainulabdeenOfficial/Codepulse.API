import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCetagorey } from './edit-cetagorey';

describe('EditCetagorey', () => {
  let component: EditCetagorey;
  let fixture: ComponentFixture<EditCetagorey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCetagorey]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCetagorey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
