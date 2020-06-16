import { Action, createReducer, on } from '@ngrx/store';
import { saveContact } from '../actions/contact.actions';
import { contactAdapter, ContactState, initialContactState } from '../state/contact.state';

const reducer = createReducer(
  initialContactState,
  on(saveContact, (state, { contact }) => contactAdapter.upsertOne(contact, state))
);

export function contactReducer(state: ContactState, action: Action) {
  return reducer(state, action);
}
