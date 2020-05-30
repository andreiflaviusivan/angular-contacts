import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription ,  Observable, combineLatest } from 'rxjs';
import { AuthService } from '../services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";
import { selectAuthFailureReasonState, selectIsLoginSuccessState, selectIsLoginFailureState, selectIsUserPresentState, selectUpdateUserStateBeat } from '../reducers'
import { Login, ClearLoginSuccessAndFailure } from "../actions";
import { filter, tap, last } from 'rxjs/operators';
import { FormBaseComponent } from 'src/app/form-base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent extends FormBaseComponent implements OnInit, OnDestroy {
    private returnUrl: string;
    private externalUrl: boolean;
    private routeSubscription: Subscription;
    private userStateBeatSubscription: Subscription;

    isLoginSuccess: Observable<boolean>;
    isLoginFailure: Observable<boolean>;
    loginFailureReason: Observable<string>;
    isUserPresentState: Observable<boolean>;
    userStateBeat : Observable<number>;

    lastBeat: number = 0;

    username: FormControl;
    password: FormControl;

    loginForm: FormGroup;

    reasonKey: string;

    constructor(private auth: AuthService, private route: Router, private activatedRoute: ActivatedRoute,
        builder: FormBuilder, private store: Store<any>) {
        super(builder);

        this.isLoginSuccess = store.select(selectIsLoginSuccessState);
        this.isLoginFailure = store.select(selectIsLoginFailureState);
        this.loginFailureReason = store.select(selectAuthFailureReasonState);
        this.isUserPresentState = store.select(selectIsUserPresentState);
        this.userStateBeat = store.select(selectUpdateUserStateBeat);

        this.clearLoginMessage();
    }

    protected buildForm(builder: FormBuilder): FormGroup {
        this.username = new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-z0-9._]+$'),]));
        this.password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_.;:~-]).{6,}$'),]));

        this.loginForm = builder.group({
            username: this.username,
            password: this.password,
        });

        return this.loginForm;
    }

    ngOnInit() {
        let self = this;
        this.routeSubscription = this.activatedRoute
            .params
            .subscribe(params => {
                // Replace _ with . (because of SPA middleware problem)
                self.returnUrl = params['returnUrl'];
                self.reasonKey = params['reasonKey'] && `${params['reasonKey']}`.replace('_', '.');
                self.externalUrl = params['externalUrl'] === 'true';
            });

        combineLatest(this.isUserPresentState, this.userStateBeat)
            .subscribe(([present, beat]) => {
                if (present && beat > self.lastBeat) {
                    self.loginSuccessful()
                } else {
                    self.lastBeat = beat;
                }
            })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    public formSubmitted() {
        super.formSubmitted();
        if (this.baseForm.valid) {
            this.store.dispatch(new Login(this.username.value, this.password.value));
        }
    }

    private loginSuccessful() {
        
        let returnUrl = this.returnUrl;

        this.clearLoginMessage();

        if (this.externalUrl) {
            window.location.href = this.returnUrl;
        } else {
            if (returnUrl != null && returnUrl.length > 0) {
                this.route.navigateByUrl(returnUrl);
            } else {
                this.route.navigate(['/'])
            }
        }
    }

    clearLoginMessage() {
        this.store.dispatch(new ClearLoginSuccessAndFailure());
    }
}
