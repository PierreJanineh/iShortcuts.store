export class Shortcut {
  id: string;
  uniqueName: string;
  name: string;
  description: string;
  icloud: string;
  categories: string[];
  requiredApps: string[];
  icon: string;
  color: string;
  authorUsername: string;
  downloaded: number;

  constructor(uniqueName: string,
              name: string,
              description: string,
              icloud: string,
              categories: string[],
              requiredApps: string[],
              icon: string,
              color: string,
              authorUsername: string) {
    this.id = Math.random() + "-" + name + '-' + categories + '-' + authorUsername;
    this.uniqueName = uniqueName;
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
