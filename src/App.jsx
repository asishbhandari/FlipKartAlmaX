import "./App.css";
// import Navbar from "./Components/Navbar/Navbar";
import {
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import SignUpPage from "./pages/SignUpPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

const router = createBrowserRouter([{ path: "*", element: <Root /> }]);

function App() {
  return <RouterProvider router={router} />;
}

const Container = () => {
  const location = useLocation();
  let home = true;
  if (location.pathname !== "/") {
    home = false;
  }
  return (
    <div className="max-w-[1536px] mx-auto">
      <Navbar isHome={home} />
      <Outlet />
    </div>
  );
};

const AuthRoute = () => {
  let token = localStorage.getItem("token");
  return token ? <Outlet /> : <SignUpPage />;
};

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<HomePage />} />
        <Route path="/searchPage/:searchTerm" element={<SearchPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/cartPage" element={<AuthRoute />}>
          <Route index element={<CartPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
