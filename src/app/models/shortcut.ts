import {Glyphs} from './glyphs';
import {Colors} from './colors';
import {Category} from './category';

export class Shortcut {
  id: string;
  name: string;
  description: string;
  icloud: string;
  categories: string[];
  requiredApps: string[];
  icon: Glyphs;
  color: Colors;
  authorUsername: string;

  constructor(name: string,
              description: string,
              icloud: string,
              categories: string[],
              requiredApps: string[],
              icon: Glyphs,
              color: Colors,
              authorUsername: string) {
    this.id = /*Math.random()+"-"+*/name + '-' + categories + '-' + icloud + '-' + authorUsername;
    this.name = name;
    this.description = description;
    this.icloud = icloud;
    this.categories = categories;
    this.requiredApps = requiredApps;
    this.icon = icon;
    this.color = color;
    this.authorUsername = authorUsername;
  }

  public static getAllItems(): Shortcut[] {
    return [
      new Shortcut(
        'hello shortcut1',
        'says hello1',
        'https://www.icloud.com/shortcuts/e636628e5702421a8506e0eff392145b',
        Category.categories,
        null,
        Glyphs.Binoculars,
        Colors.DelftBlue,
        'Pierre'
      ),
      new Shortcut(
        'hello shortcut2',
        'says hello2',
        'https://www.icloud.com/shortcuts/e636628e5702421a8506e0eff392145b',
        Category.categories,
        null,
        Glyphs.Aeroplane,
        Colors.Red,
        'Pierre'
      ),
      new Shortcut(
        'hello shortcut3',
        'says hello3',
        'https://www.icloud.com/shortcuts/e636628e5702421a8506e0eff392145b',
        Category.categories,
        null,
        Glyphs.Motorcycle,
        Colors.Vermilion,
        'Pierre'
      )
    ];
  }

}
