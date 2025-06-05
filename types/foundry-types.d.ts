/**
 * Consolidated FoundryVTT type definitions for testing
 * 
 * This file provides essential Foundry types needed for testing
 * without requiring the full fvtt-types package.
 */

declare global {
  // Core Foundry objects
  const game: Game;
  const ui: UI;
  const canvas: Canvas;
  const Hooks: HooksAPI;
  const CONFIG: Config;
  const foundry: FoundryAPI;

  // Template functions
  const renderTemplate: (path: string, data?: any) => Promise<string>;
  const loadTemplates: (paths: string[]) => Promise<Function[]>;

  // Utility functions
  const duplicate: <T>(obj: T) => T;
  const mergeObject: (original: any, other: any, options?: any) => any;
  const setProperty: (object: any, key: string, value: any) => boolean;
  const getProperty: (object: any, key: string) => any;
  const hasProperty: (object: any, key: string) => boolean;
  const expandObject: (obj: any) => any;
  const flattenObject: (obj: any) => any;
  const isObjectEmpty: (obj: any) => boolean;

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
    data?: any;
    documents?: any;
  }
}

export {};