import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderModalComponent } from './builder-modal.component';

describe('BuilderModalComponent', () => {
  let component: BuilderModalComponent;
  let fixture: ComponentFixture<BuilderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
