import { createAction, props } from '@ngrx/store';
import { Contact } from '../../contact.model';

export const saveContact = createAction('[Contact] Add Contact', props<{ contact: Contact }>());
export const updateCurrentContact = createAction('[Contact] Update Current Contact', props<{ contact: Contact }>())
