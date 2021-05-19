import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
              private authService:AuthService) { }
  
  initIngresoEgreso(uid:string){
    return  this.firestore
                .collection(`${uid}/ingresos-egresos/items`)
                .snapshotChanges()
                .pipe(
                  map( snapshot=>{
                    return snapshot.map(doc=>{
                      const data:any =  doc.payload.doc.data()

                      return {
                        ui: doc.payload.doc.id,
                        ...data

                      }
                    })
                  })
                )
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const uid = this.authService.user.uid;

    delete ingresoEgreso.uid;
  return  this.firestore.doc(`${uid}/ingresos-egresos`)
        .collection('items')
        .add({ ...ingresoEgreso })

  }

  borrarIngresoEgreso(uidItem:string){
    const uid = this.authService.user.uid;
     return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }

}
