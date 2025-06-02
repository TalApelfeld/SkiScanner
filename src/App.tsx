import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "motion/react";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import ResortPage from "./pages/ResortPage";
import PackageBuilderPage from "./pages/PackageBuilderPage";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="resort/:id" element={<ResortPage />} />
          <Route path="package-builder" element={<PackageBuilderPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
