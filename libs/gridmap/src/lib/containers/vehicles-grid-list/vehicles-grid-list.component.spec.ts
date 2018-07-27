import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesGridListComponent } from './vehicles-grid-list.component';

describe('VehiclesGridListComponent', () => {
  let component: VehiclesGridListComponent;
  let fixture: ComponentFixture<VehiclesGridListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesGridListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
