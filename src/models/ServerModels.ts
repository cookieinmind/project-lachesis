import { v4 as uuidv4 } from 'uuid';

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
export type Chapter = {
  story_id: string;
  initialSetup: iFork | Destination;
  title: string;
  chapterNumber: number;
  routes: Route[];
  storyTitle: string;
};

export type Route = {
  id: string;
  text: string;
  fork: iFork;
};

// export class Route {
//   constructor(text: string = '', fork?: iFork) {
//     this.id = uuidv4();
//     this.text = text;
//     this.fork = fork;
//   }

//   id: string;
//   text: string;
//   fork: iFork;
// }

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
