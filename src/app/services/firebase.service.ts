import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {Shortcut} from '../models/shortcut';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private USERS_PATH = 'users';
  private SHORTCUTS_PATH = 'shortcuts';

  usersCollection: AngularFirestoreCollection<User> = null;
  shortcutsCollection: AngularFirestoreCollection<Shortcut> = null;
  usersList: Observable<User[]> = null;
  shortcutsList: Observable<Shortcut[]> = null;
  account: Account = Account.getInstance();

  constructor(private db: AngularFirestore) {
    this.usersCollection = db.collection<User>(this.USERS_PATH);
    this.usersList = this.usersCollection.valueChanges();
    this.shortcutsCollection = db.collection<Shortcut>(this.SHORTCUTS_PATH);
    this.shortcutsList = this.shortcutsCollection.valueChanges();
  }

  getUserByUsername(username: string): Observable<User> {
    return this.usersCollection.doc(username).valueChanges();
  }

  getAllUsersObservable(): Observable<User[]> {
    return this.usersList;
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
    return this.shortcutsList;
  }

  createShortcut(shortcut: Shortcut): any {
    return this.shortcutsCollection.doc(shortcut.id).set(Object.assign({}, shortcut));
  }

  updateShortcutDownloaded(id: string){
    const sub = this.shortcutsCollection.doc(id).valueChanges().subscribe((shortcut) => {
      console.log("id: "+id);
      this.shortcutsCollection.doc(id).update({
        "downloaded": shortcut.downloaded+1
      });
      sub.unsubscribe();
    });
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
    this.db.collection<Shortcut>(this.SHORTCUTS_PATH, ref => ref.where("authorUsername", "==", username)).valueChanges().subscribe((shorts) => {
      items$.next(shorts);
    });
  }
}
