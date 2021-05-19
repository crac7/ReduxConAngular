import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.acttions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   userSubscription : Subscription ;
   private _user:Usuario;
  constructor( public auth: AngularFireAuth,
                private firestore: AngularFirestore,
                private store: Store<AppState>) { }
  
  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      if(fuser){
       this.userSubscription =   this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (firestoreUser: any) =>{
          const user  =  Usuario.fromFribase(firestoreUser);
          this._user = user;
          this.store.dispatch(setUser({user}))
        } )      
      } else{
           this._user = null;
          this.store.dispatch(unSetUser())
          this.userSubscription.unsubscribe();
          this.store.dispatch(unSetItems())
       
      }
    })
  }

  crearUsuario(nombre:string, email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then(({user})=>{
      const newUser = new Usuario(user.uid, nombre, email)
      return  this.firestore.doc(`${user.uid}/usuario`).set({...newUser})
    })
  }

  get user(){
    return this._user;
  }

  loginUsuario(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
   return this.auth.signOut();
  }
   isAuth(){
     return this.auth.authState.pipe(
       map( fUser=> fUser!=null)
     )
   }
}
