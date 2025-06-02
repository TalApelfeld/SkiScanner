import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { lazy, Suspense } from "react";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
// import HomePage from "./pages/HomePage";
// import ResortPage from "./pages/ResortPage";
// import PackageBuilderPage from "./pages/PackageBuilderPage";
// import AccountPage from "./pages/AccountPage";
// import CheckoutPage from "./pages/CheckoutPage";
// import NotFoundPage from "./pages/NotFoundPage";

const Homepage = lazy(() => import("./pages/HomePage"));
const ResortPage = lazy(() => import("./pages/ResortPage"));
const PackageBuilderPage = lazy(() => import("./pages/PackageBuilderPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path="resort/:id" element={<ResortPage />} />
            <Route path="package-builder" element={<PackageBuilderPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
