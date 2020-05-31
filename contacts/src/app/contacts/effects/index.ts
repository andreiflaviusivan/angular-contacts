import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { exhaustMap, tap, map, switchMap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { ActionTypes, LoadContacts, LoadContactsResult, CreateContact, } from "../actions";
import { Store } from "@ngrx/store";
import { ContactsService } from "../services";

@Injectable()
export class ContactsEffects {

    constructor(
        private readonly actions: Actions,
        private readonly contacts: ContactsService,
        private readonly store: Store<any>,
    ) {
    }

    @Effect()
    loadContacts = this.actions
        .pipe(
            ofType<LoadContacts>(ActionTypes.LoadContacts),
            exhaustMap(_ =>
                this.contacts.getContacts()
            ),
            map(result => new LoadContactsResult(result))
        )

    @Effect()
    addContact = this.actions
        .pipe(
            ofType<CreateContact>(ActionTypes.CreateContact),
            exhaustMap(create =>
                this.contacts.addContact(create.contact)
            ),
            map(_ => new LoadContacts())
        )

    @Effect()
    editContact = this.actions
        .pipe(
            ofType<CreateContact>(ActionTypes.EditContact),
            exhaustMap(create =>
                this.contacts.editContact(create.contact)
            ),
            map(_ => new LoadContacts())
        )

    @Effect()
    deleteContact = this.actions
        .pipe(
            ofType<CreateContact>(ActionTypes.DeleteContact),
            exhaustMap(create =>
                this.contacts.deleteContact(create.contact)
            ),
            map(_ => new LoadContacts())
        )
}