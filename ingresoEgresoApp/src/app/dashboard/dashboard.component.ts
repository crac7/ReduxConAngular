import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { AuthService } from '../services/auth.service';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import  * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  uiSubscription: Subscription;
  ingresoEgresosSubscription: Subscription;
  constructor(private authService: AuthService,        
              private store: Store<AppState>,
              private _ingresoEgresoService:IngresoEgresoService ) {
                this.authService.initAuthListener(); 
              }

  ngOnInit(): void {
   this.uiSubscription = this.store.select('user')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe(({user}) =>{
      this.ingresoEgresosSubscription =  this._ingresoEgresoService.initIngresoEgreso(user.uid)
            .subscribe( ingresoEgreeesosFB=>{
          this.store.dispatch(ingresoEgresoActions.setItems({items:ingresoEgreeesosFB}))
            })
    })
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
    this.ingresoEgresosSubscription.unsubscribe();
  }

}
