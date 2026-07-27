export async function register() {
  // The Claude Code runner injects a partial localStorage stub into Node.js
  // (--localstorage-file flag) whose methods are not real functions.
  // Patch it before Next.js SSR runs so server-side rendering doesn't crash.
  if (
    typeof globalThis.localStorage !== "undefined" &&
    typeof (globalThis.localStorage as Storage).getItem !== "function"
  ) {
    const _store: Record<string, string> = {};
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      writable: true,
      value: {
        getItem: (key: string): string | null => _store[key] ?? null,
        setItem: (key: string, value: string): void => {
          _store[key] = String(value);
        },
        removeItem: (key: string): void => {
          delete _store[key];
        },
        clear: (): void => {
          for (const k of Object.keys(_store)) delete _store[k];
        },
        key: (index: number): string | null => Object.keys(_store)[index] ?? null,
        get length(): number {
          return Object.keys(_store).length;
        },
      } as Storage,
    });
  }
}
