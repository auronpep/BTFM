import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface RouterContextType {
  path: string;
  queryParams: Record<string, string>;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Helper function to parse hash location
const parseHash = () => {
  const hash = window.location.hash || '#/';
  // Strip the '#' character
  let rawPath = hash.substring(1) || '/';
  
  // Split query string if exists
  const queryIndex = rawPath.indexOf('?');
  let pathname = queryIndex !== -1 ? rawPath.substring(0, queryIndex) : rawPath;
  let queryString = queryIndex !== -1 ? rawPath.substring(queryIndex + 1) : '';
  
  // Standardize trailing/leading slashes
  if (pathname.startsWith('/')) {
    pathname = pathname.substring(1);
  }
  if (pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }
  
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
  if (pathname === 'california-board-rules') {
    window.location.hash = '#/federal-governance-checklist' + (queryString ? `?${queryString}` : '');
    pathname = 'federal-governance-checklist';
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
      // Smooth scroll to top when changing views
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
