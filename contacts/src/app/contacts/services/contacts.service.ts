import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContactDto } from '../dto/contact';

@Injectable()
export class ContactsService {
    private contacts: ContactDto[] = [];

    private getId(): number {
        let max = Math.max(...this.contacts.map(c => c.id));

        if (!max) {
            max = 0;
        }

        return max + 1;
    }

    public getContacts(): Observable<ContactDto[]> {
        const localStr = localStorage.getItem('contacts');

        if (localStr && (this.contacts == null || this.contacts.length <= 0)) {
            this.contacts = JSON.parse(localStr) as ContactDto[];
        }

        return of(this.contacts);
    }

    public addContact(contact: ContactDto): Observable<any> {
        this.contacts = [
            ...
            this.contacts,            
            {
                id: this.getId(),
                email: contact.email,
                firstName: contact.firstName,
                lastName: contact.lastName,
                phone: contact.phone,
            }];

        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        return of(this.contacts);
    }

    public editContact(contact: ContactDto): Observable<any> {

        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        return of(this.contacts);
    }

    public deleteContact(contact: ContactDto): Observable<any> {

        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        return of(this.contacts);
    }
}