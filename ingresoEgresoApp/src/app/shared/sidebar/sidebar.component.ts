import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre:string=""
  uiSubscription: Subscription;
  constructor(
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>,) { }

  ngOnInit(): void {
   this.uiSubscription = this.store.select('user')
   .pipe(
     filter(({user})=>user !== null)
   )
    .subscribe( ({user})=>{
        this.nombre = user.nombre
    })
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  
  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/login'])
    })
  }
}
