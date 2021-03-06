import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import IUser from '../models/user.model'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.userCollection = db.collection('users')
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided!')
    }

    const userCredentials = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    )

    if (!userCredentials.user) {
      throw new Error("User can't be found")
    }

    await this.userCollection.doc(userCredentials.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    })

    await userCredentials.user.updateProfile({
      displayName: userData.name
    })
  }
}
