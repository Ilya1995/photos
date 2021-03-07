import {Injectable} from '@angular/core'
import {AngularFireDatabase} from '@angular/fire/database'

export interface User {
  email: string
  login: string
  password: string
  key: string
  photoIds: string[]
}
@Injectable({providedIn: 'root'})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  createUser(user: User) {
    if (!user?.login) return
    const itemsRef = this.db.list('users')
    return itemsRef.push(user)
  }

  addPhotoId(userKey: string, photoIds: string[]) {
    if (!userKey || !photoIds) return
    const itemsRef = this.db.list('users')
    itemsRef.update(userKey, {photoIds})
  }

  getUser(login) {
    if (!login) return
    return this.db.list('users', ref => ref.orderByChild('login').equalTo(login)).stateChanges()
  }

}
