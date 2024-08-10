
import { createBrowserRouter } from "react-router-dom";
import Templates from "./design-document/templates";
import PageNotFound from "./pageNotFound";
import { templateGateway } from "./design-document/gateway";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Templates
      fetchTemplates={templateGateway.fetchTemplates}
      fetchTemplate={templateGateway.fetchTemplate}
    />,
    ErrorBoundary: PageNotFound
  }
]);

export default router;