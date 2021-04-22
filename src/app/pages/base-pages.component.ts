export class BasePagesComponent {

  public static getRandomUser(): User {
    return new User("PierreJanineh", "123456", "http://pierrejanineh.com");
  }

  public static allCategories(): string[] {
    const categories: string[] = [];
    for (const category in Categories) {
      if (category != null) {
        categories[categories.length] = category;
      }
    }
    return categories;
  }

  public static getCategoryFromString(str: string): Category {
    return new Category(str, this.getAllItemsForCategory(str));
  }

  public static getAllItems(): Shortcut[] {
    return [
      new Shortcut(
        'hello shortcut1',
        'says hello1',
        'https://www.icloud.com/shortcuts/e636628e5702421a8506e0eff392145b',
        this.allCategories(),
        null,
        Glyphs.Binoculars,
        Colors.DelftBlue,
        'Pierre',
        'blah'
      ),
      new Shortcut(
        'hello shortcut2',
        'says hello2',
        'https://www.icloud.com/shortcuts/e636628e5702421a8506e0eff392145b',
        this.allCategories(),
        null,
        Glyphs.Aeroplane,
        Colors.Red,
        'Pierre',
        'blah'
      ),
      new Shortcut(
        'hello shortcut3',
        'says hello3',
        'https://www.icloud.com/shortcuts/e636628e5702421a8506e0eff392145b',
        this.allCategories(),
        null,
        Glyphs.Motorcycle,
        Colors.Vermilion,
        'Pierre',
        'blah'
      )
    ];
  }

  public static getAllItemsForCategory(category: string): Shortcut[] {
    const cate = Categories[category];
    // TODO
    // cate.getAllItemsFromDB;

    return this.getAllItems();
  }
}

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
  authorUrl: string;

  constructor(name: string,
              description: string,
              icloud: string,
              categories: string[],
              requiredApps: string[],
              icon: Glyphs,
              color: Colors,
              authorUsername: string,
              authorUrl: string) {
    this.id = /*Math.random()+"-"+*/name+"-"+categories+"-"+icloud+"-"+authorUsername;
    this.name = name;
    this.description = description;
    this.icloud = icloud;
    this.categories = categories;
    this.requiredApps = requiredApps;
    this.icon = icon;
    this.color = color;
    this.authorUsername = authorUsername;
    this.authorUrl = authorUrl;
  }
}

export class Category {
  category: Categories;
  items: Shortcut[];

  constructor(name: string,
              items: Shortcut[]) {
    this.category = Categories[name];
    this.items = items;
  }

  public getAllItemsFromDB(): Shortcut[] {
    //TODO
    return new Array();
  }
}

export class User {
  username: string;
  password: string;
  url: string;

  constructor(username: string, password: string, url: string) {
    this.username = username;
    this.password = password;
    this.url = url;
  }

  public hasURL(): boolean {
    return this.url != null;
  }

  public hasUploaded(): boolean {
    return this.getShortcuts() != null;
  }

  public getShortcuts(): Shortcut[] {
    return ServiceWithDB.getShortcutsForAuthor(this);
  }

  public static getUserFromUsername(username): User {
    return ServiceWithDB.getUserByUsername(username);
  }
}

export class Account {
  private loggedIn: boolean;
  private user: User;

  public static account: Account;

  constructor() {
    this.loggedIn = false;
    this.user = null;
  }

  public static getInstance(){
    if (this.account == null){
      this.account = new Account();
    }
    return this.account;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public logIn(user: User): boolean {
    //look for user and its pass and log in
    return true; //true for successful
  }

  public register(user: User): boolean {
    //get user data and store in DB
    return false; //false for unsuccessful due to another user with the same username
  }
}

export class ServiceWithDB {
  //TODO

  public static getShortcutsForAuthor(user: User): Shortcut[] {
    return null;
  }

  public static getUserByUsername(username: string): User {
    return null;
  }
}

export enum Glyphs {
  Car = '<i class=\'fa fa-car\'></i>',
  Bus = '<i class=\'fa fa-bus\'></i>',
  Motorcycle = '<i class=\'fa fa-motorcycle\'></i>',
  Ambulance = '<i class="fa fa-ambulance"></i>',
  Aeroplane = '<i class="fa fa-plane"></i>',
  SailingBoat = '<i class="fa fa-ship"></i>',
  Home = '<i class="fa fa-home"></i>',
  Church = '<i class="fa fa-church"></i>',
  Building = '<i class="fa fa-building"></i>',
  ShoppingTrolley = '<i class="fa fa-shopping-cart"></i>',
  Handbag = '<i class="fa fa-shopping-bag"></i>',
  Shop = '<i class="fa fa-store"></i>',
  Cutlery = '<i class="fa fa-utensils"></i>',
  PetrolStation = '<i class="fa fa-gas-pump"></i>',
  Thermometer = '<i class="fa fa-thermometer-half"></i>',
  Sun = '<i class="fa fa-sun"></i>',
  Moon = '<i class="fa fa-moon"></i>',
  Snowflake = '<i class="fa fa-snowflake"></i>',
  Cloud = '<i class="fa fa-cloud"></i>',
  RainCloud = '<i class="fa fa-cloud-rain"></i>',
  Umbrella = '<i class="fa fa-umbrella"></i>',
  EvergreenTree = '<i class="fa fa-tree"></i>',
  Fire = '<i class="fa fa-fire"></i>',
  DirectionSigns = '<i class="fa fa-map-signs"></i>',
  Binoculars = '<i class="fa fa-binoculars"></i>',
  Compass = '<i class="fa fa-compass"></i>',
  Globe = '<i class="fa fa-globe"></i>',
  Mountains = '<i class="fa fa-mountain"></i>',
  Filmstrip = '<i class="fa fa-film"></i>',
  Camera = '<i class="fa fa-camera"></i>',
  Microphone = '<i class="fa fa-microphone"></i>',
  Clipboard = '<i class="fa fa-clipboard"></i>',
  Calendar = '<i class="fa fa-calendar-alt"></i>',
  ChatBubble = '<i class="fa fa-comment"></i>',
  MailEnvelope = '<i class="fa fa-envelope"></i>',
  OpenMailEnvelope = '<i class="fa fa-envelope-open"></i>',
  SoaringPaperAeroplane = '<i class="fa fa-paper-plane"></i>',
  Briefcase = '<i class="fa fa-briefcase"></i>',
  Folder = '<i class="fa fa-folder"></i>',
  CreditCard = '<i class="fa fa-credit-card"></i>',
  Clock = '<i class="fa fa-clock"></i>',
  Phone = '<i class="fa fa-phone"></i>',
  Laptop = '<i class="fa fa-laptop"></i>',
  Keyboard = '<i class="fa fa-keyboard"></i>',
  Calculator = '<i class="fa fa-calculator"></i>',
  Printer = '<i class="fa fa-print"></i>',
  HardDrive = '<i class="fa fa-hdd"></i>',
  Database = '<i class="fa fa-database"></i>',
  Server = '<i class="fa fa-server"></i>',
  Cube = '<i class="fa fa-cube"></i>',
  GamesController = '<i class="fa fa-gamepad"></i>',
  JigsawPiece = '<i class=\'fa fa-puzzle-piece\'></i>',
  Music = '<i class="fa fa-music"></i>',
  Speaker = '<i class="fa fa-bullhorn"></i>',
  BookWithSash = '<i class="fa fa-book-open"></i>',
  Glasses = '<i class="fa fa-glasses"></i>',
  CinemaTicket = '<i class="fa fa-ticket-alt"></i>',
  TheatreMasks = '<i class="fa fa-theater-masks"></i>',
  Baseball = '<i class="fa fa-baseball-ball"></i>',
  Football = '<i class="fa fa-football-ball"></i>'
}

export enum Colors {
  Red = '#ff0000',
  Vermilion = '#ee563b',
  Apricot = '#fbceb1',
  Pollen = '#ffff00',
  Mint = '#3eb489',
  Turquoise = '#30d5c8',
  LightBlue = '#add8e6',
  Cerulean = '#007ba7',
  DelftBlue = '#0000ff',
  Violet = '#ee82ee',
  Lilac = '#c8a2c8',
  LightPink = '#ffb6c1',
  Fog = '#808080',
  Limestone = '#bfff00'
}

export enum Categories {
  Popular = 'Popular',
  New = 'New',
  Books = 'Books',
  Business = 'Business',
  DeveloperTools = 'Developer Tools',
  Education = 'Education',
  Entertainment = 'Entertainment',
  Finance = 'Finance',
  FoodDrink = 'Food & Drink',
  Games = 'Games',
  GraphicsDesign = 'Graphics & Design',
  HealthFitness = 'Health & Fitness',
  Kids = 'Kids',
  Lifestyle = 'Lifestyle',
  Medical = 'Medical',
  Music = 'Music',
  Navigation = 'Navigation',
  News = 'News',
  PhotoVideo = 'Photo & Video',
  Productivity = 'Productivity',
  Reference = 'Reference',
  Shopping = 'Shopping',
  SocialNetworking = 'Social Networking',
  Sports = 'Sports',
  Travel = 'Travel',
  Utilities = 'Utilities'
}

export enum Constants {
  title = 'iShortcuts•',
  store = 'Store',
}
