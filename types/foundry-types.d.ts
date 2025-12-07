/**
 * Consolidated FoundryVTT type definitions for testing
 *
 * This file provides essential Foundry types needed for testing
 * without requiring the full fvtt-types package.
 */

// Extend globalThis to allow assignments like globalThis.game = ...
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Window extends FoundryGlobals {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  var globalThis: typeof globalThis & FoundryGlobals;

  // Core Foundry objects as global vars
  var game: Game;
  var ui: UI;
  var canvas: Canvas;
  var Hooks: HooksAPI;
  var CONFIG: Config;
  var foundry: FoundryAPI;

  // jQuery globals
  var $: JQueryStatic;
  var jQuery: JQueryStatic;

  // Template functions
  var renderTemplate: (path: string, data?: any) => Promise<string>;
  var loadTemplates: (paths: string[]) => Promise<Function[]>;

  // Utility functions
  var duplicate: <T>(obj: T) => T;
  var mergeObject: (original: any, other: any, options?: any) => any;
  var setProperty: (object: any, key: string, value: any) => boolean;
  var getProperty: (object: any, key: string) => any;
  var hasProperty: (object: any, key: string) => boolean;
  var expandObject: (obj: any) => any;
  var flattenObject: (obj: any) => any;
  var isObjectEmpty: (obj: any) => boolean;

  // Application classes
  class Application {
    constructor(options?: any);
    render(force?: boolean): Promise<Application>;
    close(): Promise<void>;
  }

  class FormApplication extends Application {
    constructor(object?: any, options?: any);
  }

  class Dialog extends Application {
    constructor(data: any, options?: any);
    static confirm(config: any): Promise<boolean>;
    static prompt(config: any): Promise<any>;
  }

  // Document classes
  class JournalEntry {
    id: string;
    name: string;
    constructor(data?: any, context?: any);
  }

  class User {
    id: string;
    name: string;
    isGM: boolean;
    constructor(data?: any, context?: any);
  }

  class Folder {
    id: string;
    name: string;
    type: string;
    constructor(data?: any, context?: any);
  }
}

// Interface containing all Foundry globals for globalThis extension
interface FoundryGlobals {
  game: Game;
  ui: UI;
  canvas: Canvas;
  Hooks: HooksAPI;
  CONFIG: Config;
  foundry: FoundryAPI;
  $: JQueryStatic;
  jQuery: JQueryStatic;
  renderTemplate: (path: string, data?: any) => Promise<string>;
  loadTemplates: (paths: string[]) => Promise<Function[]>;
  duplicate: <T>(obj: T) => T;
  mergeObject: (original: any, other: any, options?: any) => any;
  setProperty: (object: any, key: string, value: any) => boolean;
  getProperty: (object: any, key: string) => any;
  hasProperty: (object: any, key: string) => boolean;
  expandObject: (obj: any) => any;
  flattenObject: (obj: any) => any;
  isObjectEmpty: (obj: any) => boolean;
  Application: typeof Application;
  FormApplication: typeof FormApplication;
  Dialog: typeof Dialog;
  Folder: typeof Folder;
}

// Mock interfaces for testing
interface Game {
  settings?: any;
  time?: any;
  user?: User;
  users?: any;
  actors?: any;
  items?: any;
  scenes?: any;
  journal?: any;
  folders?: any;
  i18n?: any;
  modules?: Map<string, any>;
  system?: any;
  world?: any;
}

interface UI {
  notifications?: any;
  sidebar?: any;
  nav?: any;
  controls?: any;
  players?: any;
}

interface Canvas {
  scene?: any;
  grid?: any;
  dimensions?: any;
  stage?: any;
}

interface HooksAPI {
  on(hook: string, fn: Function): number;
  once(hook: string, fn: Function): number;
  off(hook: string, id: number): void;
  callAll(hook: string, ...args: any[]): boolean;
  call(hook: string, ...args: any[]): boolean;
}

interface Config {
  debug?: any;
  compatibility?: any;
  [key: string]: any;
}

interface FoundryAPI {
  applications?: {
    api?: {
      ApplicationV2?: any;
      HandlebarsApplicationMixin?: any;
    };
  };
  utils?: any;
  data?: {
    fields?: DataFields;
  };
  documents?: any;
  canvas?: any;
}

// Data field classes for document schemas
interface DataFields {
  HTMLField: new (options?: any) => HTMLField;
  StringField: new (options?: any) => StringField;
  NumberField: new (options?: any) => NumberField;
  BooleanField: new (options?: any) => BooleanField;
  ObjectField: new (options?: any) => ObjectField;
  SchemaField: new (schema?: any) => SchemaField;
  ArrayField: new (element?: any) => ArrayField;
  DocumentIdField: new (options?: any) => DocumentIdField;
  FilePathField: new (options?: any) => FilePathField;
}

interface HTMLField {
  options: any;
}

interface StringField {
  options: any;
}

interface NumberField {
  options: any;
  initial: number;
}

interface BooleanField {
  options: any;
  initial: boolean;
}

interface ObjectField {
  options: any;
}

interface SchemaField {
  schema: any;
}

interface ArrayField {
  element: any;
}

interface DocumentIdField {
  options: any;
}

interface FilePathField {
  options: any;
}

// Canvas layer types
interface CanvasLayer {
  options: any;
  name: string;
  activate(): void;
  deactivate(): void;
  draw(): void;
  tearDown(): void;
}

export {};
