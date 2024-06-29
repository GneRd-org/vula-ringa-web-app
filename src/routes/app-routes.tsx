import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  AppLayout,
  AuthLayout,
  Translate,
  Transcribe,
} from "../components";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout children={<Home />} />}>
          <Route path="home" element={<AppLayout children={<Home />} />} />
        </Route>
        <Route
          path="/translate"
          element={<AppLayout children={<Translate />} />}
        />
        <Route
          path="/transcribe"
          element={<AppLayout children={<Transcribe />} />}
        />
        <Route path="/auth" element={<AuthLayout />} />
      </Routes>
    </BrowserRouter>
  );
};
