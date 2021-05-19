import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy{
  ingresoForm:FormGroup;
  tipo: string = 'ingreso';
  isLoading:boolean= false;
  uiSubscription: Subscription;
  
  constructor( private fb: FormBuilder,
               private _ingresoEgresoService: IngresoEgresoService,                
               private store: Store<AppState>, ) { }

  ngOnInit(): void {
     this.ingresoForm = this.fb.group({
       descripcion: ['', Validators.required],
       monto: ['', Validators.required]
     })

     this.uiSubscription =  this.store.select('ui').subscribe(ui=>{
      this.isLoading = ui.isLoading;
     })
  }
  
  
  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  guardar(){
    this.store.dispatch(isLoading());
    if(this.ingresoForm.invalid) return;
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo)
    this._ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
        .then(()=>{
            this.store.dispatch(stopLoading());
           this.ingresoForm.reset();
          Swal.fire('Registro creado', descripcion, 'success')
        })
        .catch(err=>{
          this.store.dispatch(stopLoading());
          Swal.fire('Error', err.message, 'error')
        })
  }
}
