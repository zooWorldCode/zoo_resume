import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Main from "./pages/Main";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
/* dd */
export default App;
