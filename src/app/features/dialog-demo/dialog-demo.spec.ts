import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDemo } from './dialog-demo';

describe('DialogDemo', () => {
  let component: DialogDemo;
  let fixture: ComponentFixture<DialogDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
