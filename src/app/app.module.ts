import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { BrowserModule } from '@angular/platform-browser'
import { NavComponent } from './nav/nav.component'
import { NgModule } from '@angular/core'
import { UserModule } from './user/user.module'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [AppComponent, NavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
