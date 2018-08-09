import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '@coord-angular/shared';
import { Vehicle } from '../models/vehicle.model';
import { environment } from '@env/environment';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class VehicleService extends EntityService<Vehicle> {
  // Optionally overwrite baseUrl
  public baseUrl = environment.API_BASE_URL;

  readonly entityPath = 'vehicles';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
