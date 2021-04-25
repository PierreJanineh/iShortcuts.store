import {Shortcut} from './shortcut';
import {FirebaseService} from '../services/firebase.service';

export class User {
  username: string;
  password: string;
  url: string;
  email: string;

  constructor(username: string, password: string, url: string, email: string) {
    this.username = username;
    this.password = password;
    this.url = url;
    this.email = email;
  }

  public hasURL(): boolean {
    return this.url != null;
  }

  public hasUploaded(): boolean {
    return this.getShortcuts() != null;
  }

  public getShortcuts(): Shortcut[] {
    return FirebaseService.getShortcutsForAuthor(this);
  }

}
