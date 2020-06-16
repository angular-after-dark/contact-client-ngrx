import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from 'src/app/contact.model';
import { updateCurrentContact } from '../actions/contact.actions';
import { initialAppState } from '../state/app.state';

const reducer = createReducer(
  initialAppState.currentContact,
  on(updateCurrentContact, (state, { contact }) => contact)
);

export function currentContactReducer(state: Contact, action: Action) {
  return reducer(state, action);
}
