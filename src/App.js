import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUpSignIn from "./components/Signup"; 
import CurrencyConverter from "./components/currencyConverter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/currency" element={<currencyConverter />} />
      </Routes>
    </Router>
  );
}

export default App;