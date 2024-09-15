import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu1ModalComponent } from './menu1-modal.component';

describe('Menu1ModalComponent', () => {
  let component: Menu1ModalComponent;
  let fixture: ComponentFixture<Menu1ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Menu1ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Menu1ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
