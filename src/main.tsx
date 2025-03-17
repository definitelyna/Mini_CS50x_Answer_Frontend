import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { createRoot } from "react-dom/client";
import './index.css'
import InputTeam from "./pages/InputTeam/InputTeam";
import QuestionCheck from "./pages/QuestionCheck/QuestionCheck";
import Scoreboard from "./pages/Scoreboard/Scoreboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InputTeam />,
  },
  {
    path: "/QuestionCheck",
    element: <QuestionCheck />,
  },
  {
    path: "/Scoreboard",
    element: <Scoreboard />,
  }

]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
