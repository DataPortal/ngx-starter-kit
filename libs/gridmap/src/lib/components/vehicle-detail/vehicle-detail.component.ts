import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { fadeAnimation } from '@coord-angular/animations';

@Component({
  selector: 'ngx-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
  animations: [fadeAnimation]
})
export class VehicleDetailComponent implements OnInit, OnDestroy {
  vehicle: Vehicle;
  sub: Subscription;
  animationTrigger$ = new BehaviorSubject<string>('');

  constructor(private vehicleService: VehicleService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.vehicleService.getById(params['id']).subscribe(data => {
        this.animationTrigger$.next(params['id']);
        this.vehicle = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
