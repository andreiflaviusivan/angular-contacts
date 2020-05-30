import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RequestUpdateUserState } from './auth/actions';
import { Observable } from 'rxjs';
import { selectIsAnyAdminState, selectIsUserPresentState, selectUsernameState } from './auth/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contacts';
  username = '';
  isHttpPending: Observable<boolean>;
  isAuth: Observable<boolean>;
  isAnyKindOfAdmin: Observable<boolean>;
  getUsername: Observable<string>;

  constructor(readonly store: Store<any>) {
    this.store.dispatch(new RequestUpdateUserState());

    this.isAnyKindOfAdmin = store.select(selectIsAnyAdminState);
    this.isAuth = store.select(selectIsUserPresentState);
    this.getUsername = store.select(selectUsernameState);
  }

    ngOnInit() {
        this.update();
    }

    update() {
        this.store.dispatch(new RequestUpdateUserState());
    }
}
