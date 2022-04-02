import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthModalComponent } from './auth-modal/auth-modal.component'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { NgModule } from '@angular/core'
import { RegisterComponent } from './register/register.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [AuthModalComponent, LoginComponent, RegisterComponent],
  exports: [AuthModalComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, FormsModule]
})
export class UserModule {}
