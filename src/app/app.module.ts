import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {NgxMasonryModule} from 'ngx-masonry'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {PhotosComponent} from './photos/photos.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {LoginComponent} from './login/login.component'
import {RegistrationComponent} from './registration/registration.component'
import {InfiniteScrollComponent} from './infinite-scroll/infinite-scroll.component'
import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {StoreModule} from '@ngrx/store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {environment} from '../environments/environment'
import {reducers, metaReducers} from './reducers'
import {StoreRouterConnectingModule} from '@ngrx/router-store'

@NgModule({
  declarations: [AppComponent, PhotosComponent, LoginComponent, RegistrationComponent, InfiniteScrollComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxMasonryModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
