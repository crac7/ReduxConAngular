import { Action, createReducer , on} from  '@ngrx/store';
import { decrementar, dividir, incrementar, multiplicar, reset } from './contador.actions';

// export function contadorReducer(state:number = 10, action: Action){
//     const { type } = action
//     switch (type) {
//         case incrementar.type:
//             return  state + 1;  
//         case decrementar.type:
//             return  state - 1;    
//         default:
//             return state;
//     }
// }


export const initialState = 20;
 ///permite selecionar la accion que esta disparando con on
const _counterReducer = createReducer(  initialState,
            on(incrementar, (state) => state + 1),
            on(decrementar, (state) => state - 1),
            on(multiplicar, (state, { numero })=> state * numero),
            on(dividir, (state, { numero })=> state / numero),
            on(reset, ()=> 0)
);

export function contadorReducer(state, action) {
    return _counterReducer(state, action);
  }