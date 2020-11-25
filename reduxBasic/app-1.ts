// Acciones
interface Action{
 type:string;
 payload?:any;
}



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
        default:
            return state;
    }
  
}



/// usar el reducer
const incrmentadorAction: Action = {
    type: 'INCREMENTAR'
};
const decrementadorAction: Action = {
    type: 'DECREMENTAR'
};
const multiplicarAction: Action = {
    type: 'MULTIPLICAR',
    payload:2
};
console.log(reducer(10, incrmentadorAction))
console.log(reducer(10, decrementadorAction))
console.log(reducer(10, multiplicarAction))

//tarea dividir action

const dividirrAction: Action = {
    type: 'DIVIDIR',
    payload:2
};
console.log(reducer(10, dividirrAction))