import {PhotoInterceptor} from './photos.service'
import {BrowserModule} from '@angular/platform-browser'
import {NgModule, Provider} from '@angular/core'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {StoreModule} from '@ngrx/store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {environment} from '../environments/environment'
import {reducers, metaReducers} from './reducers'
import {StoreRouterConnectingModule} from '@ngrx/router-store'
import {DefaultModule} from './layouts/default/default.module'
import {FullsizeModule} from './layouts/fullsize/fullsize.module'
import {ErrorPageComponent} from './modules/error-page/error-page.component'

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: PhotoInterceptor,
  multi: true,
}

@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    DefaultModule,
    FullsizeModule,
    AppRoutingModule,
    HttpClientModule,
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
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})

export class AppModule {}
