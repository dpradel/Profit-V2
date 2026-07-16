import { useState, useEffect, lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage.jsx").then((m) => ({ default: m.HomePage })));
const ProfitWebPage = lazy(() => import("./pages/ProfitWebPage.jsx").then((m) => ({ default: m.ProfitWebPage })));
const ProfitUltraPage = lazy(() => import("./pages/ProfitUltraPage.jsx").then((m) => ({ default: m.ProfitUltraPage })));
const PlanosPage = lazy(() => import("./pages/PlanosPage.jsx").then((m) => ({ default: m.PlanosPage })));
const RecursosPage = lazy(() => import("./pages/RecursosPage.jsx").then((m) => ({ default: m.RecursosPage })));
const CorretorasPage = lazy(() => import("./pages/CorretorasPage.jsx").then((m) => ({ default: m.CorretorasPage })));
const BaixarPage = lazy(() => import("./pages/BaixarPage.jsx").then((m) => ({ default: m.BaixarPage })));
const QuemSomosPage = lazy(() => import("./pages/QuemSomosPage.jsx").then((m) => ({ default: m.QuemSomosPage })));
const ContatoPage = lazy(() => import("./pages/ContatoPage.jsx").then((m) => ({ default: m.ContatoPage })));

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const path = hash.replace(/^#/, "").replace(/\/$/, "") || "/";

  const routes = {
    "/planos": PlanosPage,
    "/recursos": RecursosPage,
    "/corretoras": CorretorasPage,
    "/baixar": BaixarPage,
    "/quem-somos": QuemSomosPage,
    "/contato": ContatoPage,
    "/profit-web": ProfitWebPage,
    "/profit-ultra": ProfitUltraPage,
  };

  const LazyPage = routes[path] || HomePage;
  return (
    <Suspense fallback={null}>
      <LazyPage />
    </Suspense>
  );
}
