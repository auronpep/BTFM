/**
 * Guarded access to localStorage.
 *
 * `window.localStorage` is not always reachable. Browsers throw on the property
 * access itself when site data is blocked - managed/kiosk devices, "block all
 * cookies", Safari Private Browsing - and `setItem` throws QuotaExceededError
 * once the origin's quota is full. An uncaught throw inside a render body or a
 * useState initializer takes the whole React tree down, so a blocked-storage
 * visitor gets a blank page instead of the article they came to read.
 *
 * Saving lab progress is a convenience. It must never be able to cost the page.
 * When the real store is unavailable we fall back to an in-memory map: progress
 * still works for the length of the visit, it just does not survive a reload.
 */

const memory = new Map<string, string>();

// undefined = not probed yet, null = probed and unavailable.
let backend: Storage | null | undefined;

function store(): Storage | null {
  if (backend !== undefined) return backend;

  try {
    if (typeof window === 'undefined') {
      backend = null;
      return backend;
    }
    // Reading the property AND writing to it can each throw independently,
    // so probe with a real round trip rather than trusting the getter.
    const candidate = window.localStorage;
    const probe = '__cdx_storage_probe__';
    candidate.setItem(probe, '1');
    candidate.removeItem(probe);
    backend = candidate;
  } catch {
    backend = null;
  }

  return backend;
}

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      const s = store();
      if (s) return s.getItem(key);
    } catch {
      // Fall through to the in-memory copy.
    }
    return memory.has(key) ? (memory.get(key) as string) : null;
  },

  setItem(key: string, value: string): void {
    memory.set(key, value);
    try {
      store()?.setItem(key, value);
    } catch {
      // Quota exhausted or storage revoked mid-session; the memory copy stands in.
    }
  },

  removeItem(key: string): void {
    memory.delete(key);
    try {
      store()?.removeItem(key);
    } catch {
      // Nothing to do - the key is already gone from the copy that we can reach.
    }
  },

  /**
   * Every key we can currently see, for callers that need to sweep by prefix.
   * Replaces the `length` + `key(i)` index walk, which is easy to get wrong
   * while removing entries and is unavailable when storage is blocked.
   */
  keys(): string[] {
    const found = new Set<string>(memory.keys());
    try {
      const s = store();
      if (s) {
        for (let i = 0; i < s.length; i++) {
          const k = s.key(i);
          if (k !== null) found.add(k);
        }
      }
    } catch {
      // Fall back to whatever the in-memory copy knows about.
    }
    return Array.from(found);
  },
};
