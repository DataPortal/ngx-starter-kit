import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@coord-angular/shared';
import { AppConfirmModule } from '@coord-angular/app-confirm';
import { DraggableModule } from '@coord-angular/draggable';
import { NgxPipesModule } from '@coord-angular/ngx-pipes';
import { AccountsGridListComponent } from './containers/accounts-grid-list/accounts-grid-list.component';
import { AccountsTableComponent } from './containers/accounts-table/accounts-table.component';
import { AccountService } from './services/account.service';
import { RandomAccountService } from './services/random-account.service';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountEditComponent } from './components/account-edit/account-edit.component';

@NgModule({
  imports: [
    SharedModule,
    DraggableModule,
    AppConfirmModule,
    NgxPipesModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      { path: '', redirectTo: 'crud-table', pathMatch: 'full', data: { animation: 'grid' } },
      { path: 'crud-table', component: AccountsTableComponent, data: { animation: 'accounts-table' },
        children: [
          { path: ':id', component: AccountDetailComponent, data: { animation: 'account-detail' } },
        ],
      },
      { path: 'grid-list', component: AccountsGridListComponent, data: { animation: 'accounts-grid-list' } }
    ])
  ],
  declarations: [AccountsTableComponent, AccountsGridListComponent, AccountDetailComponent, AccountEditComponent],
  entryComponents: [AccountEditComponent],
  providers: [AccountService, RandomAccountService]
})
export class GridModule {}
