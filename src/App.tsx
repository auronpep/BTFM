import { RouterProvider, useRouter } from './components/Router';

// Core Page Views
import Home from './views/Home';
import Library from './views/Library';
import ArticleReader from './views/ArticleReader';
import ScenarioReader from './views/ScenarioReader';
import CaliforniaRules from './views/CaliforniaRules';
import NextMeeting from './views/NextMeeting';
import Tools from './views/Tools';
import Training from './views/Training';
import AboutUs from './views/AboutUs';
import Boards101 from './views/Boards101';
import ContactUs from './views/ContactUs';
import WebinarRegistration from './views/WebinarRegistration';

// Interactive Laboratories & Workshops
import { SelfAssessment } from './views/SelfAssessment';
import BoardPacketLab from './views/BoardPacketLab';
import MinutesScorecard from './views/MinutesScorecard';
import BudgetWorksheet from './views/BudgetWorksheet';
import AuthorityMap from './views/AuthorityMap';

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
      <AppContent />
    </RouterProvider>
  );
}

export default App;
