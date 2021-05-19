import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model'

export const unSetItems = createAction('[IngresoEgreso] set Items');
export const setItems = createAction(
    '[IngresoEgreso] Unset Items',
    props<{ items: IngresoEgreso[] }>());