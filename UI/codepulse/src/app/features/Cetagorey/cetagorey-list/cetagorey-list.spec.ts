import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetagoreyList } from './cetagorey-list';

describe('CetagoreyList', () => {
  let component: CetagoreyList;
  let fixture: ComponentFixture<CetagoreyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CetagoreyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CetagoreyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
