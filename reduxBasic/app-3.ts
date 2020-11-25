import { Action, Reducer } from './ngrx-fake/ngrx'
import {contadorReducer} from './contador/contador.reducer'
import { incrmentadorAction } from './contador/contador.action';
class Store<T>{
    // private state:T;

    constructor( private  reducer: Reducer<T>,
                 private state:T){
                    
    }

    getState(){
        return this.state;
    }

    //Ejecutar Funciones
    dispatch( action: Action ){
        this.state = this.reducer( this.state, action )
    }
}

const store  = new Store(contadorReducer, 10)

console.log(store.getState())

store.dispatch(incrmentadorAction)

console.log(store.getState())