import React, { createContext, useContext, useState, useEffect } from 'react';
import { scrollBehavior } from '../lib/motion';

export interface RouterContextType {
  path: string;
  queryParams: Record<string, string>;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Old public URLs that must keep working, mapped to their current path.
const LEGACY_PATHS: Record<string, string> = {
  'california-board-rules': 'federal-governance-checklist',
};

// Splits '#/path/?a=b' into its normalized pathname and its raw query string.
const splitHash = () => {
  const hash = window.location.hash || '#/';
  // Strip the '#' character
  const rawPath = hash.substring(1) || '/';

  // Split query string if exists
  const queryIndex = rawPath.indexOf('?');
  let pathname = queryIndex !== -1 ? rawPath.substring(0, queryIndex) : rawPath;
  const queryString = queryIndex !== -1 ? rawPath.substring(queryIndex + 1) : '';

  // Standardize trailing/leading slashes
  if (pathname.startsWith('/')) {
    pathname = pathname.substring(1);
  }
  if (pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }

  return { pathname, queryString };
};

// Rewrites a legacy URL in the address bar to its current one.
// This REPLACES the history entry instead of assigning window.location.hash,
// which would push a new entry and trap the Back button on the legacy URL.
const canonicalizeLegacyHash = () => {
  const { pathname, queryString } = splitHash();
  const canonical = LEGACY_PATHS[pathname];
  if (!canonical) return;
  window.history.replaceState(
    window.history.state,
    '',
    `#/${canonical}${queryString ? `?${queryString}` : ''}`
  );
};

// Helper function to parse hash location
const parseHash = () => {
  const { pathname: rawPathname, queryString } = splitHash();
  let pathname = rawPathname;

  // Parse query params
  const params: Record<string, string> = {};
  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
  }
  
  // Support nice slug subroutes like article/slug, scenario/slug
  // We rewrite them to base path and set appropriate query param
  if (pathname.startsWith('article/') && pathname.length > 8) {
    const slug = pathname.substring(8);
    return {
      path: 'article',
      queryParams: { ...params, id: slug }
    };
  }
  if (pathname.startsWith('scenario/') && pathname.length > 9) {
    const slug = pathname.substring(9);
    return {
      path: 'scenario',
      queryParams: { ...params, id: slug }
    };
  }
  if (pathname.startsWith('tools/') && pathname.length > 6) {
    const subTool = pathname.substring(6);
    return {
      path: `tools/${subTool}`,
      queryParams: params
    };
  }
  // Resolve legacy URLs to the current path. Pure: the address bar is
  // canonicalized separately, in an effect, so parsing stays side-effect free.
  if (LEGACY_PATHS[pathname]) {
    pathname = LEGACY_PATHS[pathname];
  }
  
  return {
    path: pathname || 'home',
    queryParams: params
  };
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState(parseHash());
  const isInitialRender = useRef(true);

  // A hash change swaps the whole page, but focus stays on whatever nav button
  // was clicked. A screen-reader user hears nothing and keeps reading the old
  // position; a keyboard user's next Tab resumes inside the header instead of
  // the new page. Moving focus to the main landmark is what a real document
  // navigation would have done.
  useEffect(() => {
    if (isInitialRender.current) {
      // Don't steal focus on first paint - the user hasn't navigated yet.
      isInitialRender.current = false;
      return;
    }
    // preventScroll: the smooth scroll-to-top above owns scrolling.
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [route.path]);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash());
      canonicalizeLegacyHash();
      // Smooth scroll to top when changing views
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    };

    // Covers a legacy URL that was the entry point for the session.
    canonicalizeLegacyHash();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigate = (to: string) => {
    // Standardize 'to' to start with '#/'
    let target = to;
    if (!to.startsWith('#')) {
      if (to.startsWith('/')) {
        target = `#${to}`;
      } else {
        target = `#/${to}`;
      }
    }
    window.location.hash = target;
  };

  return (
    <RouterContext.Provider value={{ path: route.path, queryParams: route.queryParams, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
