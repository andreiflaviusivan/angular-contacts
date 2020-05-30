import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Logout } from '../actions';

@Component({
    selector: 'app-logoff',
    templateUrl: './logoff.component.html',
})

export class LogoffComponent implements OnInit {

    constructor(private store: Store<any>) {
    }

    ngOnInit() {
        this.store.dispatch(new Logout());
    }
}
