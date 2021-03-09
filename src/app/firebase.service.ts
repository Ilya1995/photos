import {Injectable} from '@angular/core'
import {AngularFireDatabase} from '@angular/fire/database'

export interface User {
  email: string
  login: string
  password: string
  key: string
  photoUrls: string[]
}
@Injectable({providedIn: 'root'})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  createUser(user: User) {
    if (!user?.login) return
    const itemsRef = this.db.list('users')
    return itemsRef.push(user)
  }

  addPhotoUrl(userKey: string, photoUrls: string[]) {
    if (!userKey || !photoUrls) return
    const itemsRef = this.db.list('users')
    itemsRef.update(userKey, {photoUrls})
  }

  getUser(login) {
    if (!login) return
    return this.db.list('users', ref => ref.orderByChild('login').equalTo(login)).stateChanges()
  }

}
