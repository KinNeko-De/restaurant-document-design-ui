
import { createBrowserRouter } from "react-router-dom";
import Templates from "./design-document/templates";
import PageNotFound from "./pageNotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Templates/>,
    loader: () => import("./design-document/templates"),
    ErrorBoundary: PageNotFound
  }
]);

export default router;