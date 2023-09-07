import axios from "axios";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AllMoviesPage from "./pages/AllMoviesPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MovieDetailPage from "./pages/MovieDetailPage.jsx";
import Root from "./pages/Root.jsx";
import YourRatingsPage from "./pages/YourRatingsPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      {/* Homepage */}
      <Route index element={<IndexPage />} />

      {/* All Movies */}
      <Route
        path="movies"
        element={<AllMoviesPage />}
        loader={async () => {
          const res = await axios.get("/api/movies");
          return { movies: res.data };
        }}
      />

      {/* Movie detail pages */}
      <Route
        path="/movies/:movieId"
        element={<MovieDetailPage />}
        loader={async ({ params }) => {
          const res = await axios.get(`/api/movies/${params.movieId}`);
          return { movie: res.data };
        }}
      />

      {/* Login */}
      <Route path="login" element={<LoginPage />} />

      {/* Your ratings */}
      <Route
        path="me"
        element={<YourRatingsPage />}
        loader={async () => {
          const res = await axios.get("/api/ratings");
          return { ratings: res.data };
        }}
      />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
