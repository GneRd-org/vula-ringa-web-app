import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  AppLayout,
  AuthLayout,
  Translate,
  Transcribe,
  Detect,
  Config,
} from "../components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppRoutes = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout children={<Home />} />}>
            <Route path="home" element={<AppLayout children={<Home />} />} />
          </Route>
          <Route path="/detect" element={<AppLayout children={<Detect />} />} />
          <Route
            path="/translate"
            element={<AppLayout children={<Translate />} />}
          />
          <Route
            path="/transcribe"
            element={<AppLayout children={<Transcribe />} />}
          />
          <Route path="/detect" element={<AppLayout children={<Detect />} />} />
          <Route path="/config" element={<AppLayout children={<Config />} />} />
          <Route path="/auth" element={<AuthLayout />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
