/**
 * Constructed of chapters
 */
export type Story = {
  author_uid: string;
  title: string;
  description: string;
  chapters_ids: string[];
  tutorialFinished: boolean;
};

/**
 * Constructed of routes and forks
 */
export type ChapterType = {
  story_id: string;
  //TODO: leave the initial setup for later, is not part of MVP
  // initialSetup: iFork | Destination;
  title: string;
  chapterNumber: number;
  routes: Route[];
  storyTitle: string;
};

export class Chapter {
  constructor(
    story_id: string,
    title: string,
    routes: Route[],
    storyTitle: string,
    chapterNumber: number
  ) {
    this.storyTitle = storyTitle;
    this.title = title;
    this.routes = routes;
    this.story_id = story_id;
    this.chapterNumber = chapterNumber;
  }

  //*Methods
  addRoute(route: Route) {}

  deleteRoute(route: Route) {}

  //TODO: leave the initial setup for later, is not part of MVP
  // initialSetup: iFork | Destination;

  //!Accesors
  //Story title
  get storyTitle(): string {
    return this._storyTitle;
  }

  private set storyTitle(newTitle: string) {
    this._storyTitle = newTitle;
  }

  //Story id
  get story_id(): string {
    return this._story_id;
  }

  private set story_id(newId: string) {
    this._story_id = newId;
  }

  //Title
  get title(): string {
    return this._title;
  }

  private set title(newTitle: string) {
    this._title = newTitle;
  }

  //Chapter num
  get chapterNumber(): number {
    return this._chapterNumber;
  }

  private set chapterNumber(num: number) {
    this._chapterNumber = num;
  }

  //Routes
  get routes(): Route[] {
    return this._routes;
  }

  private set routes(newRoutes: Route[]) {
    this._routes = newRoutes;
  }

  //!Fields
  private _routes: Route[];
  private _title: string;
  private _storyTitle: string;
  private _story_id: string;
  private _chapterNumber: number;
}

export type Route = {
  text: string;
  fork: iFork;
  index: number;
};

/**
 * Connects a route to multiple ones
 */
export interface iFork {
  typeOfFork: TypeOfFork;
  options: Option[] | undefined;
  checkers: Checker[] | undefined;
}

export class ForkWithOptions implements iFork {
  constructor(options: Option[]) {
    this.options = options;
  }

  typeOfFork = TypeOfFork.withOptions;
  options: Option[];
  checkers: undefined;
}

export class ForkWithChecker implements iFork {
  constructor(checkers: Checker[]) {
    this.checkers = checkers;
  }

  typeOfFork = TypeOfFork.withChecker;
  options: undefined;
  checkers: Checker[];
}

/**
 * With options or with checker
 */
export enum TypeOfFork {
  withOptions = 'with options',
  withChecker = 'with checker',
}

/**
 * Checks if a condition is met or not
 */
export type Checker = {
  outcomeIfFailed: Destination;
  outcomeIfPassed: Destination;
  condition: Condition;
};

export type Option = {
  isDisabled: Condition;
  shouldAppearEvenIfIsDisabled: boolean;
  textToShowcase: string;
  statsItChanges: string | undefined;
  statChange: number | undefined;
  afterPicking: Destination;
};

export type Condition = {
  stat: string;
  value: number;
  compare: CompareMethod;
};

/**
 * Destinations are the outcomes of @type {Fork}
 */
export type Destination = {
  connectsTo: Connection;
  thingItConnectsTo_id: string;
};

/**
 * Defines what type of connection must be made. New Chapter or new Route
 */
export enum Connection {
  NewChapter = 'connect me to another chapter',
  NewRoute = 'connect me to another route',
}

/**
 * Defines how a condition must be evaluated
 */
export enum CompareMethod {
  isEqual,
  isBigger,
  isSmaller,
  isBiggerOrEqual,
  isSmallerOrEqual,
}

//***************

/**
 * Is basically the user model
 */
export type PublicUserData = {
  isNewbie?: boolean;
  username: string;
  storiesPlaying: {
    story_id: string;
    saveFile: {};
  }[];
};
