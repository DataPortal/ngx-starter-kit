import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@coord-angular/shared';

<<<<<<< HEAD
import { AuthGuard } from '@coord-angular/auth';
import { ChatBotModule } from '@coord-angular/chat-bot';
=======
import { AuthGuard } from '@coord-angular/auth';
import { ChatBoxModule } from '@coord-angular/chat-box';
>>>>>>> upstream/master

import { DashboardLayoutComponent } from './containers/dashboard-layout/dashboard-layout.component';
import { OverviewComponent } from './containers/overview/overview.component';
import { RainbowComponent } from './components/rainbow/rainbow.component';
<<<<<<< HEAD
import { QuickpanelModule } from '@coord-angular/quickpanel';
import { ToolbarModule } from '@coord-angular/toolbar';
import { SidenavModule } from '@coord-angular/sidenav';
=======
import { QuickpanelModule } from '@coord-angular/quickpanel';
import { ToolbarModule } from '@coord-angular/toolbar';
import { SidenavModule } from '@coord-angular/sidenav';
import { environment } from '@env/environment';
>>>>>>> upstream/master

@NgModule({
  imports: [
    SharedModule,
    SidenavModule,
    ToolbarModule,
    QuickpanelModule,
    // FIXME: AOT not working with environment.xyz
    ChatBoxModule.forRoot({
      accessToken: '37808bf14a19406cbe2a50cfd1332dd3' // environment.dialogFlow.apiToken
    }),
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
      {
        path: '',
        component: DashboardLayoutComponent,
        canActivate: [AuthGuard],
        data: { animation: 'dashboard' },
        children: [
          {
            path: 'overview',
            component: OverviewComponent,
            data: { animation: 'overview' }
          },
          {
            path: '',
            loadChildren: '@coord-angular/widgets#WidgetsModule',
            data: { animation: 'overview' }
          },
          {
            path: 'grid',
            loadChildren: '@coord-angular/grid#GridModule',
            data: { animation: 'grid' }
          },
          {
            path: 'gridmap',
            loadChildren: '@coord-angular/gridmap#GridMapModule',
            data: { animation: 'gridmap' }
          },
          {
            path: 'experiments',
            loadChildren: '@coord-angular/experiments#ExperimentsModule',
            data: { animation: 'experiments' }
          }
        ]
      }
    ])
  ],
  declarations: [DashboardLayoutComponent, OverviewComponent, RainbowComponent]
})
export class DashboardModule {}
