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
    this.id = Math.random() + "-" + name + '-' + categories + '-' + authorUsername;
    this.name = name;
    this.description = description;
    this.icloud = icloud;
    this.categories = categories;
    this.requiredApps = requiredApps;
    this.icon = icon;
    this.color = color;
    this.authorUsername = authorUsername;
  }

}
