import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { updateCurrentContact } from '../store/actions/contact.actions';
import { selectCurrentContact } from '../store/selectors/contact.selectors';
import { AppState } from '../store/state/app.state';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {

  private readonly destroySub = new Subject<void>();

  patientForm: FormGroup = this.formBuilder.group({
    id: [(new Date()).getTime()],
    patientName: ['', Validators.required],
    appoinmentDate: ['', Validators.required],
    department: [''],
    service: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit() {
    this.patientForm.valueChanges.pipe(takeUntil(this.destroySub))
      .subscribe(contact => this.store.dispatch(updateCurrentContact({ contact })));

    this.store.select(selectCurrentContact)
      .pipe(
        filter(a => a !== undefined),
        distinctUntilChanged((a, b) => a.id === b.id),
        takeUntil(this.destroySub)
      )
      .subscribe(contact => this.patientForm.reset(contact));
  }

  ngOnDestroy() {
    this.destroySub.next();
    this.destroySub.complete();
  }
}
