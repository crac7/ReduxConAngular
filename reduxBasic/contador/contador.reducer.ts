import { Action } from '../ngrx-fake/ngrx'
// Es una funcion que tiene un reducer regresa un nuevo estado
export const contadorReducer=(state=10, action:Action)=>{
    const { type } = action
    switch (type) {
        case "INCREMENTAR":
            return state +=1    
        case "DECREMENTAR":
            return state -=1  
        case "MULTIPLICAR":
            return state * action.payload  
        case "DIVIDIR":
            return state / action.payload  
        case "RESET":
            return state = 0 
        default:
            return state;
    }
  
}
