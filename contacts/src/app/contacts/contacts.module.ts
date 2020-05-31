import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducers, metaReducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from './effects';
import { ContactEditorComponent, ViewContactsComponent } from './components';
import { Routing } from './routing';
import { ContactsService } from './services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ ContactEditorComponent, ViewContactsComponent ],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forFeature('contacts', reducers, { metaReducers: metaReducers, }),
    EffectsModule.forFeature([ContactsEffects,]),
    Routing,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule { } 
