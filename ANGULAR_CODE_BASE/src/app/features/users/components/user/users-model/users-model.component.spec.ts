import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersModelComponent } from './users-model.component';

describe('UsersModelComponent', () => {
  let component: UsersModelComponent;
  let fixture: ComponentFixture<UsersModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
