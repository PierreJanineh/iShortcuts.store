import {Shortcut} from './shortcut';
import {FirebaseService} from '../services/firebase.service';
import {Observable} from 'rxjs';

export class Category {
  name: string;
  index: number;
  items: Shortcut[];

  public static categories = [
    'All',
    'Popular',
    'Books',
    'Business',
    'Developer Tools',
    'Education',
    'Entertainment',
    'Finance',
    'Food & Drink',
    'Games',
    'Graphics & Design',
    'Health & Fitness',
    'Kids',
    'Lifestyle',
    'Medical',
    'Music',
    'Navigation',
    'News',
    'Photo & Video',
    'Productivity',
    'Reference',
    'Shopping',
    'Social Networking',
    'Sports',
    'Travel',
    'Utilities'
  ];

  constructor(name: string,
              index?: number) {
    this.name = name;
    this.index = index;
    this.items = [];
  }

  getAllItems(firebase: FirebaseService): Observable<Shortcut[]>{
    return firebase.getAllShortcutsObservable();
  }

  getAllItemsForCategoryFromAllItems(category: string, shortcuts: Shortcut[]){
    if (category === "All"){
      this.items = shortcuts;
      return;
    }
    for (const short of shortcuts) {
      for (const cate of short.categories){
        if (cate === category) {
          this.items[this.items.length] = short;
          return;
        }
      }
    }
  }
}
