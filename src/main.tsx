// react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// react-query
import { QueryClient, QueryClientProvider } from "react-query";

// style
import "./index.css";

// runtime
import 'regenerator-runtime/runtime'

// component
import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
