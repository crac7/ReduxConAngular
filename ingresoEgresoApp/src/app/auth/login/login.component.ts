import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm:FormGroup;
  cargando = false;
  uiSubscription: Subscription;
  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })

    this.uiSubscription =  this.store.select('ui').subscribe(ui=>{
       this.cargando = ui.isLoading;
    })
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  login(){
    if(this.loginForm.invalid)  return;
    this.store.dispatch(isLoading());
    const { email, password } = this.loginForm.value;
    this.authService.loginUsuario(email, password)
      .then(()=>{
         this.store.dispatch(stopLoading());
         this.router.navigate(['/'])
      })
      .catch((err)=>{
         this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
  }

}
