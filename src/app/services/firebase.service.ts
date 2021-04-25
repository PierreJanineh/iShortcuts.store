import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {Shortcut} from '../models/shortcut';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private usersPath = 'users';
  private shortcutsPath = 'shortcuts';

  usersCollection: AngularFirestoreCollection<User> = null;
  shortcutsCollection: AngularFirestoreCollection<Shortcut> = null;
  usersRef: Observable<User[]> = null;
  shortcutsRef: Observable<Shortcut[]> = null;
  accout: Account = Account.getInstance();

  constructor(private db: AngularFirestore) {
    this.usersCollection = db.collection<User>(this.usersPath);
    this.usersRef = this.usersCollection.valueChanges();
    this.shortcutsCollection = db.collection<Shortcut>(this.shortcutsPath);
    this.shortcutsRef = this.shortcutsCollection.valueChanges();
  }

  getUserByUsername(username: string): Observable<User> {
    return this.usersCollection.doc(username).valueChanges();
  }

  getAllUsersObservable(): Observable<User[]> {
    return this.usersRef;
  }

  createUser(user: User): Promise<void> {
    return this.usersCollection.doc(user.username).set(user);
  }

  updateUser(user: User): Promise<void> {
    return this.usersCollection.doc(user.username).update(user);
  }

  deleteUser(username: string): Promise<void> {
    return this.usersCollection.doc(username).delete();
  }

  getAllShortcutsObservable(): Observable<Shortcut[]> {
    return this.shortcutsRef;
  }

  createShortcut(shortcut: Shortcut): any {
    return this.shortcutsCollection.add(shortcut);
  }

  updateShortcut(key: string, shortcut: Shortcut): Promise<void> {
    return this.shortcutsCollection.doc(key).update(shortcut);
  }

  deleteShortcut(key: string): Promise<void> {
    return this.shortcutsCollection.doc(key).delete();
  }




  public static getShortcutsForAuthor(user: User): Shortcut[] {
    return null;
  }
}
