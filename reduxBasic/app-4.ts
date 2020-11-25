import { createStore, Store } from "redux";
import { contadorReducer } from './contador/contador.reducer';
import { incrmentadorAction } from './contador/contador.action';
const store: Store = createStore( contadorReducer)
store.subscribe(()=>{
    console.log('Subs:', store.getState());
})

store.dispatch(incrmentadorAction)

store.dispatch(incrmentadorAction)
store.dispatch(incrmentadorAction)
store.dispatch(incrmentadorAction)
store.dispatch(incrmentadorAction)