import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WebRTCApp from "./pages/WebRTCApp";
import WebRTCTest from "./pages/WebRTCTest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="app" element={<WebRTCApp />} />
          <Route path="apptest" element={<WebRTCTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
