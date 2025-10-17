import About from "./components/About";
import Contact from "./components/Contact";
import CursorGlow from "./components/CursorGlow";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Hero3D from "./components/Hero3D";
import LinhTinh from "./components/LinhTinh";
import Particles from "./components/Particles";
import Quotes from "./components/Quotes";

const App = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="neon-gradient-bg fixed inset-0 -z-20 opacity-40" />
      <Particles />
      <CursorGlow />
      <Header />
      <main className="relative z-10">
        <Hero3D />
        <About />
        <Gallery />
        <Quotes />
        <Contact />
        <LinhTinh />
      </main>
      <Footer />
    </div>
  );
};

export default App;
