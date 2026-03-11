import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import { ColorRing } from "react-loader-spinner";
import {
  ProtectedRouteMiddleware,
  PublicRouteMiddleware,
} from "./hoc/auth-gaurd";

const Layout = lazy(() => import("./layout"));
const Dashboard = lazy(() => import("./pages/dashboard/"));
const Login = lazy(() => import("./pages/index"));
const Authenticate = lazy(() => import("./pages/authenticate"));
const Thankyou = lazy(() => import("./pages/thankyou"));
const Welcome = lazy(() => import("./pages/welcome"));
const AddProduct = lazy(() => import("./pages/dashboard/add-product"));
const Products = lazy(() => import("./pages/dashboard/products"));
function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <ColorRing
              visible={true}
              height="60"
              width="60"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#849b87"]}
            />
          </div>
        }
      >
        <Routes>
          <Route element={<PublicRouteMiddleware />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/thankyou" element={<Thankyou />} />
            <Route path="/welcome" element={<Welcome />} />
          </Route>
          <Route element={<ProtectedRouteMiddleware />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<AddProduct />} />
              {/* <Route path="/add-product" element={<AddProduct />} /> */}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
