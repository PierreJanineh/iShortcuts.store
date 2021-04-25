import {Shortcut} from './shortcut';

export class Category {
  name: string;
  index: number;
  items: Shortcut[];

  public static categories = [
    'Popular',
    'New',
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
              index: number) {
    this.name = name;
    if (name == 'None') {
      this.index = 100;
      this.items = [];
      return;
    }
    this.index = index;
    this.items = Category.getAllItemsForCategory(name);
  }

  public getAllItemsFromDB(): Shortcut[] {
    //TODO
    return new Array();
  }

  public static getCategoryFromString(str: string): Category {
    return new Category(str, this.categories.indexOf(str));
  }

  public static getAllItemsForCategory(category: string): Shortcut[] {
    // TODO
    // ServiceWithDB.getAllItemsFromDB(category);

    return Shortcut.getAllItems();
  }
}
