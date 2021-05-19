import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs/internal/Subscription';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;
  constructor( private fb: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private store: Store<AppState>,) { }

  ngOnInit(): void {
    this.registerForm = this. fb.group({
      nombre:['', Validators.required],
      correo:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
    this.uiSubscription =  this.store.select('ui').subscribe(ui=>{
      this.cargando = ui.isLoading;
   })
  }
  
  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  crearUsuario(){
    if(this.registerForm.invalid){
      return;
    }
    // Swal.fire({
    //   title: 'Espere porfavor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })
    this.store.dispatch(isLoading());
    const { nombre , correo, password } = this.registerForm.value;
    this.authService.crearUsuario(nombre, correo, password)
    .then(credenciales=>{
      // Swal.close();
      this.store.dispatch(stopLoading());
      this.router.navigate(['/']);
    })
    .catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    })
    // authService
  }

}
