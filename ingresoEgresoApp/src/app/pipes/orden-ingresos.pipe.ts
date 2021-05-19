import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresos'
})
export class OrdenIngresosPipe implements PipeTransform {

  transform(items:IngresoEgreso[]): IngresoEgreso[] {   
    console.log(items); 
    if(items.length>0){
      return items.sort((a,b) => {     
        if(a.tipo === 'ingreso'){
          console.log(a.tipo);
           return -1
        } else{
          return 1
        }
      });
    }
    return items
  }

}
