import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import InputTeam from "./pages/InputTeam/InputTeam";
import QuestionCheck from "./pages/QuestionCheck/QuestionCheck";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <InputTeam />,
  },
  {
    path: "/QuestionCheck",
    element: <QuestionCheck />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
