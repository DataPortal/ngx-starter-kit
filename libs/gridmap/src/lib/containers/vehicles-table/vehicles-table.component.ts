import { Component } from '@angular/core';

import { Vehicle, Address, Gender } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { EntitiesComponent, EntityColumnDef } from '@coord-angular/shared';
import { AppConfirmService } from '@coord-angular/app-confirm';
import { MatDialog, MatSnackBar } from '@angular/material';
import { catchError, tap, concatMap, filter, map, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { VehicleEditComponent } from '../../components/vehicle-edit/vehicle-edit.component';
import * as moment from 'moment';
import { List } from 'immutable';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  selector: 'ngx-vehicles-table',
  templateUrl: '../../../../../shared/src/lib/containers/entity/entity.component.html',
  styleUrls: ['../../../../../shared/src/lib/containers/entity/entity.component.scss']
})
export class VehiclesTableComponent extends EntitiesComponent<Vehicle, VehicleService> {
  crumbs = List([
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Grid', link: '/dashboard/grid' },
    { name: 'CRUD Table' }
  ]);

  // readonly columns = [ { property: 'id'},{ property: 'name'},{ property: 'gender'},{ property: 'age'} ] as EntityColumnDef<Vehicle>[]
  readonly columns = [
    // prettier-ignore
    new EntityColumnDef<Vehicle>({ property: 'userId',  header: 'No.',    displayFn: (entity) => `${entity.id}` }),
    // prettier-ignore
    new EntityColumnDef<Vehicle>({ property: 'Name',    header: 'Name',   displayFn: (entity) => `${entity.first_name} ${entity.last_name}` }),
    new EntityColumnDef<Vehicle>({ property: 'gender', header: 'Gender' }),
    // prettier-ignore
    new EntityColumnDef<Vehicle>({ property: 'dob',     header: 'DoB',    displayFn: (entity) => `${moment(entity.dob).format('LL')}` }),
    new EntityColumnDef<Vehicle>({ property: 'city', header: 'City', displayFn: entity => `${entity.address.city}` }),
    new EntityColumnDef<Vehicle>({ property: 'state', header: 'State', displayFn: entity => `${entity.address.state}` })
  ] as EntityColumnDef<Vehicle>[];

  // optional
  readonly showActionColumn = true;
  readonly showColumnFilter = true;
  readonly showToolbar = true;

  readonly formRef = VehicleEditComponent;

  constructor(
    vehicleService: VehicleService,
    private store: Store,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private confirmService: AppConfirmService
  ) {
    super(vehicleService);
  }

  // optional
  delete(item: Vehicle) {
    return this.confirmService.confirm('Confirm', `Delete ${item.first_name} ${item.last_name}?`).pipe(
      filter(confirmed => confirmed === true),
      mergeMap(_ => super.delete(item)),
      tap(_ => {
        this.snack.open('Member Deleted!', 'OK', { duration: 5000 });
        this.store.dispatch(new Navigate([`/dashboard/grid/crud-table`]));
      }),
      catchError(error => {
        this.snack.open(error, 'OK', { duration: 10000 });
        return throwError('Ignore Me!');
      })
    );
  }

  // required to override
  getNewEntity(): Vehicle {
    const entity = new Vehicle();
    entity.address = new Address();
    return entity;
  }

  // optional
  showDetails(entity: Vehicle) {
    if(entity) {
      this.store.dispatch(new Navigate([`/dashboard/grid/crud-table/${entity.id}`]));
    } else {
      this.store.dispatch(new Navigate(['/dashboard/grid/crud-table']));
    }
  }

  // filterPredicate(entity: Vehicle, _filter: string): boolean  {
  //   return entity.first_name.indexOf(_filter) !== -1;
  // }

  /**
   *  openPopUp() is used in entity.component.html
   *  if you want different implantation (e.g., add-new-line instead of popup, inline edit)
   *  make a copy of entity.component.html as <entity>.component.html and implement your own add/edit logic.
   **/
  openPopUp(entity: Vehicle) {
    let isNew = false;
    if (!entity) {
      isNew = true;
      entity = this.getNewEntity();
    }
    const title = isNew ? 'Add Member' : 'Update Member';

    const dialogRef = this.dialog.open(this.formRef, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: entity }
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(res => res !== false),
        // tap(res => console.log(res)),
        map((res: Vehicle) => {
          if (!isNew) res.id = entity.id;
          return res;
        }),
        concatMap((res: Vehicle) => super.updateOrCreate(res, isNew))
      )
      .subscribe(
        _ => {
          this.snack.open(isNew ? 'Member Created!' : 'Member Updated!', 'OK', { duration: 5000 })
          this.store.dispatch(new Navigate([`/dashboard/grid/crud-table`]))
        },
        error => this.snack.open(error, 'OK', { duration: 10000 })
      );
  }
}
