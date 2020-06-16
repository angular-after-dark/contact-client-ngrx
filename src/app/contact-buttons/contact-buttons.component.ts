import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Contact } from '../contact.model';
import { saveContact, updateCurrentContact } from '../store/actions/contact.actions';
import { selectCurrentContact } from '../store/selectors/contact.selectors';
import { AppState } from '../store/state/app.state';

@Component({
  selector: 'app-contact-buttons',
  templateUrl: './contact-buttons.component.html',
  styleUrls: ['./contact-buttons.component.scss']
})
export class ContactButtonsComponent implements OnInit {

  constructor(private readonly store: Store<AppState>) { }

  clear() {
    this.store.dispatch(updateCurrentContact({ contact: { id: (new Date()).getTime() } as Contact }));
  }

  save() {
    this.store.select(selectCurrentContact).pipe(take(1)).subscribe(
      contact => {
        this.store.dispatch(saveContact({ contact }));
        this.clear();
      }
    );
  }

  ngOnInit() {
  }

}
