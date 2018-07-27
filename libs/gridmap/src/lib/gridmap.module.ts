import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { SharedModule } from '@ngx-starter-kit/shared';
import { AppConfirmModule } from '@ngx-starter-kit/app-confirm';
import { DraggableModule } from '@ngx-starter-kit/draggable';
import { NgxPipesModule } from '@ngx-starter-kit/ngx-pipes';
import { VehiclesGridListComponent } from './containers/vehicles-grid-list/vehicles-grid-list.component';
import { VehiclesTableComponent } from './containers/vehicles-table/vehicles-table.component';
import { VehicleService } from './services/vehicle.service';
import { RandomVehicleService } from './services/random-account.service';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';

@NgModule({
  imports: [
    SharedModule,
    DraggableModule,
    AppConfirmModule,
    NgxPipesModule,
    MomentModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      { path: '', redirectTo: 'crud-table', pathMatch: 'full', data: { animation: 'gridmap' } },
      { path: 'crud-table', component: VehiclesTableComponent, data: { animation: 'vehicles-table' },
        children: [
          { path: ':id', component: VehicleDetailComponent, data: { animation: 'vehicle-detail' } },
        ],
      },
      { path: 'grid-list', component: VehiclesGridListComponent, data: { animation: 'vehicles-grid-list' } }
    ])
  ],
  declarations: [VehiclesTableComponent, VehiclesGridListComponent, VehicleDetailComponent, VehicleEditComponent],
  entryComponents: [VehicleEditComponent],
  providers: [VehicleService, RandomVehicleService]
})
export class GridMapModule {}
