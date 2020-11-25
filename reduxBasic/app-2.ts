
import { Action } from './ngrx-fake/ngrx'
import {
    incrmentadorAction, 
    decrementadorAction,
    multiplicarAction, 
    resetAction } from './contador/contador.action'

// Es una funcion que tiene un reducer regresa un nuevo estado
const reducer=(state=10, action:Action)=>{
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


/// usar el reducer

console.log(reducer(10, incrmentadorAction))
console.log(reducer(10, decrementadorAction))
console.log(reducer(10, multiplicarAction))
console.log(reducer(10, resetAction))