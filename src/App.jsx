import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
