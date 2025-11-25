import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import FlashcardsPage from './pages/FlashcardsPage';
import ExercisesPage from './pages/ExercisesPage';
import GrammarPage from './pages/GrammarPage';
import RoadmapPage from './pages/RoadmapPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutPage from './pages/AboutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'vocabulary', element: <VocabularyPage /> },
      { path: 'flashcards', element: <FlashcardsPage /> },
      { path: 'exercises', element: <ExercisesPage /> },
      { path: 'grammar', element: <GrammarPage /> },
      { path: 'roadmap', element: <RoadmapPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogDetailPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);

export default router;
