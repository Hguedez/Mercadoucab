import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CANSOComponent } from './canso.component';

describe('CANSOComponent', () => {
  let component: CANSOComponent;
  let fixture: ComponentFixture<CANSOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CANSOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CANSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
