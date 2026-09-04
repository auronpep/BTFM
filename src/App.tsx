import { Suspense, lazy } from 'react';
import { RouterProvider, useRouter } from './components/Router';

// Home is the landing view and the `default` branch below, so it stays in the
// entry chunk — lazy-loading it would only buy a flash of the fallback.
import Home from './views/Home';

// Every other view is fetched when its route is actually visited. A first-time
// visitor reading the homepage should not pay to download the interactive labs.
const Library = lazy(() => import('./views/Library'));
const ArticleReader = lazy(() => import('./views/ArticleReader'));
const ScenarioReader = lazy(() => import('./views/ScenarioReader'));
const CaliforniaRules = lazy(() => import('./views/CaliforniaRules'));
const NextMeeting = lazy(() => import('./views/NextMeeting'));
const Tools = lazy(() => import('./views/Tools'));
const Training = lazy(() => import('./views/Training'));
const AboutUs = lazy(() => import('./views/AboutUs'));
const Boards101 = lazy(() => import('./views/Boards101'));
const ContactUs = lazy(() => import('./views/ContactUs'));
const WebinarRegistration = lazy(() => import('./views/WebinarRegistration'));

// Interactive Laboratories & Workshops
const SelfAssessment = lazy(() =>
  import('./views/SelfAssessment').then((m) => ({ default: m.SelfAssessment }))
);
const BoardPacketLab = lazy(() => import('./views/BoardPacketLab'));
const MinutesScorecard = lazy(() => import('./views/MinutesScorecard'));
const BudgetWorksheet = lazy(() => import('./views/BudgetWorksheet'));
const AuthorityMap = lazy(() => import('./views/AuthorityMap'));

function RouteFallback() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center" role="status" aria-live="polite">
      <span className="text-ink/40 text-sm tracking-wide">Loading&hellip;</span>
    </div>
  );
}

function AppContent() {
  const { path } = useRouter();

  switch (path) {
    case 'home':
      return <Home />;
    case 'articles':
    case 'library':
    case 'scenarios':
    case 'money-audit':
    case 'executive-oversight':
    case 'risk-safety':
    case 'minutes-records':
      return <Library />;
    case 'article':
      return <ArticleReader />;
    case 'scenario':
      return <ScenarioReader />;
    case 'federal-governance-checklist':
    case 'california-board-rules':
      return <CaliforniaRules />;
    case 'next-meeting':
      return <NextMeeting />;
    case 'tools':
      return <Tools />;
    case 'training':
      return <Training />;
    case 'webinar-registration':
      return <WebinarRegistration />;
    case 'about-us':
      return <AboutUs />;
    case 'contact-us':
      return <ContactUs />;
    case 'boards-101':
      return <Boards101 />;
    case 'tools/self-assessment':
      return <SelfAssessment />;
    case 'tools/board-packet-lab':
      return <BoardPacketLab />;
    case 'tools/minutes-scorecard':
      return <MinutesScorecard />;
    case 'tools/budget-worksheet':
      return <BudgetWorksheet />;
    case 'tools/authority-map':
      return <AuthorityMap />;
    default:
      return <Home />;
  }
}

function App() {
  return (
    <RouterProvider>
      <Suspense fallback={<RouteFallback />}>
        <AppContent />
      </Suspense>
    </RouterProvider>
  );
}

export default App;
