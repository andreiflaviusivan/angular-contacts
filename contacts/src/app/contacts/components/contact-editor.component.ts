import { Component, OnInit, AfterViewInit, OnDestroy, forwardRef, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ContactDto } from '../dto/contact';
import { Router, ActivatedRoute } from '@angular/router';
import { EditContact, CreateContact } from '../actions';

@Component({
    selector: 'mdz-contact-editor',
    templateUrl: './contact-editor.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ContactEditorComponent),
        }
    ]
})
export class ContactEditorComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    private onChangeFunc: (contact: ContactDto) => {};
    private id = 0;

    detailsForm: FormGroup;

    constructor(
        builder: FormBuilder,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly store: Store<any>) {

        const id = new FormControl(0);
        const firstName = new FormControl('', [ Validators.required ]);
        const lastName = new FormControl('', [ Validators.required ]);
        const phone = new FormControl('', [ Validators.required ]);
        const email = new FormControl('', [ Validators.required ]);

        this.detailsForm = builder.group({
            id,
            firstName,
            lastName,
            phone,
            email,
        });
    }


    writeValue(obj: any): void {
        this.detailsForm.setValue(obj);
    }

    registerOnChange(fn: any): void {
        this.onChangeFunc = fn;
    }

    registerOnTouched(fn: any): void {
        
    }

    setDisabledState?(isDisabled: boolean): void {
        
    }
    
    ngOnInit(): void {
        const sub = this.route.params.subscribe({
            next: params => {
                if (params['id']) {
                    // (+) converts string 'id' to a number
                    if (+params['id'] != NaN) {
                        this.id = parseInt(params['id']) as any;
                    } else {
                        this.id = params['id'];
                    }

                    this.detailsForm.get('id').setValue(this.id);
                }
            },
            complete: () => sub.unsubscribe()
        });
    }

    ngAfterViewInit(): void {
        
    }

    ngOnDestroy(): void {
    }
    
    formSubmitted() {
        const contact = this.detailsForm.value as ContactDto;

        if (this.id > 0) {
            this.store.dispatch(new EditContact(contact))
        } else {
            this.store.dispatch(new CreateContact(contact))
        }

        this.router.navigate(['contacts']);
    }
}
