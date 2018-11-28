import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpeopleinfoComponent } from './editpeopleinfo.component';

describe('EditpeopleinfoComponent', () => {
  let component: EditpeopleinfoComponent;
  let fixture: ComponentFixture<EditpeopleinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpeopleinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpeopleinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
