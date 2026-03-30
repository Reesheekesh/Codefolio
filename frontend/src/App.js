import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Create Profile Page */}
        <Route path="/create" element={<CreateProfile />} />

        {/* 🔥 FIXED ROUTE */}
        <Route path="/profile/:username" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;