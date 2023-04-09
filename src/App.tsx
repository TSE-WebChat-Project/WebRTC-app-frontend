import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WebRTCApp from "./pages/WebRTCApp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="app" element={<WebRTCApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
