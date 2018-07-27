import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { List } from 'immutable';
import { MatButtonToggleGroup, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { RandomVehicle, RandomVehicleService } from '../../services/random-account.service';

@Component({
  selector: 'ngx-vehicles-grid-list',
  templateUrl: './vehicles-grid-list.component.html',
  styleUrls: ['./vehicles-grid-list.component.scss']
})
export class VehiclesGridListComponent implements OnInit, OnDestroy {
  @ViewChild('gridView') public gridView: MatButtonToggleGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  crumbs = List([
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Grid', link: '/dashboard/vehicles' },
    { name: 'Bike Share' }
  ]);

  vehicleDataSource: MatTableDataSource<Partial<RandomVehicle>>;
  renderData: BehaviorSubject<Partial<RandomVehicle>[]>;
  selection = new SelectionModel<Partial<RandomVehicle>>(false, []);

  constructor(private router: Router, private vehicleService: RandomVehicleService) {}

  ngOnInit() {
    this.vehicleService.getAll().toPromise().then( vehicles => {
      this.vehicleDataSource = new MatTableDataSource<Partial<RandomVehicle>>(vehicles);
      this.vehicleDataSource.paginator = this.paginator;
      this.renderData = this.vehicleDataSource.connect();
    })
  }

  ngOnDestroy() {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.vehicleDataSource.filter = filterValue;
  }

  async onClick(vehicle: Partial<RandomVehicle>) {
    this.selection.toggle(vehicle);
    const _vehicle = await this.vehicleService.getById(vehicle.id.value).toPromise();
    console.log(_vehicle)
  }
}
