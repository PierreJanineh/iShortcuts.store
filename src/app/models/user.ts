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

}
