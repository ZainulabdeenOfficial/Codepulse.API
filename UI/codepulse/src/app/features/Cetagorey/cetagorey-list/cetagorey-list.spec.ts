import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetagoreyListComponent } from './cetagorey-list';

describe('CetagoreyList', () => {
  let component: CetagoreyListComponent;
  let fixture: ComponentFixture<CetagoreyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CetagoreyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CetagoreyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
