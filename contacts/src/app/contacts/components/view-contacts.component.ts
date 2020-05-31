import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TdDialogService } from '@covalent/core/dialogs';
import { LoadContacts } from '../actions';
import { exhaustMap, filter, tap, switchMap, delay } from 'rxjs/operators';
import { ContactDto } from '../dto/contact';
import { selectContactsStateList } from '../reducers';

@Component({
    selector: 'mdz-view-contacts',
    templateUrl: './view-contacts.component.html',
    providers: []
})
export class ViewContactsComponent implements OnInit, OnDestroy {
    contacts: Observable<ContactDto[]>;

    constructor(
        private readonly store: Store<any>,) {
        
        this.contacts = store.select(selectContactsStateList);
        
    }

    ngOnInit(): void {
        this.store.dispatch(new LoadContacts());
    }

    ngOnDestroy() {
    }
}
