import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DataTable from "./components/DataTable";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="flex">
        <Navbar />

        <div className="flex-1 p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Routes>
            <Route path="/products" element={<DataTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;