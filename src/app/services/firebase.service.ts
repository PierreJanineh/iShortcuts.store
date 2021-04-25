import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {Shortcut} from '../models/shortcut';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
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
    return this.usersCollection.ref.doc(user.username).set(Object.assign({}, user));
  }

  updateUser(user: User): Promise<void> {
    console.log(user.email);
    return this.usersCollection.doc(user.username).update({
      "url": user.url,
      "password": user.password,
      "email": user.email
    });
  }

  deleteUser(username: string): Promise<void> {
    return this.usersCollection.doc(username).delete();
  }

  getShortcutById(id: string): Observable<Shortcut> {
    return this.shortcutsCollection.doc(id).valueChanges();
  }

  getAllShortcutsObservable(): Observable<Shortcut[]> {
    return this.shortcutsRef;
  }

  createShortcut(shortcut: Shortcut): any {
    return this.shortcutsCollection.doc(shortcut.id).set(Object.assign({}, shortcut));
  }

  updateShortcut(key: string, shortcut: Shortcut): Promise<void> {
    return this.shortcutsCollection.doc(key).update({
      "name": shortcut.name,
      "description": shortcut.description,
      "icloud": shortcut.icloud,
      "categories": shortcut.categories,
      "requiredApps": shortcut.requiredApps,
      "icon": shortcut.icon,
      "color": shortcut.color,
      "authorUsername": shortcut.authorUsername
    });
  }

  deleteShortcut(key: string): Promise<void> {
    return this.shortcutsCollection.doc(key).delete();
  }

  public getShortcutsForAuthor(username: string, items$: BehaviorSubject<Shortcut[]>) {
    this.getAllShortcutsObservable().subscribe(items => {
      const shorts: Shortcut[] = [];
      for (const item of items){
        if (item.authorUsername === username){
          shorts[shorts.length] = item;
        }
      }
      items$.next(shorts);
    })
  }
}
