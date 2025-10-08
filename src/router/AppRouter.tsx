import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { SortProvider } from "../context/SortContext"; // make sure this path is correct
import App from "../App";
import ListView from "../pages/ListView/ListView";
import GalleryView from "../pages/GalleryView/GalleryView";
import DetailView from "../pages/DetailView/DetailView";

export default function AppRouter() {
  return (
    <HashRouter>
      <SortProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/list" replace />} />
            <Route path="list" element={<ListView />} />
            <Route path="gallery" element={<GalleryView />} />
            <Route path="pokemon/:name" element={<DetailView />} />
          </Route>
        </Routes>
      </SortProvider>
    </HashRouter>
  );
}
