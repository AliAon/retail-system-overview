import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import { ColorRing } from "react-loader-spinner";
const Login = lazy(() => import("./pages/index"));
const Authenticate = lazy(() => import("./pages/authenticate"));
const Thankyou = lazy(() => import("./pages/thankyou"));
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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
