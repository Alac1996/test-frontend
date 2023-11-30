import { createBrowserRouter } from "react-router-dom";
import ProductList from "../ProductList";
import { RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
