import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit , OnDestroy{
  ingresosEgresosSubscription: Subscription;
  ingresosEgresos: IngresoEgreso[] = []
  constructor( private store: Store<AppState>,
                 private _ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
    .subscribe( ({items})=>{
      this.ingresosEgresos = items;
    })
  }

  borrar(ui){
    console.log(ui);
    this._ingresoEgresoService.borrarIngresoEgreso(ui)
        .then(()=>{
          Swal.fire('Borrado', 'Item borrado', 'warning')
        })
        .catch(()=>{
          Swal.fire('Error', 'tuvo un erro al borrador el item', 'error')

        })
  }

  
  ngOnDestroy(){
    this.ingresosEgresosSubscription.unsubscribe();
  }

}
