import { Action } from "@ngrx/store";
import { ContactDto } from '../dto/contact';

export enum ActionTypes {
    LoadContacts = '[MdzContactActions] LoadContacts',
    LoadContactsResult = '[MdzCreateActions] LoadPlatformsResult',
    CreateContact = '[MdzContactActions] CreateContact',
    EditContact = '[MdzContactActions] EditContact',
    DeleteContact = '[MdzContactActions] DeleteContact',
}

export class LoadContacts implements Action {
    readonly type = ActionTypes.LoadContacts;

    constructor() { }
}

export class LoadContactsResult implements Action {
    readonly type = ActionTypes.LoadContactsResult;

    constructor(public readonly result: ContactDto[]) { }
}

export class CreateContact implements Action {
    readonly type = ActionTypes.CreateContact;

    constructor(public readonly contact: ContactDto) { }
}

export class EditContact implements Action {
    readonly type = ActionTypes.EditContact;

    constructor(public readonly contact: ContactDto) { }
}

export class DeleteContact implements Action {
    readonly type = ActionTypes.DeleteContact;

    constructor(public readonly contact: ContactDto) { }
}

export type ActionUnion =
    LoadContacts |
    LoadContactsResult |
    CreateContact |
    EditContact 
    ;