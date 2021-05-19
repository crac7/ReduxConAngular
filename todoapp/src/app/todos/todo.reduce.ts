import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, cleanTodoCompleted, crear, editar, toggle, toogleAll } from './todo.actions';

export const estadoInicial:Todo[] = [
    new Todo('Salvar al mundo')
];

const _todoReducer = createReducer(
    estadoInicial,
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),
  on(borrar, (state, { id } ) => state.filter(todo =>  todo.id!==id)),
  on(toogleAll, (state, { completado })=> {
    return state.map(todo=>{
      return{
            ...todo,
            completado
      }
    })
  }),
  on(toggle, (state, {id}) => {
       return state.map(todo =>{
         if(todo.id== id){
          return {
            ...todo,
            completado: !todo.completado
          }
         }else{
           return todo
         } 
       })
  }),
  on(editar, (state, {id, texto}) => {
    return state.map(todo =>{
      if(todo.id== id){
       return {
         ...todo,
         texto
       }
      }else{
        return todo
      } 
    })
}),
  on(cleanTodoCompleted,(state)=>{
    return  state.filter(todo=> !todo.completado)
  })
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}