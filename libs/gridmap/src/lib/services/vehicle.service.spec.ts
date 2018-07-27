import { TestBed, inject } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Vehicle1Service]
    });
  });

  it('should be created', inject([Vehicle1Service], (service: Vehicle1Service) => {
    expect(service).toBeTruthy();
  }));
});
