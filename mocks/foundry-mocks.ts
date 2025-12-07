/**
 * Comprehensive Foundry VTT Mock Setup
 * 
 * This file provides a complete mock environment for Foundry VTT testing.
 * It can be shared between multiple projects that need Foundry mocks.
 * 
 * Usage:
 * ```typescript
 * import './foundry-mocks';
 * // Or import specific parts:
 * import { setupFoundryMocks, mockFoundryDocuments } from './foundry-mocks';
 * ```
 */

/// <reference types="@rayners/foundry-dev-tools/types" />

import { vi } from 'vitest';

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

export interface MockScene {
  id: string;
  name: string;
  width: number;
  height: number;
  regions: Map<string, MockRegion>;
  getFlag: ReturnType<typeof vi.fn>;
  setFlag: ReturnType<typeof vi.fn>;
  unsetFlag: ReturnType<typeof vi.fn>;
  createEmbeddedDocuments: ReturnType<typeof vi.fn>;
  deleteEmbeddedDocuments: ReturnType<typeof vi.fn>;
  grid: {
    units: string;
    type: number;
  };
}

export interface MockRegion {
  id: string;
  name: string;
  shapes: any[];
  flags: Record<string, any>;
  getFlag: ReturnType<typeof vi.fn>;
  setFlag: ReturnType<typeof vi.fn>;
  unsetFlag: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  testPoint: ReturnType<typeof vi.fn>;
}

export interface MockActor {
  id: string;
  name: string;
  type: string;
  uuid: string;
  system: any;
  items: MockItem[];
  flags: Record<string, any>;
  getFlag: ReturnType<typeof vi.fn>;
  setFlag: ReturnType<typeof vi.fn>;
  unsetFlag: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
}

export interface MockItem {
  id: string;
  name: string;
  type: string;
  system: any;
  flags: Record<string, any>;
}

export interface MockUser {
  id: string;
  isGM: boolean;
  getFlag: ReturnType<typeof vi.fn>;
  setFlag: ReturnType<typeof vi.fn>;
  unsetFlag: ReturnType<typeof vi.fn>;
}

export interface MockRollTable {
  id: string;
  name: string;
  folder: string | null;
  results: any[];
  flags: Record<string, any>;
  roll: ReturnType<typeof vi.fn>;
  getFlag: ReturnType<typeof vi.fn>;
  setFlag: ReturnType<typeof vi.fn>;
}

export interface MockFolder {
  id: string;
  name: string;
  type: string;
  color: string;
  description: string;
}

// ============================================================================
// MOCK FACTORIES
// ============================================================================

export function createMockScene(options: Partial<MockScene> = {}): MockScene {
  const regions = options.regions || new Map();
  
  // Add filter method to regions map to match Foundry's Collection interface
  (regions as any).filter = function(callback: (region: any) => boolean) {
    const results: any[] = [];
    for (const [id, region] of this.entries()) {
      if (callback(region)) {
        results.push(region);
      }
    }
    return results;
  };
  
  return {
    id: options.id || 'test-scene',
    name: options.name || 'Test Scene',
    width: options.width || 4000,
    height: options.height || 3000,
    regions: regions,
    getFlag: vi.fn(),
    setFlag: vi.fn(),
    unsetFlag: vi.fn(),
    createEmbeddedDocuments: vi.fn().mockResolvedValue([]),
    deleteEmbeddedDocuments: vi.fn().mockResolvedValue([]),
    grid: {
      units: 'feet',
      type: 1, // SQUARE
      ...(options.grid || {})
    }
  };
}

export function createMockRegion(options: Partial<MockRegion> = {}): MockRegion {
  return {
    id: options.id || 'test-region',
    name: options.name || 'Test Region',
    shapes: options.shapes || [],
    flags: options.flags || {},
    getFlag: vi.fn().mockImplementation((scope, key) => {
      return options.flags?.[scope]?.[key];
    }),
    setFlag: vi.fn(),
    unsetFlag: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    testPoint: vi.fn().mockReturnValue(true)
  };
}

export function createMockActor(options: Partial<MockActor> = {}): MockActor {
  return {
    id: options.id || 'test-actor',
    name: options.name || 'Test Actor',
    type: options.type || 'character',
    uuid: options.uuid || `Actor.${options.id || 'test-actor'}`,
    system: options.system || {},
    items: options.items || [],
    flags: options.flags || {},
    getFlag: vi.fn(),
    setFlag: vi.fn(),
    unsetFlag: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  };
}

export function createMockUser(options: Partial<MockUser> = {}): MockUser {
  return {
    id: options.id || 'test-user',
    isGM: options.isGM ?? false,
    getFlag: vi.fn(),
    setFlag: vi.fn(),
    unsetFlag: vi.fn()
  };
}

export function createMockRollTable(options: Partial<MockRollTable> = {}): MockRollTable {
  return {
    id: options.id || 'test-table',
    name: options.name || 'Test Table',
    folder: options.folder || null,
    results: options.results || [],
    flags: options.flags || {},
    roll: vi.fn().mockResolvedValue({
      results: [{ text: 'Test Result', name: 'Test Result' }],
      total: 1
    }),
    getFlag: vi.fn(),
    setFlag: vi.fn()
  };
}

export function createMockFolder(options: Partial<MockFolder> = {}): MockFolder {
  return {
    id: options.id || 'test-folder',
    name: options.name || 'Test Folder',
    type: options.type || 'RollTable',
    color: options.color || '#000000',
    description: options.description || 'Test folder'
  };
}

// ============================================================================
// FOUNDRY DOCUMENT CLASSES
// ============================================================================

export class MockActorClass {
  static async create(data: any): Promise<MockActor> {
    return createMockActor(data);
  }
  
  static async createDocuments(data: any[]): Promise<MockActor[]> {
    return data.map(d => createMockActor(d));
  }
}

export class MockRollTableClass {
  static async create(data: any): Promise<MockRollTable> {
    return createMockRollTable(data);
  }
  
  static async createDocuments(data: any[]): Promise<MockRollTable[]> {
    return data.map(d => createMockRollTable(d));
  }
}

export class MockFolderClass {
  static async create(data: any): Promise<MockFolder> {
    return createMockFolder(data);
  }
  
  static async createDocuments(data: any[]): Promise<MockFolder[]> {
    return data.map(d => createMockFolder(d));
  }
}

export class MockDialogClass {
  constructor(options: any = {}) {
    this.options = options;
  }
  
  options: any;
  
  static async confirm(options: any = {}): Promise<boolean> {
    return options.defaultYes !== false;
  }
  
  static async prompt(options: any = {}): Promise<any> {
    return options.defaultValue || null;
  }
  
  render(force?: boolean): void {
    // Mock render
  }
  
  close(): void {
    // Mock close
  }
}

// ============================================================================
// FUNCTIONAL HOOKS SYSTEM
// ============================================================================

/**
 * Enhanced Hook system mock that actually registers and executes callbacks.
 * This allows tests to verify that hooks are called with correct arguments
 * and that hook callbacks are properly executed.
 */
export class MockHooks {
  private static hooks: Map<string, Function[]> = new Map();

  static once(event: string, callback: Function): number {
    const callbacks = this.hooks.get(event) || [];
    const wrappedCallback = (...args: any[]) => {
      const result = callback(...args);
      this.off(event, wrappedCallback);
      return result;
    };
    callbacks.push(wrappedCallback);
    this.hooks.set(event, callbacks);
    return callbacks.length;
  }

  static on(event: string, callback: Function): number {
    const callbacks = this.hooks.get(event) || [];
    callbacks.push(callback);
    this.hooks.set(event, callbacks);
    return callbacks.length;
  }

  static off(event: string, callback?: Function): void {
    if (!callback) {
      this.hooks.delete(event);
      return;
    }
    const callbacks = this.hooks.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  static call(event: string, ...args: any[]): boolean {
    const callbacks = this.hooks.get(event) || [];
    for (const callback of callbacks) {
      try {
        const result = callback(...args);
        if (result === false) {
          return false;
        }
      } catch {
        // Ignore hook callback errors in tests
      }
    }
    return true;
  }

  static callAll(event: string, ...args: any[]): boolean {
    const callbacks = this.hooks.get(event) || [];
    let result = true;
    for (const callback of callbacks) {
      try {
        const callbackResult = callback(...args);
        if (callbackResult === false) {
          result = false;
        }
      } catch {
        // Ignore hook callback errors to keep test output clean
      }
    }
    return result;
  }

  static clear(): void {
    this.hooks.clear();
  }

  /**
   * Get registered callbacks for a hook (useful for testing)
   */
  static getCallbacks(event: string): Function[] {
    return this.hooks.get(event) || [];
  }
}

// ============================================================================
// FOUNDRY V13 APPLICATION FRAMEWORK
// ============================================================================

/**
 * Mock ApplicationV2 class for Foundry v13+
 */
export class MockApplicationV2 {
  static DEFAULT_OPTIONS = {};
  static PARTS: Record<string, any> = {};

  options: any;
  element: HTMLElement | null = null;

  constructor(options: any = {}) {
    this.options = options;
  }

  render(_force?: boolean): Promise<this> {
    return Promise.resolve(this);
  }

  close(): Promise<void> {
    return Promise.resolve();
  }

  setPosition(_position?: any): void {}
}

/**
 * Mock HandlebarsApplicationMixin for Foundry v13+
 */
export function MockHandlebarsApplicationMixin<T extends new (...args: any[]) => any>(Base: T) {
  return class extends Base {
    _prepareContext(): Record<string, any> {
      return {};
    }

    _onRender(): Promise<void> {
      return Promise.resolve();
    }

    _replaceHTML(_result: any, _content: HTMLElement, _options: any): void {}
  };
}

/**
 * Mock CalendarData for Foundry v13 calendar integration
 */
export class MockCalendarData {
  constructor(_data?: object, _options?: any) {
    // Mock constructor
  }

  timeToComponents(_time?: number): any {
    return { year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0 };
  }

  componentsToTime(_components: any): number {
    return 0;
  }

  add(_startTime: any, _deltaTime: any): any {
    return { year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0 };
  }

  difference(_endTime: any, _startTime?: any): any {
    return { year: 0, month: 1, day: 1, hour: 0, minute: 0, second: 0 };
  }

  format(_time?: any, _formatter?: string, _options?: any): string {
    return 'Mock date';
  }

  isLeapYear(_year: number): boolean {
    return false;
  }

  countLeapYears(_year: number): number {
    return 0;
  }

  static defineSchema(): any {
    return {};
  }
}

// ============================================================================
// FOUNDRY GLOBALS SETUP
// ============================================================================

export function setupFoundryGlobals(options: { functionalHooks?: boolean } = {}) {
  // Foundry utility functions
  (globalThis as any).foundry = {
    abstract: {
      TypeDataModel: class MockTypeDataModel {
        constructor(data = {}) {
          Object.assign(this, data);
        }
        prepareDerivedData() {}
      }
    },
    data: {
      fields: {
        HTMLField: class {
          options: any;
          constructor(options: any = {}) {
            this.options = options;
          }
        },
        StringField: class {
          options: any;
          constructor(options: any = {}) {
            this.options = options;
          }
        },
        NumberField: class {
          options: any;
          initial: any;
          constructor(options: any = {}) {
            this.options = options;
            if (typeof options.initial === 'function') {
              this.initial = options.initial();
            } else {
              this.initial = options.initial || 0;
            }
          }
        },
        BooleanField: class {
          options: any;
          initial: boolean;
          constructor(options: any = {}) {
            this.options = options;
            this.initial = options.initial || false;
          }
        },
        ObjectField: class {
          options: any;
          constructor(options: any = {}) {
            this.options = options;
          }
        },
        SchemaField: class {
          schema: any;
          constructor(schema: any = {}) {
            this.schema = schema;
          }
        },
        ArrayField: class {
          element: any;
          constructor(element: any) {
            this.element = element;
          }
        },
        DocumentIdField: class {
          options: any;
          constructor(options: any = {}) {
            this.options = options;
          }
        },
        FilePathField: class {
          options: any;
          constructor(options: any = {}) {
            this.options = options;
          }
        }
      }
    },
    applications: {
      api: {
        ApplicationV2: MockApplicationV2,
        HandlebarsApplicationMixin: MockHandlebarsApplicationMixin,
      },
    },
    utils: {
      mergeObject: vi.fn((original, other, _options = {}) => ({ ...original, ...other })),
      duplicate: vi.fn(obj => JSON.parse(JSON.stringify(obj))),
      setProperty: vi.fn(),
      getProperty: vi.fn(),
      hasProperty: vi.fn(),
      expandObject: vi.fn(),
      flattenObject: vi.fn(),
      isNewerVersion: vi.fn(),
      randomID: vi.fn(() => Math.random().toString(36).substr(2, 9)),
      debounce: vi.fn((callback: Function, _delay: number) => callback),
    },
    documents: {
      BaseRegion: class MockBaseRegion {
        constructor(data = {}) {
          Object.assign(this, data);
        }
        static defineSchema() {
          return {};
        }
      }
    },
    canvas: {
      layers: {
        RegionLayer: class MockRegionLayer {
          options: any;
          constructor(options: any = {}) {
            this.options = options;
          }
          activate() {}
          deactivate() {}
          draw() {}
          tearDown() {}
        }
      }
    }
  };

  // Also expose CalendarData for Foundry v13+
  (globalThis as any).foundry.data.CalendarData = MockCalendarData;

  const g = globalThis as any;

  // Template functions
  g.loadTemplates = vi.fn().mockResolvedValue({});
  g.renderTemplate = vi.fn().mockResolvedValue('<div>Mock Template</div>');
  g.getTemplate = vi.fn().mockResolvedValue(() => '<div>Mock Template</div>');

  // Document lookup functions
  g.fromUuid = vi.fn();
  g.fromUuidSync = vi.fn();

  // Text editor
  g.TextEditor = {
    enrichHTML: vi.fn(content => content)
  };

  // Handlebars
  g.Handlebars = {
    compile: vi.fn().mockReturnValue(vi.fn().mockReturnValue('mock-template-result')),
    registerHelper: vi.fn(),
    registerPartial: vi.fn()
  };

  // Hooks system - use functional hooks by default for proper callback execution
  if (options.functionalHooks !== false) {
    g.Hooks = MockHooks;
  } else {
    g.Hooks = {
      on: vi.fn(),
      once: vi.fn(),
      off: vi.fn(),
      call: vi.fn(),
      callAll: vi.fn()
    };
  }

  // Also expose ApplicationV2 and CalendarData as globals
  g.ApplicationV2 = MockApplicationV2;
  g.CalendarData = MockCalendarData;

  // PIXI Graphics (for canvas-based tests)
  g.PIXI = {
    Graphics: vi.fn(() => ({
      beginFill: vi.fn(),
      drawPolygon: vi.fn(),
      endFill: vi.fn(),
      clear: vi.fn(),
      destroy: vi.fn()
    })),
    Point: vi.fn((x, y) => ({ x, y }))
  };

  // Canvas Layer base class
  g.CanvasLayer = class MockCanvasLayer {
    options: any;
    name: string;
    constructor(options: any = {}) {
      this.options = options;
      this.name = options.name || 'mock';
    }

    static get layerOptions() {
      return {};
    }

    activate() {}
    deactivate() {}
    draw() {}
    tearDown() {}
  };

  // CONST object
  g.CONST = {
    KEYBINDING_SCOPES: {
      GLOBAL: 'global',
      CLIENT: 'client'
    }
  };
}

export function setupFoundryDocuments() {
  const g = globalThis as any;

  // Document classes
  g.Actor = MockActorClass;
  g.RollTable = MockRollTableClass;
  g.Folder = MockFolderClass;
  g.Dialog = MockDialogClass;

  // Sheet classes
  g.ActorSheet = class MockActorSheet {};
  g.Application = class MockApplication {};
  g.FormApplication = class MockFormApplication {};

  // Other document classes
  g.ChatMessage = class MockChatMessage {
    static async create() {}
  };

  // Roll class
  g.Roll = class MockRoll {
    formula: string;
    total: number;

    constructor(formula: string) {
      this.formula = formula;
      this.total = 10; // Default total
    }

    async evaluate() {
      return this;
    }
  };
}

export function setupFoundryGame(options: {
  systemId?: string;
  user?: Partial<MockUser>;
  scenes?: MockScene[];
} = {}) {
  const mockUser = createMockUser(options.user);
  const mockScenes = options.scenes || [createMockScene()];

  (globalThis as any).game = {
    user: mockUser,
    userId: mockUser.id,
    users: new Map([[mockUser.id, mockUser]]),
    actors: new Map(),
    scenes: new Map(mockScenes.map(s => [s.id, s])),
    tables: new Map(),
    folders: new Map(),
    modules: new Map(),
    settings: {
      get: vi.fn(),
      set: vi.fn(),
      register: vi.fn(),
      registerMenu: vi.fn()
    },
    i18n: {
      lang: 'en',
      localize: vi.fn((key: string) => key),
      format: vi.fn((key: string, _data?: any) => key)
    },
    system: {
      id: options.systemId || 'test-system',
      title: 'Test System',
      data: {}
    },
    version: '13.331',
    documentTypes: {
      Actor: ['character', 'npc'],
      Item: ['weapon', 'armor'],
      RollTable: ['RollTable']
    }
  };
}

export function setupFoundryUI() {
  (globalThis as any).ui = {
    notifications: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    }
  };
}

export function setupFoundryCanvas(scene?: MockScene) {
  const mockScene = scene || createMockScene();

  (globalThis as any).canvas = {
    scene: mockScene,
    regions: {
      activate: vi.fn(),
      deactivate: vi.fn()
    },
    ready: true
  };
}

export function setupFoundryConfig() {
  (globalThis as any).CONFIG = {
    Actor: {
      documentClass: MockActorClass,
      typeLabels: {}
    },
    debug: {
      hooks: false
    },
    DND5E: {
      skills: {
        acr: { label: 'Acrobatics' },
        ani: { label: 'Animal Handling' },
        arc: { label: 'Arcana' },
        ath: { label: 'Athletics' },
        dec: { label: 'Deception' },
        his: { label: 'History' },
        ins: { label: 'Insight' },
        inti: { label: 'Intimidation' },
        inv: { label: 'Investigation' },
        med: { label: 'Medicine' },
        nat: { label: 'Nature' },
        prc: { label: 'Perception' },
        per: { label: 'Performance' },
        prs: { label: 'Persuasion' },
        rel: { label: 'Religion' },
        slt: { label: 'Sleight of Hand' },
        ste: { label: 'Stealth' },
        sur: { label: 'Survival' }
      }
    }
  };
}

// ============================================================================
// COMPLETE SETUP FUNCTION
// ============================================================================

/**
 * Set up a complete Foundry VTT mock environment
 */
export function setupFoundryMocks(options: {
  systemId?: string;
  user?: Partial<MockUser>;
  scenes?: MockScene[];
  includeCanvas?: boolean;
  includeRegions?: boolean;
  /** Use functional hooks that actually execute callbacks (default: true) */
  functionalHooks?: boolean;
} = {}) {
  setupFoundryGlobals({ functionalHooks: options.functionalHooks });
  setupFoundryDocuments();
  setupFoundryGame(options);
  setupFoundryUI();
  setupFoundryConfig();

  if (options.includeCanvas !== false) {
    setupFoundryCanvas(options.scenes?.[0]);
  }
}

// ============================================================================
// AUTO-SETUP (when imported)
// ============================================================================

// Automatically set up basic mocks when this file is imported
setupFoundryMocks();