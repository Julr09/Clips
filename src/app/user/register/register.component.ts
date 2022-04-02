import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Component } from '@angular/core'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}

  name = new FormControl('', [Validators.required, Validators.minLength(3)])

  email = new FormControl('', [Validators.required, Validators.email])

  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])

  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  ])

  confirm_password = new FormControl('', [Validators.required])

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  showAlert = false

  alertColor = 'Your account is being created'

  alertMessage = 'blue'

  inSubmission = false

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  })

  async register() {
    this.showAlert = true
    this.alertMessage = 'Your account is being created'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await this.auth.createUser(this.registerForm.value)
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        this.alertMessage = 'This email is already in use, try another one'
        this.alertColor = 'red'
        this.inSubmission = false
        return
      }
      this.alertMessage = 'Unexpected error occurred. Please try again later'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }

    this.alertMessage = 'Success, your account has been created'
    this.alertColor = 'green'
    setTimeout(() => {
      this.showAlert = false
      this.inSubmission = false
    }, 3000)
    this.registerForm.reset()
  }
}
