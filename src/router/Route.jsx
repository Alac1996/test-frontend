import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "../pages/ProductList";
// import { RouterProvider } from "react-router";
import UploadProduct from "../pages/UploadProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "/upload",
    element: <UploadProduct />,
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
