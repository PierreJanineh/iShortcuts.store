export class BasePagesComponent {

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

  public static getRandomUser(): User {
    return new User("PierreJanineh", "123456", "http://pierrejanineh.com");
  }

  public static getCategoryFromString(str: string): Category {
    return new Category(str, this.categories.indexOf(str));
  }

  public static getAllItems(): Shortcut[] {
    return [
      new Shortcut(
        'hello shortcut1',
        'says hello1',
        'https://www.icloud.com/shortcuts/e636628e5702421a8506e0eff392145b',
        this.categories,
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
        this.categories,
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
        this.categories,
        null,
        Glyphs.Motorcycle,
        Colors.Vermilion,
        'Pierre',
        'blah'
      )
    ];
  }

  public static getAllItemsForCategory(category: string): Shortcut[] {
    // TODO
    // ServiceWithDB.getAllItemsFromDB(category);

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
  name: string;
  index: number;
  items: Shortcut[];

  constructor(name: string,
              index: number) {
    this.name = name;
    if (name == "None"){
      this.index = 100;
      this.items = [];
      return;
    }
    this.index = index;
    this.items = BasePagesComponent.getAllItemsForCategory(name);
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
  Car = 'fa ',
  Bus = 'fa fa-bus',
  Motorcycle = 'fa fa-motorcycle',
  Ambulance = 'fa fa-ambulance',
  Aeroplane = 'fa fa-plane',
  SailingBoat = 'fa fa-ship',
  Home = 'fa fa-home',
  Church = 'fa fa-church',
  Building = 'fa fa-building',
  ShoppingTrolley = 'fa fa-shopping-cart',
  Handbag = 'fa fa-shopping-bag',
  Shop = 'fa fa-store',
  Cutlery = 'fa fa-utensils',
  PetrolStation = 'fa fa-gas-pump',
  Thermometer = 'fa fa-thermometer-half',
  Sun = 'fa fa-sun',
  Moon = 'fa fa-moon',
  Snowflake = 'fa fa-snowflake',
  Cloud = 'fa fa-cloud',
  RainCloud = 'fa fa-cloud-rain',
  Umbrella = 'fa fa-umbrella',
  EvergreenTree = 'fa fa-tree',
  Fire = 'fa fa-fire',
  DirectionSigns = 'fa fa-map-signs',
  Binoculars = 'fa fa-binoculars',
  Compass = 'fa fa-compass',
  Globe = 'fa fa-globe',
  Mountains = 'fa fa-mountain',
  Filmstrip = 'fa fa-film',
  Camera = 'fa fa-camera',
  Microphone = 'fa fa-microphone',
  Clipboard = 'fa fa-clipboard',
  Calendar = 'fa fa-calendar-alt',
  ChatBubble = 'fa fa-comment',
  MailEnvelope = 'fa fa-envelope',
  OpenMailEnvelope = 'fa fa-envelope-open',
  SoaringPaperAeroplane = 'fa fa-paper-plane',
  Briefcase = 'fa fa-briefcase',
  Folder = 'fa fa-folder',
  CreditCard = 'fa fa-credit-card',
  Clock = 'fa fa-clock',
  Phone = 'fa fa-phone',
  Laptop = 'fa fa-laptop',
  Keyboard = 'fa fa-keyboard',
  Calculator = 'fa fa-calculator',
  Printer = 'fa fa-print',
  HardDrive = 'fa fa-hdd',
  Database = 'fa fa-database',
  Server = 'fa fa-server',
  Cube = 'fa fa-cube',
  GamesController = 'fa fa-gamepad',
  JigsawPiece = 'fa fa-puzzle-piece',
  Music = 'fa fa-music',
  Speaker = 'fa fa-bullhorn',
  BookWithSash = 'fa fa-book-open',
  Glasses = 'fa fa-glasses',
  CinemaTicket = 'fa fa-ticket-alt',
  TheatreMasks = 'fa fa-theater-masks',
  Baseball = 'fa fa-baseball-ball',
  Football = 'fa fa-football-ball'
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

export enum Constants {
  title = 'iShortcuts•',
  store = 'Store',
}
