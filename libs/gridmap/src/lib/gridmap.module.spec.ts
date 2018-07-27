import { async, TestBed } from '@angular/core/testing';
import { GridMapModule } from './gridmap.module';

describe('GridMapModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GridMapModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GridMapModule).toBeDefined();
  });
});
