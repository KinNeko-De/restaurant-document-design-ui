
import { createBrowserRouter } from "react-router-dom";
import Templates from "./design_document/templates";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Templates/>
  }
]);

export default router;