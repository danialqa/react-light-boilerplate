declare const CLIENT: boolean;
declare const DEV: boolean;

declare namespace NodeJS {
  interface Global {
    CLIENT: boolean;
    DEV: boolean;
  }
}

interface Window {
  INITIAL_STATE: Record<string, unknown>;
}
