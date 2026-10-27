import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PlaygroundShell } from "./layout/PlaygroundShell";
import { ComponentDocRoute } from "./pages/ComponentDocRoute";
import { OverviewPage } from "./pages/OverviewPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PlaygroundShell />}>
          <Route index element={<OverviewPage />} />
          <Route path="c/:section/:component" element={<ComponentDocRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
