import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { OrdenIngresosPipe } from '../pipes/orden-ingresos.pipe';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module'

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresosPipe
  ],
  imports: [
    CommonModule,
    ChartsModule,    
    ReactiveFormsModule,
    // AppRoutingModule,
    SharedModule,
    DashboardRoutesModule,
  ]
})
export class IngresoEgresoModule { }
